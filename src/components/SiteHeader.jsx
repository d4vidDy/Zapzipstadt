import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const links = [
  ['startseite', 'Startseite'],
  ['geschichte', 'Geschichte'],
  ['unsere-stadt', 'Unsere Stadt'],
  ['tourismus', 'Tourismus und Freizeit'],
  ['sehenswuerdigkeiten', 'Sehenswürdigkeiten'],
  ['quellen', 'Quellen'],
]

const firstSection = links[0][0]
const boundaryBuffer = 10

function initialSection() {
  const id = window.location.hash.slice(1)
  return links.some(([section]) => section === id) ? id : firstSection
}

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState(initialSection)
  const [contentBackdrop, setContentBackdrop] = useState(() => initialSection() !== firstSection)
  const activeIndexRef = useRef(links.findIndex(([id]) => id === activeSection))
  const backdropVisibleRef = useRef(contentBackdrop)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const indicatorGeometryRef = useRef(null)

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean)
    const history = document.getElementById('geschichte')
    const header = navRef.current.closest('header')
    let frame = 0
    let coverHeight = -1

    function updateFromPosition() {
      frame = 0
      const height = window.innerHeight
      const navBottom = navRef.current.getBoundingClientRect().bottom
      const sectionLine = Math.max(navBottom + 24, Math.min(height * 0.24, navBottom + 120))
      const remaining = Math.max(0, document.documentElement.scrollHeight - height - window.scrollY)
      const readingLine = Math.min(height - 1, Math.max(sectionLine, height - remaining))
      const tops = sections.map((section) => section.getBoundingClientRect().top)
      const nextIndex = Math.max(0, tops.findLastIndex((top) => top <= readingLine))
      const currentIndex = activeIndexRef.current

      // A small distance buffer prevents reversals from tiny movements at a boundary.
      const crossesForward = nextIndex > currentIndex && tops[nextIndex] <= readingLine - boundaryBuffer
      const crossesBackward = nextIndex < currentIndex && tops[currentIndex] >= readingLine + boundaryBuffer
      if (crossesForward || crossesBackward) {
        activeIndexRef.current = nextIndex
        setActiveSection(sections[nextIndex].id)
      }

      // The background follows the end of the hero, independently of the selected link.
      if (history) {
        const historyTop = history.getBoundingClientRect().top
        const nextCoverHeight = Math.ceil(Math.max(navBottom + 8, Math.min(historyTop, sectionLine + boundaryBuffer)))
        if (coverHeight !== nextCoverHeight) {
          coverHeight = nextCoverHeight
          header.style.setProperty('--header-cover-height', `${coverHeight}px`)
        }
        const visible = backdropVisibleRef.current
        const nextVisible = visible
          ? historyTop < sectionLine + boundaryBuffer
          : historyTop <= sectionLine - boundaryBuffer
        if (visible !== nextVisible) {
          backdropVisibleRef.current = nextVisible
          setContentBackdrop(nextVisible)
        }
      }
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateFromPosition)
    }

    const layoutObserver = new ResizeObserver(scheduleUpdate)
    sections.forEach((section) => layoutObserver.observe(section))
    layoutObserver.observe(navRef.current)
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      layoutObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [])

  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    let frame = 0
    let readyFrame = 0

    function placeIndicator() {
      const activeLink = nav.querySelector('[aria-current="location"]')
      const navRect = nav.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const geometry = {
        x: linkRect.left - navRect.left - nav.clientLeft,
        y: linkRect.top - navRect.top - nav.clientTop,
        width: linkRect.width,
        height: linkRect.height,
      }
      const previous = indicatorGeometryRef.current
      if (previous && Object.keys(geometry).every((key) => Math.abs(geometry[key] - previous[key]) < 0.1)) return

      indicatorGeometryRef.current = geometry
      indicator.style.width = `${geometry.width}px`
      indicator.style.height = `${geometry.height}px`
      indicator.style.transform = `translate3d(${geometry.x}px, ${geometry.y}px, 0)`
    }

    function schedulePlacement() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(placeIndicator)
    }

    placeIndicator()
    if (!indicator.hasAttribute('data-ready')) {
      readyFrame = requestAnimationFrame(() => {
        indicator.dataset.ready = 'true'
      })
    }

    // Every label can shift the active link, including after browser translation.
    const observer = new ResizeObserver(schedulePlacement)
    observer.observe(nav, { box: 'border-box' })
    nav.querySelectorAll('a').forEach((link) => observer.observe(link, { box: 'border-box' }))
    const labelsObserver = new MutationObserver(schedulePlacement)
    labelsObserver.observe(nav.querySelector('ul'), { childList: true, characterData: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(readyFrame)
      observer.disconnect()
      labelsObserver.disconnect()
    }
  }, [activeSection])

  return (
    <header className="site-header" data-history-backdrop={contentBackdrop}>
      <div className="site-header-backdrop" aria-hidden="true" />
      <nav ref={navRef} aria-label="Hauptnavigation">
        <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
        <ul>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
