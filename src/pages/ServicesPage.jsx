import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { serviceCategories } from '../data/servicesData'
import ServiceCard from '../components/ServiceCard'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id)
  const activeCategory = serviceCategories.find((c) => c.id === activeTab)

  return (
    <main>
      {/* Hero banner */}
      <section className="page-hero">
        <div className="page-hero-content">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.p>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything Your Business Needs to{' '}
            <span className="accent-text">Grow Online</span>
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From stunning websites to data-driven marketing — we build, launch, and scale
            your digital presence so you can focus on running your business.
          </motion.p>
        </div>
      </section>

      {/* Category tabs */}
      <section className="svc-section">
        <div className="svc-tabs-wrap">
          <div className="svc-tabs">
            {serviceCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  className={`svc-tab ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <Icon className="svc-tab-icon" />
                  <span>{cat.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Category description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="svc-cat-desc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p>{activeCategory.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Service cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-grid'}
            className="svc-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeCategory.services.map((svc, i) => (
              <ServiceCard key={svc.name} service={svc} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bottom CTA */}
      <section className="svc-bottom-cta">
        <h2>Not sure which service you need?</h2>
        <p>
          Tell us about your business goals and we'll recommend the perfect combination
          of services to achieve them.
        </p>
        <div className="svc-bottom-btns">
          <Link to="/contact" className="btn primary">
            Get a Free Consultation <span>→</span>
          </Link>
          <Link to="/industries" className="btn">
            Browse by Industry
          </Link>
        </div>
      </section>
    </main>
  )
}
