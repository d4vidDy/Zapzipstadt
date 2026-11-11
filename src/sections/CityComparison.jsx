import { useEffect, useRef, useState } from 'react'
import { cityComparisons } from './cityComparisons.js'
import './CityComparison.css'

const mediaDirectory = `${import.meta.env.BASE_URL}media/`

export default function CityComparison() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showMotion, setShowMotion] = useState(true)
  const panelsRef = useRef(null)

  useEffect(() => {
    if (!showMotion) return

    const panels = panelsRef.current
    const video = panels.querySelectorAll('video')[activeIndex]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false

    function syncPlayback() {
      if (visible && !reducedMotion.matches) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.25
      syncPlayback()
    }, { threshold: 0.25 })
    observer.observe(panels)
    reducedMotion.addEventListener('change', syncPlayback)

    return () => {
      observer.disconnect()
      observer.takeRecords()
      reducedMotion.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [activeIndex, showMotion])

  function handleTabKeys(event) {
    const lastIndex = cityComparisons.length - 1
    const destinations = {
      ArrowLeft: (activeIndex + lastIndex) % cityComparisons.length,
      ArrowRight: (activeIndex + 1) % cityComparisons.length,
      Home: 0,
      End: lastIndex,
    }
    const nextIndex = destinations[event.key]
    if (nextIndex === undefined) return

    event.preventDefault()
    setActiveIndex(nextIndex)
    event.currentTarget.querySelectorAll('[role="tab"]')[nextIndex].focus()
  }

  return (
    <section className="city-comparison" aria-labelledby="city-comparison-heading">
      <div className="city-comparison-heading">
        <h3 id="city-comparison-heading">Zapzipstadt <span>im Vergleich</span></h3>
        <div
          className="city-comparison-tabs"
          role="tablist"
          aria-label="Stadt zum Vergleichen"
          onKeyDown={handleTabKeys}
          style={{ '--comparison-index': activeIndex }}
        >
          {cityComparisons.map(({ id, name }, index) => (
            <button
              key={id}
              id={`comparison-tab-${id}`}
              type="button"
              role="tab"
              aria-controls={`comparison-panel-${id}`}
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="city-comparison-panels" ref={panelsRef}>
        {cityComparisons.map(({ id, name, location, alt, media, topic, real, fictional }, index) => {
          const isActive = index === activeIndex
          const poster = `${mediaDirectory}${media}.webp`
          return (
            <div
              key={id}
              className="city-comparison-panel"
              id={`comparison-panel-${id}`}
              role="tabpanel"
              aria-labelledby={`comparison-tab-${id}`}
              aria-hidden={!isActive}
              data-active={isActive}
              inert={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              <figure className="city-comparison-media">
                <video
                  src={`${mediaDirectory}${media}.mp4`}
                  poster={poster}
                  aria-label={alt}
                  width={1920}
                  height={1080}
                  preload="none"
                  muted
                  loop
                  playsInline
                />
                <figcaption>{location}</figcaption>
              </figure>
              <div className="city-comparison-copy">
                <h4>{topic}</h4>
                <dl>
                  <div><dt>{name}</dt><dd>{real}</dd></div>
                  <div><dt>Zapzipstadt</dt><dd>{fictional}</dd></div>
                </dl>
              </div>
            </div>
          )
        })}
      </div>

      <div className="city-comparison-footer">
        <p>Zapzipstadt ist eine fiktive Stadt aus unserem Deutschprojekt.</p>
        <button type="button" onClick={() => setShowMotion((enabled) => !enabled)}>
          {showMotion ? 'Video anhalten' : 'Video abspielen'}
        </button>
      </div>
    </section>
  )
}
