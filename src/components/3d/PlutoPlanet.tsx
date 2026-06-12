'use client'

import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Procedural PBR-style planet shader ──────────────────────────────────────
const PlanetMaterial = shaderMaterial(
  {
    uTime: 0,
    uLightDir: new THREE.Vector3(1.2, 0.8, 1.0),
  },
  /* vertex */
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vNormal   = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      vUv       = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */
  `
    precision highp float;
    uniform float uTime;
    uniform vec3  uLightDir;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i=floor(p), f=fract(p);
      f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
    }
    float fbm(vec2 p) {
      float v=0.0,a=0.5;
      for(int i=0;i<6;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
      return v;
    }

    void main() {
      vec2 uv = vUv;
      uv.x += uTime * 0.008;

      float n1 = fbm(uv * 3.0 + 0.5);
      float n2 = fbm(uv * 6.5 - 1.2 + uTime * 0.003);
      float n3 = fbm(uv * 14.0 + n1 * 2.0);
      float terrain = n1*0.55 + n2*0.3 + n3*0.15;

      vec3 deepBlue    = vec3(0.06, 0.08, 0.18);
      vec3 icyBlue     = vec3(0.55, 0.72, 0.88);
      vec3 nitrogen    = vec3(0.75, 0.78, 0.82);
      vec3 craterBrown = vec3(0.28, 0.20, 0.16);
      vec3 heartPlain  = vec3(0.85, 0.88, 0.92);
      vec3 orange      = vec3(0.58, 0.30, 0.15);

      vec3 col = mix(deepBlue, icyBlue, smoothstep(0.2, 0.5, terrain));
      col = mix(col, nitrogen, smoothstep(0.45, 0.62, terrain));
      col = mix(col, craterBrown, smoothstep(0.62, 0.75, terrain) * noise(uv*18.0));
      col = mix(col, heartPlain, smoothstep(0.68, 0.82, terrain));
      col = mix(col, orange, smoothstep(0.78, 0.95, terrain) * 0.7);

      float lat = abs(vUv.y - 0.5) * 2.0;
      col = mix(col, heartPlain, smoothstep(0.6, 0.85, lat) * 0.8);

      float craters = noise(uv*22.0+1.7)*noise(uv*11.0-2.3);
      col *= 1.0 - craters * 0.22 * smoothstep(0.3, 0.7, terrain);

      vec3 N = normalize(vNormal);
      vec3 L = normalize(uLightDir);
      float diff = max(dot(N, L), 0.0);

      vec3 V = normalize(-vPosition);
      float rim = pow(1.0 - max(dot(N, V), 0.0), 4.0);
      vec3 rimColor = vec3(0.1, 0.55, 1.0);

      vec3 final = col * (0.09 + diff * 1.1) + rimColor * rim * 0.45;

      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 60.0);
      final += vec3(0.7,0.85,1.0) * spec * smoothstep(0.6, 0.85, terrain) * 0.6;

      gl_FragColor = vec4(final, 1.0);
    }
  `
)

// ── Atmosphere glow shader ───────────────────────────────────────────────────
const AtmoMaterial = shaderMaterial(
  { uColor: new THREE.Color('#1166ee') },
  `varying vec3 vNormal; varying vec3 vPos;
   void main(){
     vNormal=normalize(normalMatrix*normal);
     vPos=(modelMatrix*vec4(position,1.0)).xyz;
     gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
   }`,
  `uniform vec3 uColor; varying vec3 vNormal; varying vec3 vPos;
   void main(){
     vec3 V=normalize(-vPos);
     float rim=1.0-max(dot(normalize(vNormal),V),0.0);
     rim=pow(rim,3.2);
     gl_FragColor=vec4(uColor,rim*0.6);
   }`
)

extend({ PlanetMaterial, AtmoMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    planetMaterial: any
    atmoMaterial: any
  }
}

// ── Orbiting glowing dot ─────────────────────────────────────────────────────
function OrbiterDot({
  radius, speed, color, tiltX, offset = 0
}: {
  radius: number; speed: number; color: string; tiltX: number; offset?: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t + offset) * 0.4 * (tiltX - 1)
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight color={color} intensity={2} distance={1.5} />
    </group>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
interface PlutoPlanetProps {
  mouseX?: number
  mouseY?: number
}

export default function PlutoPlanet({ mouseX = 0, mouseY = 0 }: PlutoPlanetProps) {
  const groupRef  = useRef<THREE.Group>(null)
  const matRef    = useRef<any>(null)
  const ring1Ref  = useRef<THREE.Mesh>(null)
  const ring2Ref  = useRef<THREE.Mesh>(null)

  const ringGeo1 = useMemo(() => new THREE.TorusGeometry(2.35, 0.009, 2, 200), [])
  const ringGeo2 = useMemo(() => new THREE.TorusGeometry(2.85, 0.006, 2, 200), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Slow base rotation
    groupRef.current.rotation.y += delta * 0.065

    // Mouse reactive tilt
    const targetX = mouseY * 0.22
    const targetZ = -mouseX * 0.08
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05

    // Shader time
    if (matRef.current) matRef.current.uTime = state.clock.elapsedTime

    // Ring counter-rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.15
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.09

    // Gentle bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.18
  })

  return (
    <group ref={groupRef}>
      {/* Planet */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 128, 128]} />
        <planetMaterial ref={matRef} />
      </mesh>

      {/* Atmosphere */}
      <mesh scale={1.065}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <atmoMaterial transparent side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.4, 0.25, 0]}>
        <primitive object={ringGeo1} attach="geometry" />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.38} side={THREE.DoubleSide} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.15, -0.38, Math.PI / 7]}>
        <primitive object={ringGeo2} attach="geometry" />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting dots */}
      <OrbiterDot radius={2.35} speed={0.55}  color="#00D9FF" tiltX={1.2} offset={0} />
      <OrbiterDot radius={2.85} speed={-0.32} color="#7B61FF" tiltX={1.4} offset={Math.PI * 0.7} />
      <OrbiterDot radius={2.35} speed={0.4}   color="#ffffff" tiltX={1.1} offset={Math.PI * 1.3} />
    </group>
  )
}
