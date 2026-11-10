import planet from '../assets/images/planet_Zapzipstadt.png'
import front from '../assets/images/Michien_Zapzipstadt.png'
import back from '../assets/images/Michien_Backs_Zapzipstadt.png'

const walkers = [
  { x: 138, y: 208, reach: 42, rise: 22, direction: 1, duration: 8.6, delay: -1.2 },
  { x: 300, y: 172, reach: 46, rise: 22, direction: -1, duration: 9.5, delay: -3.7 },
  { x: 453, y: 222, reach: 41, rise: 20, direction: 1, duration: 10.2, delay: -6.2 },
  { x: 124, y: 337, reach: 44, rise: 21, direction: -1, duration: 9.4, delay: -6.9 },
  { x: 293, y: 315, reach: 48, rise: 23, direction: 1, duration: 10.7, delay: -3.2 },
  { x: 466, y: 343, reach: 43, rise: 18, direction: -1, duration: 9.0, delay: -5.4 },
]

function Michien({ x, y, reach, rise, direction, duration, delay }) {
  const route = {
    '--walk-start': `${x - reach * direction}px, ${y + rise}px`,
    '--walk-middle': `${x}px, ${y - rise * 0.38}px`,
    '--walk-crest': `${x + reach * direction}px, ${y - rise}px`,
    '--walk-duration': `${duration}s`,
    '--walk-delay': `${delay}s`,
  }

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
  return (
    <svg className="hero-world" viewBox="0 0 599 612" width="599" height="612" aria-hidden="true" focusable="false">
      <image className="hero-world__planet" href={planet} x="-100" y="-89" width="800" height="800" />
      {walkers.map((walker) => <Michien key={walker.x} {...walker} />)}
    </svg>
  )
}
