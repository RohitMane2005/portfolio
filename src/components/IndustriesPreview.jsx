import { Link } from 'react-router-dom'
import { industrySolutions } from '../data/servicesData'
import { SectionReveal, RevealItem } from './SectionReveal'

export default function IndustriesPreview() {
  const featured = industrySolutions.slice(0, 6)

  return (
    <SectionReveal as="div">
      <section className="ind-preview-section">
        <RevealItem>
          <p className="section-label center">Industries We Serve</p>
          <h2 className="section-heading center">
            Solutions Built for <span className="accent-text">Your Industry</span>
          </h2>
          <p className="section-sub">
            We understand the unique challenges of your industry and build digital solutions that address them head-on.
          </p>
        </RevealItem>

        <div className="ind-preview-grid">
          {featured.map((ind) => {
            const Icon = ind.icon
            return (
              <RevealItem key={ind.name}>
                <div className="ind-preview-card">
                  <div className="ind-preview-icon">
                    <Icon />
                  </div>
                  <h3>{ind.name}</h3>
                  <p>{ind.tagline}</p>
                </div>
              </RevealItem>
            )
          })}
        </div>

        <RevealItem>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/industries" className="btn primary">
              View All Industries <span>→</span>
            </Link>
          </div>
        </RevealItem>
      </section>
    </SectionReveal>
  )
}
