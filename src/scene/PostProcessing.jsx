import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        intensity={1.2}
      />
      <Vignette offset={0.3} darkness={0.65} />
    </EffectComposer>
  )
}
