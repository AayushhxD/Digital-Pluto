'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ScrollStoryState } from '../providers/ScrollStoryContext'

interface NebulaFogProps {
  scrollRef: React.MutableRefObject<ScrollStoryState>
}

export default function NebulaFog({ scrollRef }: NebulaFogProps) {
  const groupRef = useRef<THREE.Group>(null)
  const materialsRef = useRef<THREE.SpriteMaterial[]>([])

  const sprites = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
    gradient.addColorStop(0.4, 'rgba(180,140,255,0.35)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 128, 128)

    const texture = new THREE.CanvasTexture(canvas)
    const colors = ['#7B61FF', '#00D9FF', '#f0abfc', '#3344aa']
    const positions: [number, number, number][] = []

    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 8 + Math.random() * 18
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.4,
        r * Math.cos(phi) - 6,
      ])
    }

    return { texture, colors, positions }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.015

    const intensity = scrollRef.current.nebulaIntensity
    materialsRef.current.forEach((mat) => {
      mat.opacity = 0.12 * intensity
    })

    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.0008
    })
  })

  return (
    <group ref={groupRef}>
      {sprites.positions.map((pos, i) => (
        <sprite
          key={i}
          position={pos}
          scale={[6 + (i % 3) * 2, 6 + (i % 3) * 2, 1]}
        >
          <spriteMaterial
            ref={(mat: THREE.SpriteMaterial | null) => {
              if (mat) materialsRef.current[i] = mat
            }}
            map={sprites.texture}
            color={sprites.colors[i % sprites.colors.length]}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}
