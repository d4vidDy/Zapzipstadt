import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { cityPlaces } from './cityPlaces.js'
import './Attractions.css'

const attractions = [
  ['katzengrasfeld', 'Das Katzengrasfeld', 'Das ist ein Feld, das sehr groß ist und viel Katzengras hat. Man besucht es gern, weil es so frisch und grün ist.'],
  ['umweltschule', 'Die Umweltschule', 'Das ist eine Schule, die sehr modern ist. Viele Besucher sagen, dass man hier viel über die Natur lernt.'],
  ['bahnhof', 'Der Bahnhof', 'Das ist ein Bahnhof, der futuristisch aussieht. Man besucht ihn gern, weil alle Züge nachhaltig sind.'],
  ['markt', 'Der Markt', 'Das ist ein Markt, der sehr bunt ist. Man geht gern dorthin, weil es dort gesundes Gemüse gibt.'],
].map(([id, name, description]) => ({ place: cityPlaces.find((place) => place.id === id), name, description }))

export default function Attractions() {
  const [singleView, setSingleView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryRef = useRef(null)
  const visibleAttractions = singleView ? [attractions[activeIndex]] : attractions

  function changeView(nextView) {
    setSingleView(nextView)
    window.requestAnimationFrame(() => {
      const gallery = galleryRef.current
      if (!gallery) return

      const target = nextView ? gallery.parentElement : gallery
      const top = target.getBoundingClientRect().top
      const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      if (top >= scrollPadding && top < window.innerHeight) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'instant' : 'smooth' })
    })
  }

  function selectAttraction(index) {
    setActiveIndex(index)
    if (!singleView) changeView(true)
  }

  function moveSelection(direction) {
    setActiveIndex((index) => (index + direction + attractions.length) % attractions.length)
  }

  return (
    <section id="sehenswuerdigkeiten" className="attractions" aria-labelledby="attractions-heading">
      <h2 id="attractions-heading" className="attractions-heading">Sehenswürdigkeiten</h2>

      <div id="attractions-gallery" ref={galleryRef} className="attractions-grid" data-view={singleView ? 'single' : 'group'}>
        {visibleAttractions.map(({ place, name, description }) => (
          <article className="attraction-card" key={place.id}>
            <div className="attraction-illustration">
              <img src={place.image} alt={place.alt} width={1254} height={1254} loading="lazy" decoding="async" />
            </div>
            <div className="attraction-content">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="attractions-controls">
        <button
          className="attractions-view-toggle"
          type="button"
          aria-controls="attractions-gallery"
          aria-label={singleView ? 'Alle Orte anzeigen' : 'Einzeln anzeigen'}
          onClick={() => changeView(!singleView)}
        >
          {singleView ? <LayoutGrid size={19} aria-hidden="true" /> : <Maximize2 size={19} aria-hidden="true" />}
        </button>
        <div className="attractions-carousel" role="group" aria-label="Sehenswürdigkeit auswählen">
          <button
            className="attractions-arrow"
            type="button"
            aria-label="Vorherige Sehenswürdigkeit"
            aria-controls="attractions-gallery"
            disabled={!singleView}
            onClick={() => moveSelection(-1)}
          >
            <ChevronLeft size={19} aria-hidden="true" />
          </button>
          <div className="attractions-thumbnails">
            {attractions.map(({ place, name }, index) => (
              <button
                className="attractions-thumbnail"
                key={place.id}
                type="button"
                aria-label={name}
                aria-controls="attractions-gallery"
                aria-pressed={singleView && index === activeIndex}
                onClick={() => selectAttraction(index)}
              >
                <img src={place.image} alt="" width={1254} height={1254} loading="lazy" decoding="async" />
                <span>{name}</span>
              </button>
            ))}
          </div>
          <button
            className="attractions-arrow"
            type="button"
            aria-label="Nächste Sehenswürdigkeit"
            aria-controls="attractions-gallery"
            disabled={!singleView}
            onClick={() => moveSelection(1)}
          >
            <ChevronRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
