'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import PlutoPlanet from './PlutoPlanet'
import StarField from './StarField'
import SpaceDust from './SpaceDust'
import OrbitingCards from './OrbitingCards'
import NebulaFog from './NebulaFog'
import PostFX from './PostFX'
import { useScrollStoryRef, type ScrollStoryState } from '../providers/ScrollStoryContext'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={[4, 3, 3]} intensity={1.9} color="#ffffff" castShadow />
      <pointLight position={[-4, 2, -3]} intensity={1.0} color="#7B61FF" />
      <pointLight position={[3, -2, 4]} intensity={0.6} color="#00D9FF" />
      <pointLight position={[0, 4, 0]} intensity={0.3} color="#aaddff" />
    </>
  )
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  const scrollRef = useScrollStoryRef()

  useFrame(() => {
    const { cameraZ } = scrollRef.current
    const tx = mouseX * 0.7
    const ty = mouseY * 0.45
    const tz = 6.2 + cameraZ

    camera.position.x += (tx - camera.position.x) * 0.045
    camera.position.y += (ty - camera.position.y) * 0.045
    camera.position.z += (tz - camera.position.z) * 0.06
    camera.lookAt(0, 0, 0)
  })

  return null
}

function PlanetGroup({
  scrollRef,
  mouseX,
  mouseY,
}: {
  scrollRef: React.MutableRefObject<ScrollStoryState>
  mouseX: number
  mouseY: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.scale.setScalar(scrollRef.current.planetScale)
  })

  return (
    <group ref={groupRef}>
      <PlutoPlanet mouseX={mouseX} mouseY={mouseY} />
    </group>
  )
}

function SceneContents({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const scrollRef = useScrollStoryRef()

  return (
    <>
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <Lights />
      <StarField />
      <SpaceDust />
      <PlanetGroup scrollRef={scrollRef} mouseX={mouseX} mouseY={mouseY} />
      <OrbitingCards scrollRef={scrollRef} />
      <NebulaFog scrollRef={scrollRef} />
      <PostFX />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
    </>
  )
}

export default function PlutoScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 52, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 4,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        shadows
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContents mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  )
}
