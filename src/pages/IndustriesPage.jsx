import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { industrySolutions } from '../data/servicesData'
import IndustryCard from '../components/IndustryCard'

export default function IndustriesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Industry Solutions
          </motion.p>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We Know <span className="accent-text">Your Industry</span>
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We don't just build websites — we build solutions tailored to the unique 
            challenges and opportunities of your specific industry.
          </motion.p>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-grid">
          {industrySolutions.map((ind, i) => (
            <IndustryCard key={ind.name} industry={ind} index={i} />
          ))}
        </div>
      </section>

      <section className="svc-bottom-cta">
        <h2>Don't see your industry?</h2>
        <p>
          We work with businesses across all sectors. Tell us about your needs
          and we'll craft a custom solution just for you.
        </p>
        <div className="svc-bottom-btns">
          <Link to="/contact" className="btn primary">
            Discuss Your Project <span>→</span>
          </Link>
          <Link to="/services" className="btn">
            View All Services
          </Link>
        </div>
      </section>
    </main>
  )
}
