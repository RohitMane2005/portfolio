import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

/**
 * Konami code easter egg — triggers a fun fullscreen animation when
 * the user enters ↑↑↓↓←→←→BA
 */
export default function EasterEgg() {
  const [triggered, setTriggered] = useState(false)
  const index = useRef(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === KONAMI[index.current]) {
        index.current++
        if (index.current === KONAMI.length) {
          setTriggered(true)
          index.current = 0
          setTimeout(() => setTriggered(false), 4000)
        }
      } else {
        index.current = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          className="easter-egg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
        >
          <div className="easter-content">
            <div className="easter-emoji">🚀</div>
            <h2>Achievement Unlocked!</h2>
            <p>You found the secret. You're clearly a developer who reads code.</p>
            <p className="easter-sub">— Rohit Mane</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
