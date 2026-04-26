import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticleField from './ParticleField'
import HeroGeometry from './HeroGeometry'
import PostProcessing from './PostProcessing'

export default function BackgroundCanvas() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.4} color="#00f2ff" />
          <pointLight position={[-10, -5, 5]} intensity={0.2} color="#38bdf8" />
          <ParticleField />
          <HeroGeometry />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
