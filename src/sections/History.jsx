import { useLayoutEffect, useRef, useState } from 'react'
import { periods } from './historyTimeline.js'
import './History.css'

const events = periods.flatMap((period, periodIndex) =>
  period.events.map((event) => ({ ...event, periodIndex })),
)

// Repeat enough cards to cover the widest layout during a wrap.
const loopBuffer = 3
const firstOriginal = loopBuffer
const afterOriginals = firstOriginal + events.length
const cards = [...events.slice(-loopBuffer), ...events, ...events.slice(0, loopBuffer)]
const reducedMotion = '(prefers-reduced-motion: reduce)'
const autoAdvanceMs = 5000

function eventIndex(cardIndex) {
  return (cardIndex - firstOriginal + events.length) % events.length
}

function nearestCard(timeline) {
  const max = timeline.scrollWidth - timeline.clientWidth
  const left = timeline.scrollLeft
  let nearest = 0
  let closest = Infinity

  for (let index = 0; index < timeline.children.length; index += 1) {
    const distance = Math.abs(Math.min(timeline.children[index].offsetLeft, max) - left)
    if (distance < closest) {
      closest = distance
      nearest = index
    }
  }
  return nearest
}

function scrollToCard(timeline, index, instant = false) {
  const behavior = instant || window.matchMedia(reducedMotion).matches ? 'instant' : 'smooth'
  timeline.scrollTo({ left: timeline.children[index].offsetLeft, behavior })
}

function recenter(timeline, index) {
  const original = firstOriginal + eventIndex(index)
  if (original !== index) scrollToCard(timeline, original, true)
  return original
}

function moveTimeline(timeline, direction) {
  const index = recenter(timeline, nearestCard(timeline))
  scrollToCard(timeline, index + direction)
}

