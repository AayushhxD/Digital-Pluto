'use client'

import { useEffect, useRef } from 'react'

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    /* ── Background twinkling stars (small, minimal) ─────── */
    const STAR_COUNT = 120
    interface Star {
      x: number; y: number; r: number; baseAlpha: number
      phase: number; freq: number
    }
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x:         Math.random() * W,
      y:         Math.random() * H,
      r:         0.2 + Math.random() * 0.6,           // very small
      baseAlpha: 0.15 + Math.random() * 0.45,         // dim — minimal
      phase:     Math.random() * Math.PI * 2,
      freq:      0.006 + Math.random() * 0.012,        // slow blink
    }))

    /* ── Falling stars ───────────────────────────────────── */
    const FALL_COUNT = 13    // always maintain 10–15 on screen

    interface Fall {
      x: number; y: number
      vx: number; vy: number
      speed: number
      len: number
      life: number; maxLife: number
    }

    function mkFall(initialY = false): Fall {
      // Pick a random angle from any direction:
      // 0..2π gives full circle; we weight towards "downward" arcs
      // but allow leftward, rightward, even slight upward streaks
      const angle = Math.random() * Math.PI * 2
      const speed = 3.5 + Math.random() * 4

      // Spawn from a random edge based on direction the star travels
      let startX: number, startY: number
      if (initialY) {
        // spread randomly across whole screen for initial seed
        startX = Math.random() * W
        startY = Math.random() * H
      } else {
        // spawn from the edge opposite to travel direction
        const edge = Math.floor(Math.random() * 4)  // 0=top,1=right,2=bottom,3=left
        switch (edge) {
          case 0: startX = Math.random() * W;      startY = -20;          break
          case 1: startX = W + 20;                 startY = Math.random() * H; break
          case 2: startX = Math.random() * W;      startY = H + 20;       break
          default: startX = -20;                   startY = Math.random() * H; break
        }
      }

      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      const totalFrames = Math.max(80, Math.floor(Math.max(W, H) * 1.4 / speed))

      return {
        x:       startX,
        y:       startY,
        vx, vy,
        speed,
        len:     38 + Math.random() * 52,
        life:    initialY ? Math.floor(Math.random() * totalFrames * 0.8) : 0,
        maxLife: totalFrames,
      }
    }

    // seed all slots spread across screen so it looks full immediately
    const falls: Fall[] = Array.from({ length: FALL_COUNT }, () => mkFall(true))

    /* ── FPS cap at 60 ──────────────────────────────────── */
    const TARGET_MS = 1000 / 60
    let last = 0
    let raf  = 0

    /* ── Render ─────────────────────────────────────────── */
    const render = (now: number) => {
      raf = requestAnimationFrame(render)

      const delta = now - last
      if (delta < TARGET_MS - 1) return
      last = now - (delta % TARGET_MS)

      ctx.clearRect(0, 0, W, H)

      /* ── twinkling background stars ─── */
      ctx.fillStyle = '#ffffff'
      for (const s of stars) {
        s.phase += s.freq
        const tw = 0.5 + 0.5 * Math.sin(s.phase)       // 0..1
        ctx.globalAlpha = s.baseAlpha * (0.3 + 0.7 * tw)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      /* ── falling stars ─── */
      for (let i = 0; i < falls.length; i++) {
        const f = falls[i]
        f.x    += f.vx
        f.y    += f.vy
        f.life++

        // respawn when off screen in any direction or lifetime exceeded
        if (f.x < -60 || f.x > W + 60 || f.y < -60 || f.y > H + 60 || f.life >= f.maxLife) {
          falls[i] = mkFall(false)
          continue
        }

        // smooth fade in/out
        const p = f.life / f.maxLife
        const alpha = p < 0.1 ? p / 0.1 : p < 0.8 ? 1 : 1 - (p - 0.8) / 0.2

        if (alpha <= 0) continue

        // normalize velocity
        const mag = Math.sqrt(f.vx * f.vx + f.vy * f.vy)
        const nx  = f.vx / mag
        const ny  = f.vy / mag

        // tail origin
        const tx = f.x - nx * f.len
        const ty = f.y - ny * f.len

        // gradient trail
        const grad = ctx.createLinearGradient(tx, ty, f.x, f.y)
        grad.addColorStop(0,    'rgba(255,255,255,0)')
        grad.addColorStop(0.55, 'rgba(210,235,255,0.18)')
        grad.addColorStop(1,    'rgba(255,255,255,0.85)')

        ctx.globalAlpha = alpha
        ctx.strokeStyle = grad
        ctx.lineWidth   = 1.0
        ctx.lineCap     = 'round'
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(f.x, f.y)
        ctx.stroke()

        // head
        ctx.globalAlpha = alpha * 0.85
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(f.x, f.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    }

    raf = requestAnimationFrame(render)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      for (const s of stars) {
        s.x = Math.random() * W
        s.y = Math.random() * H
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  )
}
