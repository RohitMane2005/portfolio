import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

function EnvelopeModel() {
  const groupRef = useRef()
  const envelopeRef = useRef()

  // Orbiting signal particles
  const signals = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i / 20) * Math.PI * 2
      const r = 1.2 + Math.random() * 0.8
      return {
        pos: [Math.cos(angle) * r, (Math.random() - 0.5) * 1.5, Math.sin(angle) * r],
        speed: 1 + Math.random() * 2,
      }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.6 + state.clock.elapsedTime * 0.1, 0.03)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3, 0.03)

    if (envelopeRef.current) {
      envelopeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      envelopeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central shape — abstract envelope/diamond */}
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh ref={envelopeRef} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.9, 0.4, 2, 2, 2]} />
          <MeshDistortMaterial
            color="#7c6cf0"
            distort={0.15}
            speed={3}
            transparent
            opacity={0.35}
            emissive="#667eea"
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Pulsing glow */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#764ba2" transparent opacity={0.05} />
      </mesh>

      {/* Signal dots */}
      {signals.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={0.6}>
          <mesh position={s.pos}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#667eea"
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Signal wave rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[0.8 + i * 0.4, 0.005, 8, 48]} />
          <meshBasicMaterial color="#667eea" transparent opacity={0.12 - i * 0.03} />
        </mesh>
      ))}
    </group>
  )
}

export default function ContactModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#667eea" />
        <pointLight position={[-3, -2, 2]} intensity={0.2} color="#764ba2" />
        <EnvelopeModel />
      </Suspense>
    </Canvas>
  )
}
