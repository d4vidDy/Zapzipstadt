import { useState } from 'react'
import mainLogo from '../assets/images/Main_logo_Zapzipstadt.webp'
import { cityComparisons } from './cityComparisons.js'
import './Sources.css'

export default function Sources() {
  const [showDocumentation, setShowDocumentation] = useState(false)

  return (
    <footer id="quellen" className="site-footer" aria-labelledby="sources-heading">
      <div className="site-footer-inner">
        <div className="site-footer-overview">
          <div className="site-footer-brand">
            <img className="site-footer-logo" src={mainLogo} alt="Zapzipstadt" width={537} height={465} loading="lazy" />
            <p className="site-footer-slogan">Wo die Zukunft grün und die Luft sauber ist.</p>
          </div>

          <div className="site-footer-sources">
            <h2 id="sources-heading">Quellen</h2>

            <div className="site-footer-columns">
              <section>
                <h3>Projektquellen</h3>
                <ul>
                  <li>
                    <strong>Kurspräsentation Zapzipstadt</strong>
                    <p>Geschichte, Stadtstatistiken, Infografik, Stadtvergleich und Tourismus.</p>
                  </li>
                  <li>
                    <a href="https://www.canva.com/presentations/">Canva</a>
                    <p>Gestaltung der Kurspräsentation.</p>
                  </li>
                  {cityComparisons.map(({ id, name, credit, clipUrl, licenseName, licenseUrl, infoTitle, infoUrl }) => (
                    <li key={id}>
                      <a href={clipUrl}>{name} · {credit}</a>
                      <p><a href={licenseUrl}>{licenseName}</a> · Gekürzt und ohne Ton.</p>
                      <p><a href={infoUrl}>{infoTitle}</a></p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Internetseiten</h3>
                <ul>
                  <li>
                    <a href="https://github.com/darkroomengineering/lenis">Lenis</a>
                    <p>Flüssiges Scrollen zwischen den Abschnitten.</p>
                  </li>
                  <li>
                    <a href="https://react.dev/">React</a> und <a href="https://vite.dev/">Vite</a>
                    <p>Entwicklung der Website.</p>
                  </li>
                  <li>
                    <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages">GitHub Pages</a>
                    <p>Veröffentlichung der Website.</p>
                  </li>
                </ul>
              </section>

              <section>
                <h3>KI-Werkzeuge</h3>
                <ul>
                  <li>
                    <a href="https://openai.com/codex/">Codex von OpenAI</a>
                    <p>Unterstützung bei der Programmierung, der Gestaltung und der Fehlersuche.</p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="site-footer-details" data-expanded={showDocumentation}>
          <button
            className="site-footer-details-trigger"
            type="button"
            aria-expanded={showDocumentation}
            aria-controls="sources-documentation"
            onClick={() => setShowDocumentation((isExpanded) => !isExpanded)}
          >
            Fünf Prompts und KI-Reflexion
            <span className="site-footer-details-chevron" aria-hidden="true" />
          </button>
          <div className="site-footer-details-panel" id="sources-documentation" inert={!showDocumentation}>
            <div className="site-footer-details-clip">
              <div className="site-footer-details-content">
                <section>
                  <h3>Prompts zur Website</h3>
                  <p>Auszüge aus dem Spanischen, gekürzt und übersetzt.</p>
                  <ol>
                    <li><strong>Startseite.</strong> Lass den Planeten stillstehen und sechs Katzen sanft darüber laufen. Zeige die Katzen bergauf von hinten und bergab von vorn.</li>
                    <li><strong>Zeitstrahl.</strong> Lass die Zeitleiste nach rechts laufen und den Fortschritt mitwandern. Bei 2026 soll der Balken voll sein und bei 2000 neu beginnen.</li>
                    <li><strong>Stadtkarte.</strong> Ordne die fünf Orte als Karte an. Beim Anklicken soll der gewählte Ort größer werden und links neben seiner Beschreibung erscheinen.</li>
                    <li><strong>Tourismus.</strong> Lass Herzen über dem Fotobeitrag aufsteigen, wenn man mit der Maus darüberfährt.</li>
                    <li><strong>Sehenswürdigkeiten.</strong> Gib den Karten einen matten Glaseffekt und einen feinen Neonrand. Beim Darüberfahren sollen sie sich sanft anheben.</li>
                  </ol>
                </section>
                <section>
                  <h3>Reflexion zur KI-Nutzung</h3>
                  <p>
                    Wir haben Codex eingesetzt, um Ideen aus unserer Präsentation als interaktive Website umzusetzen.
                    So entstanden der bewegliche Zeitstrahl, die Stadtkarte und die Animationen im Tourismusbereich.
                    Wir haben die Vorschläge ausprobiert und den Aufbau, die Abstände und die Bewegungen mehrfach
                    angepasst. Dabei haben wir gelernt, dass genaue Prompts und eigene Tests wichtig sind, damit
                    die Website zu unserem Projekt passt.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <p className="site-footer-bottom">Kurspräsentation von Jenny, Mariangel und Valeria</p>
      </div>
    </footer>
  )
}
