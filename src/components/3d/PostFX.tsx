'use client'

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.0}
        luminanceThreshold={0.52}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.001, 0.0007)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette offset={0.28} darkness={0.72} />
    </EffectComposer>
  )
}
