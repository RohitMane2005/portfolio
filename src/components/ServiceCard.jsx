import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BiCheck, BiChevronDown, BiChevronUp } from 'react-icons/bi'

export default function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      className="svc-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="svc-card-header">
        <div className="svc-card-icon">
          <Icon />
        </div>
        <h3 className="svc-card-title">{service.name}</h3>
        <p className="svc-card-desc">{service.shortDescription}</p>

        <ul className="svc-card-benefits">
          {service.benefits.map((b, i) => (
            <li key={i}>
              <BiCheck className="svc-check" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <button
          className="svc-card-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Show less' : 'Show more details'}
        >
          {expanded ? 'Less Details' : 'More Details'}
          {expanded ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="svc-card-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="svc-card-details-inner">
              <div className="svc-detail-group">
                <h4>Features</h4>
                <ul className="svc-features-list">
                  {service.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="svc-detail-group">
                <h4>Technologies</h4>
                <div className="svc-tech-tags">
                  {service.technologies.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="svc-outcome">
                <p>{service.businessOutcome}</p>
              </div>

              <Link to="/contact" className="btn primary svc-cta">
                {service.cta} <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
