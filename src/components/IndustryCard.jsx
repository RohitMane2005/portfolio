import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BiCheck, BiX } from 'react-icons/bi'

export default function IndustryCard({ industry, index }) {
  const [open, setOpen] = useState(false)
  const Icon = industry.icon

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ind-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="ind-modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ind-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <BiX />
            </button>

            <div className="ind-modal-header">
              <div className="ind-modal-icon">
                <Icon />
              </div>
              <div>
                <h3>{industry.name}</h3>
                <p className="ind-modal-tagline">{industry.tagline}</p>
              </div>
            </div>

            <p className="ind-modal-desc">{industry.description}</p>

            <div className="ind-modal-section">
              <h4>Challenges We Solve</h4>
              <ul className="ind-modal-list pain">
                {industry.painPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="ind-modal-section">
              <h4>What We Deliver</h4>
              <ul className="ind-modal-list solutions">
                {industry.solutions.map((s, i) => (
                  <li key={i}>
                    <BiCheck className="ind-check" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ind-modal-outcome">
              <p>{industry.expectedOutcome}</p>
            </div>

            <Link
              to="/contact"
              className="btn primary ind-modal-cta"
              onClick={() => setOpen(false)}
            >
              {industry.cta} <span>→</span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.div
        className="ind-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
      >
        <div className="ind-card-icon">
          <Icon />
        </div>
        <h3 className="ind-card-name">{industry.name}</h3>
        <p className="ind-card-tagline">{industry.tagline}</p>
        <span className="ind-card-link">Learn more →</span>
      </motion.div>

      {/* Portal the modal to body to avoid z-index/overflow issues */}
      {createPortal(modal, document.body)}
    </>
  )
}
