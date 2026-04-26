import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const ALLOWED = [/^demo\//, /^https:\/\/(www\.)?genzxr\.in\//]

const demos = [
  { cls: 'demo-restaurant', tag: 'Restaurant / Café', emoji: '🍽️', title: '🍽️ Restaurant & Café', desc: 'Menu, reservations, about section, testimonials — everything a dining business needs online.', url: 'demo/restaurant/index.html' },
  { cls: 'demo-salon', tag: 'Salon / Spa', emoji: '💆', title: '💆 Salon & Spa', desc: 'Services, booking form, gallery, testimonials. Elegant design for beauty businesses.', url: 'demo/salon/index.html' },
  { cls: 'demo-gym', tag: 'Gym / Fitness', emoji: '🏋️', title: '🏋️ Gym & Fitness', desc: 'Programs, pricing plans, free trial signup. Bold, high-energy design for fitness brands.', url: 'demo/gym/index.html' },
  { cls: 'demo-photography', tag: 'Photography', emoji: '📷', title: '📷 Photography Studio', desc: 'Portfolio gallery, service packages, about, and enquiry form. Perfect for photographers.', url: 'demo/photography/index.html' },
  { cls: 'demo-clinic', tag: 'Doctor / Clinic', emoji: '🏥', title: '🏥 Doctor & Clinic', desc: 'Specialties, doctors team, appointment booking. Professional design for healthcare.', url: 'demo/clinic/index.html' },
]

export default function Projects({ onPreview }) {
  const handlePreview = (url) => {
    if (ALLOWED.some((p) => p.test(url))) onPreview(url)
  }

  return (
    <SectionReveal id="projects" className="freelance">
      <RevealItem>
        <p className="section-label center">Portfolio</p>
        <h2 className="section-heading center">Business websites I've built</h2>
        <p className="freelance-sub">Fully custom websites for any business — responsive, fast, and ready to launch. Click any demo to see a live preview.</p>
      </RevealItem>

      <div className="demo-grid">
        {demos.map((d, i) => (
          <RevealItem key={i}>
            <TiltCard className="demo-card">
              <div className={`demo-thumb ${d.cls}`}>
                <div className="demo-overlay">
                  <span className="demo-tag">{d.tag}</span>
                </div>
              </div>
              <div className="demo-info">
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className="demo-stack"><span>HTML</span><span>CSS</span><span>JS</span></div>
                <div className="demo-actions">
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="demo-btn open">Open Demo ↗</a>
                  <button className="demo-btn preview" onClick={() => handlePreview(d.url)}>Preview</button>
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        ))}

        <RevealItem>
          <div className="demo-card demo-cta-card">
            <div className="demo-cta-inner">
              <span className="demo-cta-icon">✦</span>
              <h3>Need a Custom Website?</h3>
              <p>Don't see your niche? I build websites for any kind of business — from lawyers to e-commerce stores.</p>
              <a href="#contact" className="demo-btn open">Let's Talk →</a>
            </div>
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}
