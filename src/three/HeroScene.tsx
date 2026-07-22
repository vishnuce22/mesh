import { useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const mouse = { x: 0, y: 0 }

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(() => {
    ref.current.rotation.y += (mouse.x * 0.06 - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (mouse.y * 0.025 - ref.current.rotation.x) * 0.04
  })
  return <group ref={ref}>{children}</group>
}

function Particles({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 34
      arr[i * 3 + 1] = Math.random() * 13 - 3.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 26
    }
    return arr
  }, [count])
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.011
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#22d3ee"
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Endless blueprint floor — the grid scrolls toward the camera. */
function MovingGrid() {
  const ref = useRef<THREE.GridHelper>(null!)
  const cell = 72 / 46
  useFrame((state) => {
    ref.current.position.z = (state.clock.elapsedTime * 0.42) % cell
  })
  return <gridHelper ref={ref} args={[72, 46, '#1d4258', '#0e1a26']} position={[0, -2.7, 0]} />
}

/** A toolpath line that draws itself, like a program being cut. */
function Toolpath({
  pts,
  color,
  speed,
  phase,
  opacity = 0.55,
}: {
  pts: THREE.Vector3[]
  color: string
  speed: number
  phase: number
  opacity?: number
}) {
  const SEGMENTS = 260
  const obj = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts)
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEGMENTS))
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    const l = new THREE.Line(geo, mat)
    l.frustumCulled = false
    return l
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed + phase) % 1.35
    obj.geometry.setDrawRange(0, Math.floor(Math.min(t, 1) * SEGMENTS))
  })
  return <primitive object={obj} />
}

const PATH_A = [
  new THREE.Vector3(-9, -1.2, -3),
  new THREE.Vector3(-4, 0.4, -5),
  new THREE.Vector3(0, -0.6, -4),
  new THREE.Vector3(4, 0.8, -6),
  new THREE.Vector3(9, -0.4, -3.5),
]
const PATH_B = [
  new THREE.Vector3(-10, 1.8, -8),
  new THREE.Vector3(-3, 2.6, -9),
  new THREE.Vector3(2, 1.6, -7.5),
  new THREE.Vector3(8, 2.9, -9),
  new THREE.Vector3(12, 1.9, -7),
]

export default function HeroScene({ active }: { active: boolean }) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 1.35, 9], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <fog attach="fog" args={['#050507', 9, 27]} />
      <Rig>
        <Particles />
        <MovingGrid />
        <Toolpath pts={PATH_A} color="#22d3ee" speed={0.09} phase={0} />
        <Toolpath pts={PATH_B} color="#3b82f6" speed={0.07} phase={0.55} opacity={0.4} />
      </Rig>
    </Canvas>
  )
}
