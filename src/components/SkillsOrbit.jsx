import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { SectionReveal, RevealItem } from './SectionReveal'
import TechOrbit from '../scene/TechOrbit'

export default function SkillsOrbit() {
  return (
    <SectionReveal as="div">
      <section id="skills-orbit">
        <RevealItem>
          <p className="section-label center">Tech Arsenal</p>
          <h2 className="section-heading center">Skills & Technologies</h2>
          <p className="section-sub">
            A constellation of tools I use to build production-grade applications.
          </p>
        </RevealItem>
        <RevealItem>
          <div className="skills-canvas-wrap">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#0071e3" />
                <pointLight position={[-5, -3, 3]} intensity={0.3} color="#42a1ec" />
                <TechOrbit />
              </Suspense>
            </Canvas>
          </div>
        </RevealItem>
      </section>
    </SectionReveal>
  )
}
