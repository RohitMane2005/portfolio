import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase] = useState('visible') // visible -> fading -> hidden

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 1800)
    const hideTimer = setTimeout(() => setPhase('hidden'), 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div className={`loading-screen ${phase === 'fading' ? 'fade-out' : ''}`}>
      <div className="logo" style={{ fontSize: '2rem' }}>
        XSO<span>R</span>
      </div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <div className="loader-text">Loading...</div>
    </div>
  )
}
