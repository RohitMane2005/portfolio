import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating controls panel with theme toggle, sound toggle, and scroll-to-top.
 * Fixed in the bottom-right corner.
 */
export default function FloatingControls() {
  const [theme, setTheme] = useState('dark')
  const [sound, setSound] = useState(false)
  const [showTop, setShowTop] = useState(false)

  // Play a subtle click sound
  const playClick = useCallback(() => {
    if (!sound) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.08)
    } catch (e) { /* silent fallback */ }
  }, [sound])

  // Theme toggle
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    playClick()
  }, [theme, playClick])

  // Sound toggle
  const toggleSound = useCallback(() => {
    setSound((s) => !s)
  }, [])

  // Show scroll-to-top after scrolling
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="floating-controls">
      <motion.button
        className="float-btn"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.button>

      <motion.button
        className="float-btn"
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={sound ? 'Mute sounds' : 'Enable sounds'}
      >
        {sound ? '🔊' : '🔇'}
      </motion.button>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className="float-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
