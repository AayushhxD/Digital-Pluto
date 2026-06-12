'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function OrbMesh({ size = 1 }: { size?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture('/pluto.png')

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
    }
  })

  return (
    <group scale={size}>
      <Sphere ref={ref} args={[1.05, 64, 64]}>
        <meshStandardMaterial map={texture} roughness={0.8} metalness={0.2} />
      </Sphere>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} />
      <pointLight color="#00D9FF" intensity={1.5} distance={5} position={[-2, -1, 2]} />
      <pointLight color="#7B61FF" intensity={1.5} distance={5} position={[2, -2, -1]} />
    </group>
  )
}

interface PacomeOrbProps {
  className?: string
  size?: 'sm' | 'lg'
}

export default function PacomeOrb({ className = '', size = 'sm' }: PacomeOrbProps) {
  const dim = size === 'lg' ? 'w-28 h-28 sm:w-36 sm:h-36' : 'w-10 h-10'

  return (
    <div className={`relative ${dim} ${className}`}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <OrbMesh size={size === 'lg' ? 1.1 : 0.85} />
        </Suspense>
      </Canvas>
    </div>
  )
}