export default function History() {
  const timelineRef = useRef(null)
  const [position, setPosition] = useState({ index: 0, progress: 0 })
  const activePeriod = events[position.index].periodIndex

  useLayoutEffect(() => {
    const timeline = timelineRef.current
    const section = timeline.closest('.history')
    const motionPreference = window.matchMedia(reducedMotion)
    const canHover = window.matchMedia('(hover: hover)')
    let logicalIndex = 0
    let settleTimer = 0
    let autoplayTimer = 0
    let lastScrollAt = 0

    function updatePosition() {
      const index = eventIndex(nearestCard(timeline))
      logicalIndex = index
      const start = timeline.children[firstOriginal].offsetLeft
      const lastCard = timeline.children[afterOriginals - 1]
      // Complete the bar as soon as the final event fits in the viewport.
      const initialRight = start + timeline.clientWidth
      const completion = lastCard.offsetLeft + lastCard.offsetWidth - initialRight
      // Restart when the first card from the next lap is fully visible.
      const nextLapStart = timeline.children[afterOriginals]
      const end = nextLapStart.offsetLeft
      const restart = end + nextLapStart.offsetWidth - initialRight
      const lap = end - start
      const left = timeline.scrollLeft
      const relative = lap > 0 ? ((left - start) % lap + lap) % lap : 0
      const atStart = Math.abs(left - start) < 1.5 || Math.abs(left - end) < 1.5
      const progress = atStart || relative + 1 >= restart || completion <= 0
        ? 0
        : Math.min(100, Math.round(((relative + 1) / completion) * 1000) / 10)

      setPosition((previous) => previous.index === index && previous.progress === progress
        ? previous
        : { index, progress })
    }

    function handleScroll() {
      lastScrollAt = performance.now()
      updatePosition()
      clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        // The repeated cards let the same view continue from its original position.
        recenter(timeline, nearestCard(timeline))
      }, 150)
    }

    function alignToCurrentEvent() {
      scrollToCard(timeline, firstOriginal + logicalIndex, true)
      updatePosition()
    }

    function autoAdvance() {
      const hovered = canHover.matches && section.querySelector('.history-rail:hover, .history-controls:hover, .history-periods:hover')
      const focused = section.contains(document.activeElement) && document.activeElement.matches(':focus-visible')
      if (motionPreference.matches || document.hidden || hovered || focused || performance.now() - lastScrollAt < 3500) return

      moveTimeline(timeline, 1)
    }

    alignToCurrentEvent()
    const resize = new ResizeObserver(alignToCurrentEvent)
    resize.observe(timeline)
    const visibility = new IntersectionObserver(([entry]) => {
      clearInterval(autoplayTimer)
      if (entry.intersectionRatio >= 0.25) autoplayTimer = window.setInterval(autoAdvance, autoAdvanceMs)
    }, { threshold: 0.25 })
    visibility.observe(timeline)
    timeline.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      resize.disconnect()
      visibility.disconnect()
      clearTimeout(settleTimer)
      clearInterval(autoplayTimer)
      timeline.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function goToPeriod(periodIndex) {
    const index = events.findIndex((event) => event.periodIndex === periodIndex)
    scrollToCard(timelineRef.current, firstOriginal + index)
  }

  function handleTimelineKey(event) {
    const offsets = { ArrowLeft: -1, ArrowRight: 1 }
    const offset = offsets[event.key]
    if (offset === undefined) return

    event.preventDefault()
    moveTimeline(timelineRef.current, offset)
  }

  return (
    <section id="geschichte" className="history" aria-labelledby="geschichte-heading">
      <header className="history-intro">
        <p className="history-kicker">Stadtgeschichte · 2000–2026</p>
        <h2 id="geschichte-heading" className="history-heading">Die Geschichte von Zapzipstadt</h2>
        <p className="history-summary">
          Im Jahr 2000 kam Frau Zipzen auf die Erde. Sie zeigte den Menschen, wie die Michien
          umweltfreundlich lebten. Als Dank bauten die Menschen Zapzipstadt für sie und ihr Volk.
        </p>
      </header>

      <div className="history-periods" role="group" aria-label="Zeitraum auswählen">
        {periods.map((period, index) => (
          <button
            key={period.years}
            className="history-period"
            type="button"
            aria-pressed={activePeriod === index}
            aria-controls="geschichte-zeitstrahl"
            onClick={() => goToPeriod(index)}
          >
            <span className="history-period-label">
              <strong>{period.years}</strong>
              <span>{period.title}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="history-toolbar">
        <div>
          <h3>Der Zeitstrahl</h3>
          <p>12 Stationen in vier Zeiträumen</p>
        </div>
        <div className="history-controls" role="group" aria-label="Zeitstrahl bewegen">
          <button
            type="button"
            aria-label="Vorherige Station"
            aria-controls="geschichte-zeitstrahl"
            onClick={() => moveTimeline(timelineRef.current, -1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Nächste Station"
            aria-controls="geschichte-zeitstrahl"
            onClick={() => moveTimeline(timelineRef.current, 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="history-rail">
        <progress
          className="history-progress"
          max={100}
          value={position.progress}
          aria-label="Fortschritt auf dem Zeitstrahl"
        />
        <ol
          id="geschichte-zeitstrahl"
          className="history-events"
          aria-label="Stationen in chronologischer Reihenfolge"
          ref={timelineRef}
          tabIndex={0}
          onKeyDown={handleTimelineKey}
        >
          {cards.map((event, index) => {
            const logicalIndex = eventIndex(index)
            const repeated = index < firstOriginal || index >= afterOriginals

            return (
              <li
                key={index}
                className="history-event"
                aria-hidden={repeated || undefined}
                data-current={logicalIndex === position.index}
              >
                <div className="history-illustration">
                  <img src={event.image} alt={event.alt} loading={!repeated && logicalIndex < 3 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <div className="history-marker" aria-hidden="true" />
                <div className="history-event-info">
                  <time dateTime={String(event.year)}>{event.year}</time>
                  <h4>{event.title}</h4>
                  <p>{event.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
