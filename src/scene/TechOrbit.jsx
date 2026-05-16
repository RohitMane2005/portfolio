import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  'Java', 'React', 'JavaScript', 'Spring Boot', 'PostgreSQL',
  'HTML/CSS', 'Docker', 'Git', 'MySQL', 'FastAPI',
  'Node.js', 'TypeScript', 'Python', 'REST API', 'JWT',
]

function SkillNode({ text, position, index }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    // Gentle bob
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.15
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#667eea" emissive="#667eea" emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 0.22, 0]}
        fontSize={0.18}
        color="#e0e0ff"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {text}
      </Text>
    </group>
  )
}

function ConnectionLine({ from, to }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [from, to])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#667eea" transparent opacity={0.08} />
    </line>
  )
}

export default function TechOrbit() {
  const groupRef = useRef()

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / skills.length)
      const theta = Math.sqrt(skills.length * Math.PI) * phi
      const r = 2.2
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]
    })
  }, [])

  // Create some connections between nearby nodes
  const connections = useMemo(() => {
    const conns = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = Math.sqrt(
          (positions[i][0] - positions[j][0]) ** 2 +
          (positions[i][1] - positions[j][1]) ** 2 +
          (positions[i][2] - positions[j][2]) ** 2
        )
        if (dist < 2.5) conns.push([positions[i], positions[j]])
      }
    }
    return conns
  }, [positions])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial
            color="#764ba2"
            wireframe
            transparent
            opacity={0.3}
            emissive="#764ba2"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Connections */}
      {connections.map((c, i) => (
        <ConnectionLine key={i} from={c[0]} to={c[1]} />
      ))}

      {/* Skill nodes */}
      {skills.map((skill, i) => (
        <SkillNode key={skill} text={skill} position={positions[i]} index={i} />
      ))}

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#667eea" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
