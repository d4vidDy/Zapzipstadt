import { useEffect, useRef } from 'react'

const videoSource = `${import.meta.env.BASE_URL}media/Deep_space_background.mp4`

export default function HeroBackground({ motion }) {
  const firstRef = useRef(null)
  const secondRef = useRef(null)

  useEffect(() => {
    if (!motion) return

    const videos = [firstRef.current, secondRef.current]
    let active = videos[0]
    let transitioning = false
    let disposed = false
    let fade

    async function continueLoop(event) {
      const outgoing = event.currentTarget
      const fadeMs = Math.min(1050, outgoing.duration * 250)

      if (disposed || transitioning || outgoing !== active || !Number.isFinite(fadeMs)
        || outgoing.duration - outgoing.currentTime > fadeMs / 1000 + 0.28) return

      transitioning = true
      const incoming = videos.find((video) => video !== outgoing)
      outgoing.style.zIndex = '0'
      incoming.style.zIndex = '1'

      try {
        incoming.currentTime = 0
        await incoming.play()
        if (disposed) return

        fade = incoming.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: fadeMs,
          easing: 'ease-in-out',
          fill: 'forwards',
        })
        await fade.finished
        if (disposed) return

        incoming.style.opacity = '1'
        fade.cancel()
        fade = undefined
        outgoing.style.opacity = '0'
        outgoing.pause()
        outgoing.currentTime = 0
        active = incoming
      } catch {
        if (!disposed) {
          incoming.pause()
          if (outgoing.ended) {
            outgoing.currentTime = 0
            outgoing.play().catch(() => {})
          }
        }
      } finally {
        transitioning = false
      }
    }

    for (const video of videos) {
      video.addEventListener('timeupdate', continueLoop)
      video.addEventListener('ended', continueLoop)
    }
    active.play().catch(() => {})

    return () => {
      disposed = true
      fade?.cancel()
      for (const video of videos) {
        video.removeEventListener('timeupdate', continueLoop)
        video.removeEventListener('ended', continueLoop)
        video.pause()
        video.style.removeProperty('opacity')
        video.style.removeProperty('z-index')
      }
    }
  }, [motion])

  return (
    <div className="hero-background" aria-hidden="true">
      <video ref={firstRef} className="hero-video" src={videoSource} muted playsInline preload="auto" />
      {motion && (
        <video ref={secondRef} className="hero-video hero-video--standby" src={videoSource} muted playsInline preload="auto" />
      )}
    </div>
  )
}
