import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { serviceCategories } from '../data/servicesData'
import { SectionReveal, RevealItem } from './SectionReveal'

export default function ServicesPreview() {
  return (
    <SectionReveal as="div">
      <section id="services" className="svc-preview-section">
        <RevealItem>
          <p className="section-label center">What We Do</p>
          <h2 className="section-heading center">
            Services That <span className="accent-text">Drive Results</span>
          </h2>
          <p className="section-sub">
            From custom websites to digital marketing — everything your business needs to succeed online.
          </p>
        </RevealItem>

        <div className="svc-preview-grid">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <RevealItem key={cat.id}>
                <Link to="/services" className="svc-preview-card">
                  <div className="svc-preview-icon">
                    <Icon />
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <span className="svc-preview-count">
                    {cat.services.length} services →
                  </span>
                </Link>
              </RevealItem>
            )
          })}
        </div>

        <RevealItem>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn primary">
              Explore All Services <span>→</span>
            </Link>
          </div>
        </RevealItem>
      </section>
    </SectionReveal>
  )
}
