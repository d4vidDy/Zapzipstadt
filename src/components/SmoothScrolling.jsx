import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function SmoothScrolling() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      virtualScroll: ({ event }) => !event.shiftKey,
    })

    function targetFromHash(hash) {
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)))
      } catch {
        return null
      }
    }

    const initialFrame = requestAnimationFrame(() => {
      const target = targetFromHash(window.location.hash)
      if (target) lenis.scrollTo(target, { immediate: true })
    })

    function handleAnchor(event) {
      if (event.defaultPrevented || event.button !== 0
        || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href]')
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname
        || url.search !== window.location.search || !url.hash) return

      const target = targetFromHash(url.hash)
      if (!target) return

      event.preventDefault()
      if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash)
      lenis.scrollTo(target, { duration: 1.4, lerp: 0 })
    }

    // Bubble after the navigation has marked the clicked section as active.
    window.addEventListener('click', handleAnchor)
    return () => {
      cancelAnimationFrame(initialFrame)
      window.removeEventListener('click', handleAnchor)
      lenis.destroy()
    }
  }, [])

  return null
}
