import { useEffect, useRef, useState } from 'react'
import front from '../assets/images/Michien_Zapzipstadt.png'
import back from '../assets/images/Michien_Backs_Zapzipstadt.png'

const guideContent = [
  {
    comments: [
      'Hallo, ich bin Yuki! Ich lebe gern in Zapzipstadt. Hier ist die Luft so sauber.',
      'Auf dem Foto siehst du meine Umweltschule und unseren elektrischen Zug.',
      'Sonntags gehe ich auf den Markt. Dort höre ich Musik und kaufe frisches Gemüse.',
      'Nach der Schule laufe ich zum Katzengrasfeld. Dort kann ich mich gut entspannen.',
      'Ich mag die Gärten auf unseren Dächern. Von oben sieht die Stadt besonders grün aus.',
      'Heute möchte ich mit meinen Freunden einen Spaziergang im Park machen.',
      'Siehst du die Solarmodule auf dem Foto? Sie versorgen unsere Gebäude mit Energie.',
      'Am Freitag nehme ich den Zug und besuche meine Freunde in einem anderen Viertel.',
    ],
    facts: [
      'Freitags ist der öffentliche Nahverkehr in Zapzipstadt für alle kostenlos!',
      'Parks und Grünflächen nehmen 30 % der Stadtfläche ein.',
      'Auf dem gesunden Markt gibt es jeden Sonntag Live-Musik.',
      'Unsere Umweltschule nutzt erneuerbare Energie und hat viele grüne Pflanzen.',
      'Die Michien pflanzten 2002 die ersten Felder mit Katzengras.',
      'In Zapzipstadt leben rund fünf Millionen Einwohner.',
    ],
  },
  {
    comments: [
      'Im Stadtfilm begleite ich dich durch die grünen Parks von Zapzipstadt.',
      'Wenn die Sonne scheint, fahre ich mit dem Rad zum Markt und treffe meine Freunde.',
      'Mein Lieblingsziel ist das fliegende Gebäude. Von dort sieht man die ganze Stadt!',
      'Heute möchte ich zum Katzengrasfeld. Dort spiele ich gern mit den anderen Michien.',
      'Ein Spaziergang durch unsere Parks ist für mich der schönste Start in den Tag.',
      'Ich helfe gern beim Bäumepflanzen. Danach gönne ich mir etwas vom Markt.',
      'Im Stadtfilm kannst du entdecken, wo wir spazieren gehen und Musik hören.',
      'Ich möchte bald wieder mit dem elektrischen Zug durch Zapzipstadt fahren.',
    ],
    facts: [
      'Unser fliegendes Gebäude funktioniert mit Solarenergie!',
      'Zapzipstadt ist 1.400 km² groß. Davon sind 800 km² ländliches Gebiet.',
      'Die Michien bauten 2020 die ersten fliegenden Gebäude.',
      'Die Umweltschule wurde 2010 gegründet.',
      'Die Lebenserwartung in Zapzipstadt liegt zwischen 80 und 90 Jahren.',
      'Am futuristischen Bahnhof fahren elektrische Züge durch die Stadt.',
    ],
  },
]

const commentDelay = [3600, 8200]
const commentDuration = [3000, 5500]
const factDuration = 5500
const commentChance = 0.6
const dragThreshold = 6
const reducedMotion = '(prefers-reduced-motion: reduce)'

