import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function HeroGeometry() {
  const torusRef = useRef()
  const groupRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (!torusRef.current || !groupRef.current) return

    // Rotation
    torusRef.current.rotation.x = state.clock.elapsedTime * 0.1
    torusRef.current.rotation.y = state.clock.elapsedTime * 0.07
    torusRef.current.rotation.z = state.clock.elapsedTime * 0.04

    // Mouse tracking
    const { x, y } = state.pointer
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.15, 0.03)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.15, 0.03)

    // Scroll-reactive
    const fade = Math.max(0, 1 - scrollY / 800)
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.3 + fade * 0.7, 0.05))
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -scrollY * 0.003, 0.05)
  })

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[2.5, 0.7, 200, 32]} />
        <MeshDistortMaterial
          color="#667eea"
          wireframe
          distort={0.2}
          speed={1.8}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#764ba2" transparent opacity={0.015} />
      </mesh>

      {/* Orbiting shapes - purple/violet theme */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[5, 2.5, -2]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#667eea" wireframe transparent opacity={0.45} emissive="#667eea" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[-4.5, -2, 2]}>
          <icosahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#764ba2" wireframe transparent opacity={0.35} emissive="#764ba2" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[3, -3.5, -1.5]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.4} emissive="#818cf8" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.2}>
        <mesh position={[-3, 3.5, 1]}>
          <dodecahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#a78bfa" wireframe transparent opacity={0.3} emissive="#a78bfa" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      {/* Extra floating ring */}
      <Float speed={1.2} rotationIntensity={1.8} floatIntensity={0.8}>
        <mesh position={[0, -4, -3]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 16, 40]} />
          <meshStandardMaterial color="#667eea" transparent opacity={0.25} emissive="#667eea" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  )
}
