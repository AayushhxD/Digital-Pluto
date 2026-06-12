'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StarField() {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 40 + Math.random() * 60

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Colour: mostly white/blue tint, few warm
      const warm = Math.random() > 0.85
      if (warm) {
        colors[i * 3]     = 1.0
        colors[i * 3 + 1] = 0.75 + Math.random() * 0.25
        colors[i * 3 + 2] = 0.5 + Math.random() * 0.3
      } else {
        const v = 0.6 + Math.random() * 0.4
        colors[i * 3]     = v * 0.85
        colors[i * 3 + 1] = v * 0.9
        colors[i * 3 + 2] = v
      }

      sizes[i] = 0.3 + Math.random() * 1.4
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.008
      meshRef.current.rotation.x += delta * 0.002
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
