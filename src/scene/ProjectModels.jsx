import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

/* ═══════ NEURAL BRAIN — PathShashtra ═══════ */
function NeuralBrain() {
  const groupRef = useRef()
  const coreRef = useRef()

  const { nodes, connections, connectionGeometries } = useMemo(() => {
    const nodes = []
    const connections = []
    const count = 24

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i + 1) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 1.4
      nodes.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ])
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i][0] - nodes[j][0]) ** 2 +
          (nodes[i][1] - nodes[j][1]) ** 2 +
          (nodes[i][2] - nodes[j][2]) ** 2
        )
        if (dist < 1.8) connections.push([nodes[i], nodes[j]])
      }
    }

    // Pre-create geometries to avoid memory leaks
    const connectionGeometries = connections.map((c) => {
      const points = [new THREE.Vector3(...c[0]), new THREE.Vector3(...c[1])]
      return new THREE.BufferGeometry().setFromPoints(points)
    })

    return { nodes, connections, connectionGeometries }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.6 + state.clock.elapsedTime * 0.15, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.4, 0.04)

    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} floatIntensity={0.3}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.55, 1]} />
          <MeshDistortMaterial color="#FF6B52" distort={0.35} speed={3} transparent opacity={0.35} emissive="#EA4E33" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#EA4E33" transparent opacity={0.08} />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FF6B52" emissive="#EA4E33" emissiveIntensity={1.5} transparent opacity={0.9} />
        </mesh>
      ))}

      {connectionGeometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color="#EA4E33" transparent opacity={0.15} />
        </line>
      ))}

      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial color="#FF6B52" wireframe transparent opacity={0.06} />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 64]} />
        <meshBasicMaterial color="#EA4E33" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

/* ═══════ LIGHTNING PRISM — Gitriage ═══════ */
function LightningPrism() {
  const groupRef = useRef()
  const prismRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  const bolts = useMemo(() => {
    const boltSets = []
    for (let b = 0; b < 6; b++) {
      const points = []
      const angle = (b / 6) * Math.PI * 2
      const startX = Math.cos(angle) * 0.3
      const startZ = Math.sin(angle) * 0.3
      for (let i = 0; i < 8; i++) {
        const t = i / 7
        points.push(new THREE.Vector3(
          startX + (Math.random() - 0.5) * 0.3 * t,
          -1 + t * 2,
          startZ + (Math.random() - 0.5) * 0.3 * t
        ))
      }
      boltSets.push(new THREE.BufferGeometry().setFromPoints(points))
    }
    return boltSets
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5 + state.clock.elapsedTime * 0.2, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3, 0.04)

    if (prismRef.current) {
      prismRef.current.rotation.y = state.clock.elapsedTime * 0.4
      prismRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.8
    if (ring2Ref.current) ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.6
  })

  return (
    <group ref={groupRef}>
      <Float speed={2.5} floatIntensity={0.4}>
        <mesh ref={prismRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial color="#EA4E33" distort={0.15} speed={4} transparent opacity={0.5} emissive="#EA4E33" emissiveIntensity={1} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      {bolts.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color={i % 2 === 0 ? '#FF6B52' : '#EA4E33'} transparent opacity={0.3} />
        </line>
      ))}

      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.015, 8, 48]} />
        <meshBasicMaterial color="#FF6B52" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[1.5, 0.01, 8, 48]} />
        <meshBasicMaterial color="#EA4E33" transparent opacity={0.18} />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 1.0 + Math.random() * 0.4
        return (
          <Float key={i} speed={2 + Math.random() * 2} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * r, (Math.random() - 0.5) * 1.5, Math.sin(angle) * r]}>
              <boxGeometry args={[0.04, 0.04, 0.04]} />
              <meshStandardMaterial color="#FF6B52" emissive="#EA4E33" emissiveIntensity={2} transparent opacity={0.7} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

/* ═══════ WARP SPHERE — Portfolio ═══════ */
function WarpSphere() {
  const groupRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.7 + state.clock.elapsedTime * 0.12, 0.04)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.5, 0.04)

    if (wireRef.current) {
      wireRef.current.rotation.x = state.clock.elapsedTime * 0.15
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.9, 64, 64]} />
          <MeshDistortMaterial color="#FF6B52" distort={0.4} speed={2} transparent opacity={0.3} emissive="#EA4E33" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial color="#EA4E33" wireframe transparent opacity={0.12} emissive="#EA4E33" emissiveIntensity={0.3} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <Float key={i} speed={2 + i} rotationIntensity={3} floatIntensity={1}>
          <mesh position={[
            Math.cos((i / 3) * Math.PI * 2) * 1.7,
            Math.sin((i / 3) * Math.PI * 2 + 1) * 0.6,
            Math.sin((i / 3) * Math.PI * 2) * 1.7
          ]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={2} transparent opacity={0.9} />
          </mesh>
        </Float>
      ))}

      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / (2 + i), (i * Math.PI) / 3, 0]}>
          <torusGeometry args={[1.5 + i * 0.15, 0.006, 8, 64]} />
          <meshBasicMaterial color="#EA4E33" transparent opacity={0.1 + i * 0.04} />
        </mesh>
      ))}
    </group>
  )
}

/* ═══════ CANVAS WRAPPER ═══════ */
const modelMap = {
  brain: NeuralBrain,
  lightning: LightningPrism,
  warp: WarpSphere,
}

export default function ProjectCanvas({ type = 'brain' }) {
  const ModelComponent = modelMap[type] || NeuralBrain

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#EA4E33" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#FF6B52" />
        <pointLight position={[0, 5, -3]} intensity={0.2} color="#F59E0B" />
        <ModelComponent />
      </Suspense>
    </Canvas>
  )
}
