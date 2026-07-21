import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BiCheck, BiArrowBack } from 'react-icons/bi'
import { serviceCategories } from '../data/servicesData'

export default function ServiceDetailPage() {
  const { categoryId, serviceSlug } = useParams()

  const category = serviceCategories.find((c) => c.id === categoryId)
  if (!category) return <Navigate to="/services" replace />

  const service = category.services.find(
    (s) => s.name.toLowerCase().replace(/[\s()&/]+/g, '-') === serviceSlug
  )
  if (!service) return <Navigate to="/services" replace />

  const Icon = service.icon

  return (
    <main>
      <section className="page-hero page-hero--compact">
        <div className="page-hero-content">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/services" className="back-link">
              <BiArrowBack /> All Services
            </Link>
          </motion.div>
          <motion.div
            className="svc-detail-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {category.title}
          </motion.div>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {service.name}
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {service.shortDescription}
          </motion.p>
        </div>
      </section>

      <section className="svc-detail-body">
        <div className="svc-detail-grid">
          {/* Main content */}
          <div className="svc-detail-main">
            {/* Benefits */}
            <motion.div
              className="svc-detail-block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2>Key Benefits</h2>
              <ul className="svc-detail-benefits">
                {service.benefits.map((b, i) => (
                  <li key={i}>
                    <div className="svc-benefit-icon"><BiCheck /></div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Features */}
            <motion.div
              className="svc-detail-block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2>What's Included</h2>
              <div className="svc-detail-features-grid">
                {service.features.map((f, i) => (
                  <div key={i} className="svc-feature-item">
                    <span className="svc-feature-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Outcome */}
            <motion.div
              className="svc-detail-block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2>Expected Business Outcome</h2>
              <div className="svc-detail-outcome">
                <p>{service.businessOutcome}</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.aside
            className="svc-detail-sidebar"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="svc-sidebar-card">
              <div className="svc-sidebar-icon">
                <Icon />
              </div>
              <h3>Ready to get started?</h3>
              <p>Let's discuss how {service.name.toLowerCase()} can help grow your business.</p>
              <Link to="/contact" className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
                {service.cta} <span>→</span>
              </Link>
            </div>

            <div className="svc-sidebar-card">
              <h4>Technologies We Use</h4>
              <div className="svc-tech-tags">
                {service.technologies.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Related services */}
            <div className="svc-sidebar-card">
              <h4>Related Services</h4>
              <div className="svc-related-list">
                {category.services
                  .filter((s) => s.name !== service.name)
                  .slice(0, 4)
                  .map((s) => {
                    const RelIcon = s.icon
                    const slug = s.name.toLowerCase().replace(/[\s()&/]+/g, '-')
                    return (
                      <Link
                        key={s.name}
                        to={`/services/${categoryId}/${slug}`}
                        className="svc-related-item"
                      >
                        <RelIcon className="svc-related-icon" />
                        <span>{s.name}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
