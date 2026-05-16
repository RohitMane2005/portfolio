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
          <ambientLight intensity={0.08} />
          <pointLight position={[10, 10, 10]} intensity={0.35} color="#667eea" />
          <pointLight position={[-10, -5, 5]} intensity={0.2} color="#764ba2" />
          <pointLight position={[0, 8, -5]} intensity={0.15} color="#818cf8" />
          <ParticleField />
          <HeroGeometry />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
