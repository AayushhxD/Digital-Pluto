'use client'

import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ScrollStoryState } from '../providers/ScrollStoryContext'

const SERVICES = [
  { id: 'seo',       icon: '📡', label: 'SEO',         value: '+340%',  color: '#00D9FF', angle: 0 },
  { id: 'social',    icon: '🌐', label: 'Social',      value: '120K+',  color: '#7B61FF', angle: Math.PI * 2/6 },
  { id: 'ads',       icon: '📈', label: 'Paid Ads',    value: '3.8×',   color: '#f0abfc', angle: Math.PI * 4/6 },
  { id: 'brand',     icon: '💎', label: 'Branding',    value: '50+',    color: '#00D9FF', angle: Math.PI * 6/6 },
  { id: 'ai',        icon: '🤖', label: 'AI/Auto',     value: '24/7',   color: '#7B61FF', angle: Math.PI * 8/6 },
  { id: 'content',   icon: '✍️', label: 'Content',     value: '10M+',   color: '#f0abfc', angle: Math.PI * 10/6 },
]

interface OrbitCardProps {
  service: typeof SERVICES[0]
  orbitRadius: number
  speed: number
  initialAngle: number
  elevation: number
  scrollRef: React.MutableRefObject<ScrollStoryState>
}

function OrbitCard({ service, orbitRadius, speed, initialAngle, elevation, scrollRef }: OrbitCardProps) {
  const ref = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const hovered = useRef(false)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + initialAngle
    ref.current.position.x = Math.cos(t) * orbitRadius
    ref.current.position.z = Math.sin(t) * orbitRadius * 0.55
    ref.current.position.y = elevation + Math.sin(t * 2) * 0.12

    ref.current.lookAt(state.camera.position)

    const opacity = scrollRef.current.cardsOpacity
    const targetScale = (hovered.current ? 1.12 : 1) * opacity
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

    if (lightRef.current) lightRef.current.intensity = 0.8 * opacity
  })

  return (
    <group ref={ref}>
      <Html
        center
        distanceFactor={6}
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="select-none"
          style={{
            background: 'rgba(5,5,5,0.82)',
            border: `1px solid ${service.color}55`,
            borderRadius: 14,
            padding: '10px 14px',
            minWidth: 108,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 20px ${service.color}30, 0 8px 32px rgba(0,0,0,0.5)`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 20, lineHeight: 1, marginBottom: 4 }}>{service.icon}</div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 2,
          }}>
            {service.label}
          </div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            color: service.color,
            textShadow: `0 0 12px ${service.color}`,
          }}>
            {service.value}
          </div>
        </div>
      </Html>

      {/* Glow point at card position */}
      <pointLight ref={lightRef} color={service.color} intensity={0.8} distance={2} />
    </group>
  )
}

export default function OrbitingCards({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<ScrollStoryState>
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.visible = scrollRef.current.cardsOpacity > 0.05
  })

  return (
    <group ref={groupRef}>
      {SERVICES.map((svc, i) => (
        <OrbitCard
          key={svc.id}
          service={svc}
          orbitRadius={3.4}
          speed={0.16 + i * 0.015}
          initialAngle={svc.angle}
          elevation={(-0.6 + i * 0.24)}
          scrollRef={scrollRef}
        />
      ))}
    </group>
  )
}
