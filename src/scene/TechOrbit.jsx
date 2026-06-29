import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Billboard } from '@react-three/drei'
import * as THREE from 'three'

const skills = [
  'Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT',
  'JPA/Hibernate', 'React.js', 'JavaScript', 'SQL', 'PostgreSQL',
  'MySQL', 'Docker', 'Maven', 'Git', 'TailwindCSS',
]

function SkillNode({ text, position, index }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.15
  })
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#0071e3" emissive="#0071e3" emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>
      <Billboard>
        <Text position={[0, 0.22, 0]} fontSize={0.18} color="#e0e0ff" anchorX="center" anchorY="middle" font={undefined}>
          {text}
        </Text>
      </Billboard>
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
      <lineBasicMaterial color="#0071e3" transparent opacity={0.08} />
    </line>
  )
}

export default function TechOrbit() {
  const groupRef = useRef()
  const positions = useMemo(() => skills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / skills.length)
    const theta = Math.sqrt(skills.length * Math.PI) * phi
    const r = 2.2
    return [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)]
  }), [])

  const connections = useMemo(() => {
    const conns = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const d = Math.sqrt((positions[i][0]-positions[j][0])**2+(positions[i][1]-positions[j][1])**2+(positions[i][2]-positions[j][2])**2)
        if (d < 2.5) conns.push([positions[i], positions[j]])
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
      <Float speed={1.5} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial color="#42a1ec" wireframe transparent opacity={0.3} emissive="#42a1ec" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      {connections.map((c, i) => <ConnectionLine key={i} from={c[0]} to={c[1]} />)}
      {skills.map((skill, i) => <SkillNode key={skill} text={skill} position={positions[i]} index={i} />)}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#0071e3" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
