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

    /* ── palette ─────────────────────────────────────────── */
    const PALETTE = ['#ffffff', '#ffffff', '#ffffff', '#00D9FF', '#7B61FF', '#fb7185']

    /* ── Warp stars (perspective, move towards viewer) ───── */
    const W_COUNT = 260
    const Z_DEPTH = 1600
    const SPEED   = 0.45   // z units per frame at 60fps

    interface WStar {
      x: number; y: number; z: number
      size: number; color: string
      phase: number; phaseSpeed: number
    }

    function mkWStar(): WStar {
      return {
        x: (Math.random() - 0.5) * W * 2.2,
        y: (Math.random() - 0.5) * H * 2.2,
        z: Math.random() * Z_DEPTH,
        size: 0.4 + Math.random() * 1.4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.02 + Math.random() * 0.05,
      }
    }

    const wStars: WStar[] = Array.from({ length: W_COUNT }, mkWStar)

    /* ── Static twinkling stars (fixed position) ─────────── */
    const S_COUNT = 220

    interface SStar {
      x: number; y: number; r: number; color: string
      phase: number; freq: number; freq2: number
      blinkOut: number   // frames remaining in blackout (0 = visible)
    }

    const sStars: SStar[] = Array.from({ length: S_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.3 + Math.random() * 1.3,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      phase: Math.random() * Math.PI * 2,
      freq: 0.018 + Math.random() * 0.06,
      freq2: 0.04  + Math.random() * 0.10,
      blinkOut: 0,
    }))

    /* ── Shooting stars ──────────────────────────────────── */
    const MAX_SHOOTS  = 22
    const SPAWN_CHANCE = 0.98   // almost every frame — keeps pool full

    interface Shoot {
      x: number; y: number; vx: number; vy: number
      life: number; maxLife: number
      len: number; color: string; w: number
    }

    const shoots: Shoot[] = []

    /* ── Persistent meteor rain (always-on diagonal streaks) ── */
    const METEOR_COUNT = 18

    interface Meteor {
      x: number; y: number
      speed: number           // px per frame
      angle: number           // radians
      len: number
      color: string
      w: number
      life: number; maxLife: number
    }

    function mkMeteor(startRandom = true): Meteor {
      const angle = Math.PI * 0.30 + Math.random() * Math.PI * 0.15
      const speed = 5 + Math.random() * 9
      return {
        x: Math.random() * W * 1.3 - W * 0.15,
        y: startRandom ? Math.random() * H - 60 : -60 - Math.random() * 200,
        speed,
        angle,
        len: 60 + Math.random() * 180,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        w: 0.6 + Math.random() * 1.2,
        life: startRandom ? Math.floor(Math.random() * 60) : 0,
        maxLife: 55 + Math.floor(Math.random() * 55),
      }
    }

    const meteors: Meteor[] = Array.from({ length: METEOR_COUNT }, () => mkMeteor(true))

    function spawnShoot() {
      const a   = Math.PI * 0.18 + Math.random() * Math.PI * 0.28
      const spd = 12 + Math.random() * 20
      shoots.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        life: 0,
        maxLife: 28 + Math.floor(Math.random() * 22),
        len: 70 + Math.random() * 150,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        w: 0.8 + Math.random() * 1.3,
      })
    }

    /* ── Mouse parallax ──────────────────────────────────── */
    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / W - 0.5) * 2
      my = (e.clientY / H - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    /* ── Pre-build static vignette on an offscreen canvas ── */
    let vigCanvas = document.createElement('canvas')
    let vigCtx    = vigCanvas.getContext('2d')!

    function buildVignette() {
      vigCanvas.width  = W
      vigCanvas.height = H
      const g = vigCtx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.9)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(1, 'rgba(0,0,16,0.65)')
      vigCtx.fillStyle = g
      vigCtx.fillRect(0, 0, W, H)
    }
    buildVignette()

    /* ── FPS cap ─────────────────────────────────────────── */
    const TARGET_MS = 1000 / 60
    let last = 0
    let raf  = 0
    let tick = 0

    /* ── Render ──────────────────────────────────────────── */
    const render = (now: number) => {
      raf = requestAnimationFrame(render)

      const delta = now - last
      if (delta < TARGET_MS - 1) return   // skip frame if too early
      last = now - (delta % TARGET_MS)    // keep phase locked
      tick++

      ctx.clearRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2

      /* ── warp stars ─── */
      ctx.save()

      for (const s of wStars) {
        s.z         -= SPEED
        s.phase     += s.phaseSpeed

        if (s.z <= 1) {
          const ns = mkWStar()
          Object.assign(s, ns)
          s.z = Z_DEPTH
          continue
        }

        const k  = 220 / s.z
        const px = s.x * k + cx + mx * 14
        const py = s.y * k + cy + my * 14

        if (px < -10 || px > W + 10 || py < -10 || py > H + 10) continue

        const closeness = 1 - s.z / Z_DEPTH
        // multi-harmonic twinkle (cheap — just math, no draw calls)
        const tw  = 0.55 + 0.28 * Math.sin(s.phase) + 0.12 * Math.sin(s.phase * 2.3 + 1)
        const a   = Math.min(1, closeness * 2.0) * tw
        const r   = s.size * k * 0.2

        // speed trail for close-ish stars
        if (closeness > 0.18) {
          const pk  = 220 / (s.z + SPEED * 3.5)
          const tx  = s.x * pk + cx
          const ty  = s.y * pk + cy
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(px, py)
          ctx.strokeStyle = s.color
          ctx.lineWidth   = r * 0.8
          ctx.globalAlpha = a * 0.45
          ctx.stroke()
        }

        // star dot with shadowBlur glow (batched below per colour is ideal,
        // but per-star is fine at 260 stars)
        ctx.shadowColor = s.color
        ctx.shadowBlur  = r > 1.2 ? 8 : 4
        ctx.globalAlpha = a
        ctx.fillStyle   = s.color
        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()   // clears shadowBlur

      /* ── static blinkers ─── */
      ctx.save()

      for (const s of sStars) {
        if (s.blinkOut > 0) { s.blinkOut--; continue }

        // random sudden blink-out
        if (Math.random() < 0.003) { s.blinkOut = 3 + Math.floor(Math.random() * 7); continue }

        s.phase += s.freq
        const tw = 0.4
          + 0.35 * Math.sin(s.phase)
          + 0.15 * Math.sin(s.phase * s.freq2 / s.freq + 0.9)
        const a  = Math.max(0, Math.min(1, tw))

        ctx.shadowColor = s.color
        ctx.shadowBlur  = s.r > 1 ? 6 : 3
        ctx.globalAlpha = a
        ctx.fillStyle   = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      /* ── shooting stars ─── */
      if (shoots.length < MAX_SHOOTS && Math.random() < SPAWN_CHANCE) spawnShoot()

      ctx.save()
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i]
        s.x += s.vx; s.y += s.vy; s.life++

        const p = s.life / s.maxLife
        const a = p < 0.15 ? p / 0.15 : p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3
        if (a <= 0 || s.life >= s.maxLife) { shoots.splice(i, 1); continue }

        const mag = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        const tx  = s.x - (s.vx / mag) * s.len
        const ty  = s.y - (s.vy / mag) * s.len

        const g = ctx.createLinearGradient(tx, ty, s.x, s.y)
        g.addColorStop(0, s.color + '00')
        g.addColorStop(0.7, s.color + '55')
        g.addColorStop(1, '#ffffff')
        ctx.shadowColor = s.color
        ctx.shadowBlur  = 10
        ctx.beginPath()
        ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = s.w
        ctx.globalAlpha = a
        ctx.stroke()
        ctx.shadowBlur  = 14
        ctx.globalAlpha = a * 0.9
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.w * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      /* ── persistent meteor rain ─── */
      ctx.save()
      for (let i = 0; i < meteors.length; i++) {
        const m = meteors[i]
        m.x   += Math.cos(m.angle) * m.speed
        m.y   += Math.sin(m.angle) * m.speed
        m.life++

        // respawn when off-screen or lifetime exceeded
        if (m.x > W + 200 || m.y > H + 200 || m.life >= m.maxLife) {
          meteors[i] = mkMeteor(false)
          continue
        }

        const p  = m.life / m.maxLife
        const a  = p < 0.12 ? p / 0.12 : p < 0.75 ? 1 : 1 - (p - 0.75) / 0.25
        if (a <= 0) continue

        const tx = m.x - Math.cos(m.angle) * m.len
        const ty = m.y - Math.sin(m.angle) * m.len

        // glow trail
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y)
        g.addColorStop(0, m.color + '00')
        g.addColorStop(0.6, m.color + '44')
        g.addColorStop(1, m.color + 'ee')
        ctx.shadowColor = m.color
        ctx.shadowBlur  = 8
        ctx.beginPath()
        ctx.moveTo(tx, ty); ctx.lineTo(m.x, m.y)
        ctx.strokeStyle = g
        ctx.lineWidth   = m.w
        ctx.globalAlpha = a * 0.85
        ctx.stroke()

        // head
        ctx.shadowBlur  = 12
        ctx.globalAlpha = a
        ctx.fillStyle   = m.color
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.w * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      /* ── nebula glow (drawn once every 2 frames, slow pulse) ─── */
      if (tick % 2 === 0) {
        const na = 0.018 + 0.008 * Math.sin(tick * 0.007)
        const n1 = ctx.createRadialGradient(W*0.22, H*0.32, 0, W*0.22, H*0.32, W*0.38)
        n1.addColorStop(0, `rgba(0,217,255,${na})`)
        n1.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle   = n1
        ctx.globalAlpha = 1
        ctx.fillRect(0, 0, W, H)

        const n2a = 0.015 + 0.007 * Math.sin(tick * 0.009 + 1.8)
        const n2  = ctx.createRadialGradient(W*0.8, H*0.65, 0, W*0.8, H*0.65, W*0.35)
        n2.addColorStop(0, `rgba(123,97,255,${n2a})`)
        n2.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = n2
        ctx.fillRect(0, 0, W, H)
      }

      /* ── vignette (pre-baked, one drawImage) ─── */
      ctx.globalAlpha = 1
      ctx.drawImage(vigCanvas, 0, 0)
    }

    raf = requestAnimationFrame(render)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      buildVignette()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  )
}