function randomBetween([min, max]) {
  return Math.round(min + Math.random() * (max - min))
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

export default function TourismGuide({ activeView }) {
  const guideRef = useRef(null)
  const walkerRef = useRef(null)
  const frontRef = useRef(null)
  const gestureRef = useRef(null)
  const returnAnimationRef = useRef(null)
  const suppressClick = useRef(false)
  const [motion, setMotion] = useState('walking')
  const [manualFacing, setManualFacing] = useState(null)
  const lastComment = useRef('')
  const factIndexes = useRef(guideContent.map(() => 0))
  const [visible, setVisible] = useState(false)
  const [speech, setSpeech] = useState(null)
  const content = guideContent[activeView]
  const currentSpeech = speech?.view === activeView ? speech : null
  const tellingFact = currentSpeech?.kind === 'fact'

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (!entry.isIntersecting) setSpeech(null)
    })
    observer.observe(guideRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setSpeech(null)
  }, [activeView])

  useEffect(() => {
    if (!currentSpeech) return
    const timer = window.setTimeout(() => setSpeech(null), currentSpeech.duration)
    return () => window.clearTimeout(timer)
  }, [currentSpeech])

  useEffect(() => {
    if (!visible || currentSpeech || motion !== 'walking') return

    let timer
    function scheduleComment() {
      timer = window.setTimeout(() => {
        const shouldSpeak = !document.hidden
          && !window.matchMedia(reducedMotion).matches
          && Math.random() < commentChance

        if (!shouldSpeak) {
          scheduleComment()
          return
        }

        const choices = content.comments.filter((comment) => comment !== lastComment.current)
        const text = choices[Math.floor(Math.random() * choices.length)]
        lastComment.current = text
        setSpeech({ text, kind: 'comment', duration: randomBetween(commentDuration), view: activeView })
      }, randomBetween(commentDelay))
    }

    scheduleComment()
    return () => window.clearTimeout(timer)
  }, [activeView, content, currentSpeech, motion, visible])

  useEffect(() => () => returnAnimationRef.current?.cancel(), [])

  function grabYuki(event) {
    if (!event.isPrimary || event.button !== 0 || gestureRef.current) return

    const walker = walkerRef.current
    const [x = 0, y = 0] = getComputedStyle(walker).translate.split(' ').map(Number.parseFloat)
    const offsetX = Number.isFinite(x) ? x : 0
    const offsetY = Number.isFinite(y) ? y : 0
    const button = event.currentTarget.getBoundingClientRect()

    returnAnimationRef.current?.cancel()
    returnAnimationRef.current = null
    walker.style.translate = `${offsetX}px ${offsetY}px`
    suppressClick.current = false
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      grabX: event.clientX - button.left,
      grabY: event.clientY - button.top,
      x: offsetX,
      y: offsetY,
      facing: Number(getComputedStyle(frontRef.current).opacity) >= 0.5 ? 'front' : 'back',
      dragged: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setMotion('held')
  }

  function moveYuki(event) {
    const gesture = gestureRef.current
    if (gesture?.pointerId !== event.pointerId) return

    if (!gesture.dragged) {
      if (Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY) < dragThreshold) return
      gesture.dragged = true
      setSpeech(null)
      setMotion('dragging')
    }

    const guide = guideRef.current.getBoundingClientRect()
    const bounds = guideRef.current.closest('#tourismus').getBoundingClientRect()
    const button = event.currentTarget.getBoundingClientRect()
    const left = clamp(event.clientX - gesture.grabX, bounds.left, bounds.right - button.width)
    const top = clamp(event.clientY - gesture.grabY, bounds.top, bounds.bottom - button.height)
    const x = gesture.x + left - button.left
    const y = gesture.y + top - button.top
    const verticalChange = y - gesture.y

    if (Math.abs(verticalChange) >= 0.5) {
      gesture.facing = verticalChange < 0 ? 'back' : 'front'
    }
    setManualFacing(gesture.facing)
    gesture.x = x
    gesture.y = y
    walkerRef.current.style.translate = `${x}px ${y}px`
  }

  function releaseYuki(event) {
    const gesture = gestureRef.current
    if (gesture?.pointerId !== event.pointerId) return

    gestureRef.current = null
    suppressClick.current = gesture.dragged
    const walker = walkerRef.current
    const offset = walker.style.translate
    walker.style.translate = ''

    if (Math.hypot(gesture.x, gesture.y) < 1 || window.matchMedia(reducedMotion).matches) {
      setManualFacing(null)
      setMotion('walking')
      return
    }

    setManualFacing(gesture.y > 0 ? 'back' : gesture.y < 0 ? 'front' : gesture.facing)
    setMotion('returning')
    const animation = walker.animate(
      [{ translate: offset }, { translate: '0px 0px' }],
      { duration: 780, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    )
    returnAnimationRef.current = animation
    animation.onfinish = () => {
      if (returnAnimationRef.current !== animation) return
      returnAnimationRef.current = null
      setManualFacing(null)
      setMotion('walking')
    }
  }

  function tellFact(event) {
    if (event.detail > 0 && suppressClick.current) return
    const index = factIndexes.current[activeView] % content.facts.length
    factIndexes.current[activeView] += 1
    setSpeech({ text: content.facts[index], kind: 'fact', duration: factDuration, view: activeView })
  }

  return (
    <div className="tourism-guide" ref={guideRef} data-visible={visible}>
      <div
        className="tourism-guide-walker"
        ref={walkerRef}
        data-speaking={tellingFact}
        data-motion={motion}
        data-facing={tellingFact ? 'front' : manualFacing ?? undefined}
      >
        {currentSpeech && (
          <p
            key={currentSpeech.text}
            className="tourism-guide-bubble"
            style={{ '--yuki-speech-duration': `${currentSpeech.duration}ms` }}
          >
            {currentSpeech.text}
          </p>
        )}

        <button
          className="tourism-guide-cat"
          type="button"
          aria-label="Yuki nach einer Besonderheit fragen"
          title="Yuki ziehen oder antippen"
          onPointerDown={grabYuki}
          onPointerMove={moveYuki}
          onPointerUp={releaseYuki}
          onPointerCancel={releaseYuki}
          onLostPointerCapture={releaseYuki}
          onClick={tellFact}
        >
          <span className="tourism-guide-sprite" aria-hidden="true">
            <span className="tourism-guide-gait">
              <img className="tourism-guide-back" src={back} alt="" width={1230} height={1278} />
              <img ref={frontRef} className="tourism-guide-front" src={front} alt="" width={397} height={629} />
            </span>
          </span>
          <span className="tourism-guide-name">Yuki</span>
        </button>
      </div>
      <span className="tourism-visually-hidden" role="status">{tellingFact ? currentSpeech.text : ''}</span>
    </div>
  )
}
