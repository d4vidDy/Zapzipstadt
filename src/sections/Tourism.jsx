import { useState } from 'react'
import instagramPost from '../assets/images/Post_Zapzipstadt.png'
import TourismGuide from './TourismGuide.jsx'
import './Tourism.css'

const mediaViews = [
  { id: 'tourism-instagram', label: 'Fotobeitrag' },
  { id: 'tourism-video', label: 'Stadtfilm' },
]

const heartColors = ['#ff497a', '#ff739e', '#ffb1c9']
const heartPositions = [
  [50, 68, -14], [24, 58, -34], [78, 71, 38], [37, 83, -28],
  [62, 51, 24], [14, 74, -46], [89, 64, 52], [45, 49, -22],
  [72, 85, 32], [31, 70, -48], [58, 77, 18], [17, 48, -30],
  [84, 45, 44], [67, 62, 27], [43, 88, -13], [54, 39, 16],
  [9, 88, -43], [92, 84, 47],
]

function InstagramPost() {
  return (
    <figure className="tourism-post">
      <img
        src={instagramPost}
        alt="Instagram-Beitrag mit einer Illustration der Umweltschule, des Katzengrasfelds und eines Zuges."
        width={572}
        height={1080}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="tourism-visually-hidden">
        Willkommen in Zupzipstadt! Besuche die Stadt, die 100% nachhaltig ist. Wenn du nach
        Zupzipstadt reist, siehst du fliegende Gebäude und grüne Felder mit Katzengras.
        Die Menschen und die Michien leben hier sehr glücklich, weil die Luft so sauber ist
        und es keinen Müll auf den Straßen gibt. Komm vorbei und entdecke unsere tolle
        Umweltschule! #Zupzipstadt #Nachhaltigkeit
      </figcaption>
      <span className="tourism-hearts" aria-hidden="true">
        {heartPositions.map(([x, y, drift], index) => (
          <span
            key={index}
            className="tourism-heart"
            style={{
              '--heart-x': `${x}%`,
              '--heart-y': `${y}%`,
              '--heart-drift': `${drift}px`,
              '--heart-tilt': `${drift < 0 ? -17 : 17}deg`,
              '--heart-delay': `${index * 105}ms`,
              '--heart-duration': `${2100 + (index % 4) * 170}ms`,
              '--heart-size': `${1 + (index % 5) * 0.29}rem`,
              '--heart-color': heartColors[index % heartColors.length],
            }}
          >
            ♥
          </span>
        ))}
      </span>
    </figure>
  )
}

export default function Tourism() {
  const [activeView, setActiveView] = useState(0)
  const showingPost = activeView === 0

  function handleArrowKey(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    setActiveView(event.key === 'ArrowLeft' ? 0 : 1)
  }

  return (
    <section id="tourismus" className="tourism" aria-labelledby="tourism-heading">
      <h2 id="tourism-heading" className="tourism-heading">Tourismus <span>und Freizeit</span></h2>

      <div className="tourism-layout">
        <div className="tourism-intro">
          <p className="tourism-slogan">
            Wo die Zukunft <em>grün</em> und die Luft <em>sauber</em> ist.
          </p>
          <TourismGuide activeView={activeView} />
        </div>

        <div
          className="tourism-carousel"
          role="region"
          aria-label="Instagram und Tourismusvideo"
          onKeyDown={handleArrowKey}
        >
          <div className="tourism-window">
            <div className="tourism-track">
              <div
                id={mediaViews[0].id}
                className="tourism-panel"
                role="group"
                aria-label="Instagram-Beitrag"
                aria-hidden={!showingPost}
                inert={!showingPost}
              >
                <InstagramPost />
              </div>

              <div
                id={mediaViews[1].id}
                className="tourism-panel"
                role="group"
                aria-label="Tourismusvideo"
                aria-hidden={showingPost}
                inert={showingPost}
              >
                <div className="tourism-video">
                  <h3>Zapzipstadt im Film</h3>
                  <p>
                    Begleite die Michien durch grüne Parks und über den Markt. Entdecke
                    das Katzengrasfeld und das fliegende Gebäude.
                  </p>
                  <div className="tourism-video-placeholder">
                    <span className="tourism-play-icon" aria-hidden="true">▶</span>
                    <span>Video folgt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tourism-controls" role="group" aria-label="Ansicht wechseln">
            <button
              className="tourism-arrow"
              type="button"
              aria-label="Vorherige Ansicht"
              aria-controls={mediaViews[0].id}
              aria-disabled={showingPost}
              onClick={() => setActiveView(0)}
            >
              <span aria-hidden="true">←</span>
            </button>

            <div className="tourism-view-picker">
              {mediaViews.map(({ id, label }, index) => (
                <button
                  key={id}
                  type="button"
                  aria-controls={id}
                  aria-pressed={activeView === index}
                  onClick={() => setActiveView(index)}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              className="tourism-arrow"
              type="button"
              aria-label="Nächste Ansicht"
              aria-controls={mediaViews[1].id}
              aria-disabled={!showingPost}
              onClick={() => setActiveView(1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <span className="tourism-visually-hidden" role="status">
            {showingPost ? 'Fotobeitrag' : 'Stadtfilm'}
          </span>
        </div>
      </div>
    </section>
  )
}
