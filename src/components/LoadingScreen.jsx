import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="logo" style={{ fontSize: '2.5rem' }}>
        XSO<span>R</span>
      </div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
      <div className="loader-text">Initializing experience...</div>
    </div>
  )
}
