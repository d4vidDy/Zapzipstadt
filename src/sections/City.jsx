import { useLayoutEffect, useRef, useState } from 'react'
import { cityPlaces } from './cityPlaces.js'
import './City.css'

function Arrow({ back = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={back ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} />
    </svg>
  )
}

function CityInfographic() {
  return (
    <div className="city-infographic">
      <div className="city-land">
        <svg className="city-land-chart" viewBox="0 0 200 200" role="img" aria-label="1.400 Quadratkilometer: 600 Stadtgebiet und 800 ländliches Gebiet">
          <circle className="city-chart-track" cx="100" cy="100" r="77" />
          <circle className="city-chart-urban" cx="100" cy="100" r="77" strokeDasharray="207.35 483.81" transform="rotate(-90 100 100)" />
          <text x="100" y="99" className="city-chart-total">1.400</text>
          <text x="100" y="120" className="city-chart-unit">km² Gesamtfläche</text>
        </svg>
        <div className="city-land-copy">
          <p className="city-eyebrow">Die Stadt in Zahlen</p>
          <h3>Platz für Stadt.<br />Raum für Natur.</h3>
          <ul className="city-land-legend">
            <li><span className="city-legend-dot city-legend-dot--urban" /><strong>600 km²</strong><span>Stadtgebiet</span></li>
            <li><span className="city-legend-dot city-legend-dot--rural" /><strong>800 km²</strong><span>Ländliches Gebiet</span></li>
          </ul>
        </div>
      </div>
      <div className="city-green-space">
        <span className="city-leaf" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none"><path d="M31 7C15 6 7 13 9 24c1 7 12 11 18 3 4-5 4-13 4-20Z" /><path d="m8 34 17-19M15 27l-1-9m7 3 7-1" /></svg>
        </span>
        <p className="city-eyebrow">Parks & Grünflächen</p>
        <p className="city-green-value">30<span>%</span></p>
        <p className="city-green-description">der gesamten Stadtfläche sind Parks und Grünflächen.</p>
        <div className="city-green-meter" role="meter" aria-label="Anteil der Parks und Grünflächen" aria-valuemin={0} aria-valuemax={100} aria-valuenow={30}>
          <span />
        </div>
      </div>
    </div>
  )
}

