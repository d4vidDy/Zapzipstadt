import { useEffect, useState } from 'react'
import HeroBackground from '../components/HeroBackground.jsx'
import HeroWorld from '../components/HeroWorld.jsx'
import './Home.css'

const reducedMotion = '(prefers-reduced-motion: reduce)'

export default function Home() {
  const [motion, setMotion] = useState(() => !window.matchMedia(reducedMotion).matches)

  useEffect(() => {
    const preference = window.matchMedia(reducedMotion)
    const updateMotion = (event) => setMotion(!event.matches)
    preference.addEventListener('change', updateMotion)
    return () => preference.removeEventListener('change', updateMotion)
  }, [])

  return (
    <section id="startseite" className="hero" data-motion={motion ? 'on' : 'off'}>
      <HeroBackground motion={motion} />
      <div className="hero-copy">
        <p className="hero-kicker">Willkommen in</p>
        <h1>Zapzipstadt</h1>
        <p className="hero-slogan">Wo die Zukunft grün und die Luft sauber ist.</p>
        <a className="hero-link" href="#unsere-stadt">
          Stadt entdecken <span aria-hidden="true">↘</span>
        </a>
      </div>
      <HeroWorld />
    </section>
  )
}
