import { useEffect, useRef, useState } from 'react'
import planet from '../assets/images/planet_Zapzipstadt.png'
import front from '../assets/images/Michien_Zapzipstadt.png'
import back from '../assets/images/Michien_Backs_Zapzipstadt.png'
import founder from '../assets/images/Michien_Bürgermeister_Zapzipstadt.png'
import geography from '../assets/images/Michien_Geografie_Zapzipstadt.png'

const walkers = [
  { x: 138, y: 208, reach: 42, rise: 22, direction: 1, duration: 8.6, delay: -1.2 },
  { x: 300, y: 172, reach: 46, rise: 22, direction: -1, duration: 9.5, delay: -3.7 },
  { x: 453, y: 222, reach: 41, rise: 20, direction: 1, duration: 10.2, delay: -6.2 },
  { x: 124, y: 337, reach: 44, rise: 21, direction: -1, duration: 9.4, delay: -6.9 },
  { x: 293, y: 315, reach: 48, rise: 23, direction: 1, duration: 10.7, delay: -3.2 },
  { x: 466, y: 343, reach: 43, rise: 18, direction: -1, duration: 9.0, delay: -5.4 },
]

const sceneWidth = 599
const sceneHeight = 612

function scenePoint(x, y) {
  return `${x}px, ${y}px`
}

function walkStyle({ x, y, reach, rise, direction, duration, delay }, point = scenePoint) {
  return {
    '--walk-start': point(x - reach * direction, y + rise),
    '--walk-middle': point(x, y - rise * 0.38),
    '--walk-crest': point(x + reach * direction, y - rise),
    '--walk-duration': `${duration}s`,
    '--walk-delay': `${delay}s`,
  }
}

const founderWalk = walkStyle(
  { x: 453, y: 121, reach: 29, rise: 12, direction: 1, duration: 9.8, delay: -6.7 },
  (x, y) => `${x / sceneWidth * 100}%, ${y / sceneHeight * 100}%`,
)

function Michien(walker) {
  const route = walkStyle(walker)

  return (
    <g className="michien-route" style={route}>
      <g className="michien-step">
        <svg className="michien-front" x="-34" y="-61.4" width="68" height="61.4" viewBox="2 135 391 353">
          <image href={front} width="397" height="629" />
        </svg>
        <svg className="michien-back" x="-31" y="-71.6" width="62" height="71.6" viewBox="128 85 965 1115">
          <image href={back} width="1230" height="1278" />
        </svg>
      </g>
    </g>
  )
}

export default function HeroWorld() {
  const [storyMode, setStoryMode] = useState('closed')
  const founderRef = useRef(null)
  const storyRef = useRef(null)
  const previewTimeout = useRef(null)
  const storyOpen = storyMode !== 'closed'

  useEffect(() => {
    if (!storyOpen) return

    function dismissStory(event) {
      if (event.key !== 'Escape') return
      if (storyRef.current.contains(document.activeElement)) {
        founderRef.current.focus({ preventScroll: true })
      }
      setStoryMode('closed')
    }

    window.addEventListener('keydown', dismissStory)
    return () => {
      window.clearTimeout(previewTimeout.current)
      window.removeEventListener('keydown', dismissStory)
    }
  }, [storyOpen])

  function previewStory(event) {
    if (event.pointerType === 'mouse') {
      cancelPreviewClose()
      setStoryMode((current) => current === 'closed' ? 'preview' : current)
    }
  }

  function endPreview() {
    if (storyRef.current.contains(document.activeElement)) return
    setStoryMode((current) => current === 'preview' ? 'closed' : current)
  }

  function cancelPreviewClose() {
    window.clearTimeout(previewTimeout.current)
  }

  function schedulePreviewClose(event) {
    if (event.pointerType !== 'mouse' || storyMode !== 'preview') return

    cancelPreviewClose()
    previewTimeout.current = window.setTimeout(endPreview, 420)
  }

  return (
    <div className="hero-world" data-story-open={storyOpen} onPointerLeave={endPreview}>
      <svg className="hero-world__scene" viewBox={`0 0 ${sceneWidth} ${sceneHeight}`} width={sceneWidth} height={sceneHeight} aria-hidden="true" focusable="false">
        <image className="hero-world__planet" href={planet} x="-100" y="-89" width="800" height="800" />
        {walkers.map((walker) => <Michien key={walker.x} {...walker} />)}
      </svg>

      <div className="hero-founder-track michien-route" style={founderWalk} data-inspecting={storyOpen}>
        <button
          ref={founderRef}
          className="hero-founder"
          type="button"
          aria-label="Geschichte von Frau Zipzen"
          aria-expanded={storyOpen}
          aria-controls="gruendungsstory"
          onPointerEnter={previewStory}
          onPointerLeave={schedulePreviewClose}
          onClick={() => setStoryMode((current) => current === 'pinned' ? 'closed' : 'pinned')}
        >
          <span className="hero-founder__art michien-step" aria-hidden="true">
            <svg className="michien-front" viewBox="5 296 983 998" focusable="false">
              <image href={founder} width="996" height="1579" />
            </svg>
            <svg className="michien-back" viewBox="0 0 100 100" focusable="false">
              <svg x="8" y="5" width="84" height="95" viewBox="128 85 965 1115">
                <image href={back} width="1230" height="1278" />
              </svg>
              <svg x="9" y="6" width="27" height="20" viewBox="167 299 221 166">
                <clipPath id="hero-founder-crown">
                  <path d="M167 369 228 353 241 310 268 299 314 332 350 310 388 330 380 412 330 425 277 441 224 465 189 432Z" />
                </clipPath>
                <image href={founder} width="996" height="1579" clipPath="url(#hero-founder-crown)" />
              </svg>
            </svg>
          </span>
        </button>
      </div>

      <div id="gruendungsstory" ref={storyRef} className="hero-story" inert={!storyOpen}>
        <div className="hero-story__clip">
          <div className="hero-story__cards">
            <article className="hero-story__card" onPointerEnter={cancelPreviewClose} onPointerLeave={schedulePreviewClose}>
              <h2>Gründung</h2>
              <ul className="hero-story__facts">
                <li>Die Frau Zipzen reiste nach der Erde.</li>
                <li>Sie lernte die Menschen kennen.</li>
                <li>Sie lehrte der Menschen über ihren nachhaltigen Planeten (zupMichiPlanet).</li>
                <li>Die Menschen bedankten sich für die Hilfe und bauten eine nachhaltige Stadt (Zupzipstadt) für sie und ihre Leute (Michien).</li>
                <li>Sie brachte ihre Leute in der Stadt</li>
                <li>Zupzipstadt wurde die nachhaltige Stadt auf der Welt</li>
              </ul>
              <a href="#geschichte">Geschichte entdecken <span aria-hidden="true">↗</span></a>
            </article>

            <article className="hero-story__card" onPointerEnter={cancelPreviewClose} onPointerLeave={schedulePreviewClose}>
              <div className="hero-story__geography">
                <img src={geography} width={317} height={286} alt="Eine Karte mit einer goldenen Katze" decoding="async" />
                <h2>Das Leben vor 50 Jahren</h2>
              </div>
              <ul className="hero-story__facts">
                <li>Die Michien fühlten sich frei.</li>
                <li>Die Michien wuschen sich mit ihren Zungen.</li>
                <li>Die Michien interessierten sich für den Umweltschutz.</li>
                <li>Die Michien erinnerten sich an ihren nachhaltigen Traditionen.</li>
                <li>Die Michien kümmerten sich um die Umwelt.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
