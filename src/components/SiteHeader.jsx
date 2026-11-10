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
const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']

function currentSection() {
  const section = window.location.hash.slice(1)
  return links.some(([id]) => id === section) ? section : firstSection
}

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState(currentSection)
  const [contentInView, setContentInView] = useState(false)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean)
    let frame = 0
    let settleTimer = 0
    let followingLink = false

    function updateFromScroll() {
      frame = 0
      const height = window.innerHeight
      const navBottom = navRef.current.getBoundingClientRect().bottom
      const remaining = document.documentElement.scrollHeight - height - window.scrollY
      // Move the reading line down near the end so short sections can still become active.
      const readingLine = Math.min(height - 1, Math.max(navBottom + 24, height - remaining))
      const viewedSection = sections.findLast((section) => section.getBoundingClientRect().top <= readingLine)
      const section = viewedSection?.id ?? firstSection
      setContentInView(section !== firstSection)
      if (!followingLink) setActiveSection(section)
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateFromScroll)
    }

    function releaseLink() {
      followingLink = false
      clearTimeout(settleTimer)
    }

    function waitForScrollToSettle() {
      clearTimeout(settleTimer)
      settleTimer = window.setTimeout(releaseLink, 180)
    }

    function selectLink(id) {
      // A clicked anchor stays selected during smooth scrolling to its destination.
      followingLink = true
      setActiveSection(id)
      waitForScrollToSettle()
      scheduleUpdate()
    }

    function handleScroll() {
      if (followingLink) waitForScrollToSettle()
      scheduleUpdate()
    }

    function handleHashChange() {
      selectLink(currentSection())
    }

    function handleAnchorClick(event) {
      if (event.defaultPrevented || event.button !== 0
        || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href^="#"]')
      const id = anchor?.hash.slice(1)
      if (sections.some((section) => section.id === id)) selectLink(id)
    }

    function handleScrollKey(event) {
      if (scrollKeys.includes(event.key)) releaseLink()
    }

    if (window.location.hash) handleHashChange()
    else scheduleUpdate()

    document.addEventListener('click', handleAnchorClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('wheel', releaseLink, { passive: true })
    window.addEventListener('touchstart', releaseLink, { passive: true })
    window.addEventListener('keydown', handleScrollKey)

    return () => {
      cancelAnimationFrame(frame)
      releaseLink()
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('wheel', releaseLink)
      window.removeEventListener('touchstart', releaseLink)
      window.removeEventListener('keydown', handleScrollKey)
    }
  }, [])

  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    const activeLink = nav.querySelector('[aria-current="location"]')

    function placeIndicator() {
      indicator.style.width = `${activeLink.offsetWidth}px`
      indicator.style.height = `${activeLink.offsetHeight}px`
      indicator.style.transform = `translate(${activeLink.offsetLeft}px, ${activeLink.offsetTop}px)`
    }

    placeIndicator()
    const frame = requestAnimationFrame(() => {
      indicator.dataset.ready = 'true'
    })
    const observer = new ResizeObserver(placeIndicator)
    observer.observe(nav)
    observer.observe(activeLink)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [activeSection])

  return (
    <header className="site-header" data-history-backdrop={activeSection === 'geschichte' && contentInView}>
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
