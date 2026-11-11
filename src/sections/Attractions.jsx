import { cityPlaces } from './cityPlaces.js'
import './Attractions.css'

const attractions = [
  ['katzengrasfeld', 'Spaziere durchs Katzengras und genieße die frische Luft. Zwischen Blumen und Bäumen spielen die Michien.'],
  ['umweltschule', 'Besuche die grüne Schule der Michien. Hier erfährst du, wie sie erneuerbare Energie nutzt und die Natur schützt.'],
  ['bahnhof', 'Steig ein und entdecke Zapzipstadt mit dem Elektrozug. Freitags fährst du kostenlos mit öffentlichen Verkehrsmitteln.'],
  ['markt', 'Schlendere an den bunten Ständen vorbei und entdecke frisches Gemüse aus der Region. Jeden Sonntag gibt es Live-Musik.'],
].map(([id, description]) => ({ place: cityPlaces.find((place) => place.id === id), description }))

export default function Attractions() {
  return (
    <section id="sehenswuerdigkeiten" className="attractions" aria-labelledby="attractions-heading">
      <h2 id="attractions-heading" className="attractions-heading">Sehenswürdigkeiten</h2>

      <div className="attractions-grid">
        {attractions.map(({ place, description }) => (
          <article className="attraction-card" key={place.id}>
            <div className="attraction-illustration">
              <img src={place.image} alt={place.alt} width={1254} height={1254} loading="lazy" decoding="async" />
            </div>
            <div className="attraction-content">
              <h3>{place.name}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