export default function City() {
  const [selectedId, setSelectedId] = useState(null)
  const tileRefs = useRef(new Map())
  const stageRef = useRef(null)
  const detailRef = useRef(null)
  const selectedPlace = cityPlaces.find((place) => place.id === selectedId)
  const isDetail = Boolean(selectedPlace)

  useLayoutEffect(() => {
    // Keep long descriptions in the mobile layout without fixing their height.
    const stage = stageRef.current
    let frame = 0
    let previousHeight = -1
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.ceil(entry.contentRect.height)
      if (height === previousHeight) return
      previousHeight = height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--detail-copy-height', `${height}px`)
      })
    })
    observer.observe(detailRef.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  function returnToMap() {
    const previousId = selectedId
    setSelectedId(null)
    requestAnimationFrame(() => tileRefs.current.get(previousId)?.focus({ preventScroll: true }))
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && isDetail) {
      event.preventDefault()
      returnToMap()
    }
  }

  return (
    <section id="unsere-stadt" className="city" aria-labelledby="city-heading" onKeyDown={handleKeyDown}>
      <header className="city-intro">
        <p className="city-eyebrow">Unsere Stadt · Zapzipstadt</p>
        <h2 id="city-heading">Fünf Orte. <span>Eine grüne Stadt.</span></h2>
        <p>Natur, Gemeinschaft und Zukunft. Entdecke die Welt der Michien.</p>
      </header>

      <div className="city-explorer" data-detail={isDetail}>
        <div className="city-map-toolbar">
          <button className="city-back" type="button" onClick={returnToMap} disabled={!isDetail} aria-hidden={!isDetail}>
            <Arrow back /> Zurück zur Stadt
          </button>
          <p className="city-map-instruction">
            <span className="city-status-dot" aria-hidden="true" />
            {isDetail ? 'Ein Ort. Viele Möglichkeiten.' : 'Wähle einen Ort auf der Karte'}
          </p>
        </div>

        <div ref={stageRef} className="city-stage" data-detail={isDetail} role="group" aria-label="Interaktive Stadtkarte">
          <svg className="city-map-connections" viewBox="0 0 1000 580" fill="none" aria-hidden="true">
            <path className="city-map-outline" d="m500 105 425 245-425 245L75 350Z" />
            <path className="city-map-route" d="m335 250 165 95 165-95M170 345l330 190 330-190M170 345l165-95M665 250l165 95M500 345v190" />
            <g className="city-map-nodes">
              <circle cx="500" cy="345" r="5" />
              <circle cx="335" cy="250" r="4" />
              <circle cx="665" cy="250" r="4" />
              <circle cx="170" cy="345" r="4" />
              <circle cx="830" cy="345" r="4" />
            </g>
          </svg>

          {cityPlaces.map((place) => {
            const active = selectedId === place.id
            const concealed = isDetail && !active
            return (
              <div
                key={place.id}
                className="city-tile"
                data-selected={active}
                data-concealed={concealed}
                aria-hidden={concealed || undefined}
                style={{ '--tile-x': place.position.x, '--tile-y': place.position.y, '--tile-layer': place.position.layer }}
              >
                <img className="city-tile-art" src={place.image} alt={place.alt} width={1254} height={1254} loading="lazy" decoding="async" />
                <button
                  ref={(node) => {
                    if (node) tileRefs.current.set(place.id, node)
                    else tileRefs.current.delete(place.id)
                  }}
                  className="city-tile-hitarea"
                  type="button"
                  aria-label={active ? `${place.name} – zurück zur Stadtkarte` : `${place.name} entdecken`}
                  aria-pressed={active}
                  aria-controls="city-place-details"
                  disabled={concealed}
                  aria-hidden={concealed || undefined}
                  onClick={() => active ? returnToMap() : setSelectedId(place.id)}
                />
                <span className="city-tile-label" aria-hidden="true">{place.name}<Arrow /></span>
              </div>
            )
          })}

          <div id="city-place-details" ref={detailRef} className="city-place-details" aria-live="polite" aria-atomic="true">
            {selectedPlace && (
              <article key={selectedPlace.id} className="city-place-copy">
                <p className="city-eyebrow">{selectedPlace.category}</p>
                <h3>{selectedPlace.name}</h3>
                <div className="city-place-description">
                  {selectedPlace.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <ul className="city-place-highlights" aria-label="Besonderheiten">
                  {selectedPlace.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </article>
            )}
          </div>
        </div>

        <div className="city-place-picker" role="group" aria-label="Ort auswählen">
          {cityPlaces.map((place) => (
            <button key={place.id} type="button" aria-pressed={selectedId === place.id} aria-controls="city-place-details" onClick={() => selectedId === place.id ? returnToMap() : setSelectedId(place.id)}>
              {place.label}
            </button>
          ))}
        </div>
      </div>

      <div className="city-overview" data-hidden={isDetail} aria-hidden={isDetail} inert={isDetail}>
        <div className="city-overview-inner">
          <div className="city-description">
            <h3>Das ist Zapzipstadt.</h3>
            <p>Ein großes Katzengrasfeld, eine moderne Umweltschule, ein futuristischer Bahnhof,
              ein fliegendes Gebäude mit großen Solarmodulen und ein bunter Markt mit gesundem
              Gemüse: In Zapzipstadt gehören Natur und moderne Technik zusammen.</p>
          </div>
          <dl className="city-stats" aria-label="Stadtstatistiken">
            <div><dt>Einwohner</dt><dd>5 <span>Millionen</span></dd></div>
            <div><dt>Stadtfläche</dt><dd>1.400 <span>km²</span></dd></div>
            <div><dt>Grünflächen</dt><dd>30 <span>%</span></dd></div>
            <div><dt>Lebenserwartung</dt><dd>80–90 <span>Jahre</span></dd></div>
            <div><dt>Lohngleichheit</dt><dd>2 <span>Mio. Zapzipesos</span><small>Für Frauen und Männer</small></dd></div>
          </dl>
          <CityInfographic />
        </div>
      </div>
    </section>
  )
}
