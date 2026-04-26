import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PreviewModal({ url, onClose }) {
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="preview-modal active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          className={`preview-content ${fullscreen ? 'fullscreen' : ''}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="preview-controls">
            <button onClick={() => setFullscreen((f) => !f)} title="Fullscreen">⛶</button>
            <a href={url} target="_blank" rel="noopener noreferrer" title="Open in new tab">↗</a>
            <button className="close-preview" onClick={onClose} title="Close">&times;</button>
          </div>
          <iframe src={url} title="Live Project Preview" sandbox="allow-scripts allow-same-origin allow-forms" loading="lazy" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
