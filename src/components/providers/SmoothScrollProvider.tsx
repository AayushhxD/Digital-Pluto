'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStoryRef } from './ScrollStoryContext'

gsap.registerPlugin(ScrollTrigger)

function applyScrollStory(p: number, state: ReturnType<typeof useScrollStoryRef>['current']) {
  state.progress = p

  if (p < 0.15) {
    state.cameraZ = gsap.utils.mapRange(0, 0.15, 0.5, 0, p)
    state.planetScale = gsap.utils.mapRange(0, 0.15, 0.85, 1, p)
    state.cardsOpacity = gsap.utils.mapRange(0, 0.15, 0, 0.6, p)
    state.nebulaIntensity = gsap.utils.mapRange(0, 0.15, 0.3, 0.6, p)
  } else if (p < 0.3) {
    state.cameraZ = gsap.utils.mapRange(0.15, 0.3, 0, -2.2, p)
    state.planetScale = 1
    state.cardsOpacity = 0.85
    state.nebulaIntensity = 0.65
  } else if (p < 0.45) {
    state.cameraZ = -2.2
    state.planetScale = 1.05
    state.cardsOpacity = 1
    state.nebulaIntensity = 0.75
  } else if (p < 0.55) {
    state.cameraZ = gsap.utils.mapRange(0.45, 0.55, -2.2, -1.5, p)
    state.cardsOpacity = 0.9
    state.nebulaIntensity = 0.7
  } else if (p < 0.65) {
    state.cameraZ = -1.5
    state.cardsOpacity = 0.7
    state.nebulaIntensity = 0.65
  } else if (p < 0.75) {
    state.cameraZ = gsap.utils.mapRange(0.65, 0.75, -1.5, -0.8, p)
    state.cardsOpacity = 1
    state.nebulaIntensity = 0.6
  } else if (p < 0.85) {
    state.cameraZ = -0.8
    state.cardsOpacity = 0.55
    state.nebulaIntensity = 0.55
  } else {
    state.cameraZ = gsap.utils.mapRange(0.85, 1, -0.8, 1.5, p)
    state.planetScale = gsap.utils.mapRange(0.85, 1, 1, 0.72, p)
    state.cardsOpacity = gsap.utils.mapRange(0.85, 1, 0.55, 0, p)
    state.nebulaIntensity = gsap.utils.mapRange(0.85, 1, 0.55, 0.2, p)
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useScrollStoryRef()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const mainTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => applyScrollStory(self.progress, scrollRef.current),
    })

    applyScrollStory(mainTrigger.progress, scrollRef.current)

    const revealTriggers = gsap.utils.toArray<HTMLElement>('[data-section]').map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('section-active'),
        onLeaveBack: () => section.classList.remove('section-active'),
      })
    )

    gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      mainTrigger.kill()
      revealTriggers.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [scrollRef])

  return <>{children}</>
}
