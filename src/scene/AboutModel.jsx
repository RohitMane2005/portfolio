import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

function CodeCube() {
  const groupRef = useRef()
  const cubeRef = useRef()
  const particlesRef = useRef()

  // Floating code particles
  const particles = useMemo(() => {
    const count = 40
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [new THREE.Color('#667eea'), new THREE.Color('#a78bfa'), new THREE.Color('#764ba2')]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors, count }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5 + state.clock.elapsedTime * 0.08, 0.03)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1, 0.03)

    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.15
      cubeRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.count} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particles.count} array={particles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main rounded cube */}
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.5}>
        <mesh ref={cubeRef}>
          <boxGeometry args={[1.2, 1.2, 1.2, 4, 4, 4]} />
          <MeshDistortMaterial
            color="#7c6cf0"
            distort={0.2}
            speed={2.5}
            transparent
            opacity={0.25}
            emissive="#667eea"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Inner glowing core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={0.15}
          emissive="#764ba2"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Angle brackets < / > as flat planes */}
      <Float speed={2} floatIntensity={0.6}>
        <mesh position={[-0.8, 0, 0.5]} rotation={[0, 0.3, 0]}>
          <planeGeometry args={[0.3, 0.5]} />
          <meshBasicMaterial color="#667eea" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </Float>
      <Float speed={2.5} floatIntensity={0.6}>
        <mesh position={[0.8, 0, 0.5]} rotation={[0, -0.3, 0]}>
          <planeGeometry args={[0.3, 0.5]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[1.6, 0.008, 8, 64]} />
        <meshBasicMaterial color="#667eea" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, Math.PI / 3, 0]}>
        <torusGeometry args={[1.4, 0.006, 8, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function AboutModel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#667eea" />
        <pointLight position={[-3, -2, 2]} intensity={0.2} color="#764ba2" />
        <CodeCube />
      </Suspense>
    </Canvas>
  )
}
