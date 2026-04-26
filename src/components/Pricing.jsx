import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'
import { BiCheck, BiX } from 'react-icons/bi'

const plans = [
  {
    tier: 'Starter', price: '4,999', desc: 'Perfect for a simple online presence', featured: false,
    features: [
      { text: '3-page website', ok: true },
      { text: 'Mobile responsive', ok: true },
      { text: 'Contact form', ok: true },
      { text: '2 revision rounds', ok: true },
      { text: 'Delivered in 3–5 days', ok: true },
      { text: 'Custom animations', ok: false },
      { text: 'SEO setup', ok: false },
    ],
  },
  {
    tier: 'Business', price: '9,999', desc: 'Full-featured site for serious businesses', featured: true,
    features: [
      { text: '5–7 page website', ok: true },
      { text: 'Mobile responsive', ok: true },
      { text: 'Contact form + Email', ok: true },
      { text: 'Unlimited revisions', ok: true },
      { text: 'Delivered in 5–7 days', ok: true },
      { text: 'Custom animations', ok: true },
      { text: 'Basic SEO setup', ok: true },
    ],
  },
  {
    tier: 'Premium', price: 'Custom', desc: 'For complex projects & custom features', featured: false,
    features: [
      { text: 'Unlimited pages', ok: true },
      { text: 'Mobile responsive', ok: true },
      { text: 'Advanced forms / logic', ok: true },
      { text: 'Unlimited revisions', ok: true },
      { text: 'Timeline discussed', ok: true },
      { text: 'Full animations', ok: true },
      { text: 'Full SEO + Hosting', ok: true },
    ],
  },
]

export default function Pricing() {
  return (
    <SectionReveal id="pricing" className="pricing">
      <RevealItem>
        <p className="section-label center">Pricing</p>
        <h2 className="section-heading center">Transparent, flat-rate packages</h2>
        <p className="section-sub">No hidden fees. No hourly billing. Just one clear price to get your business online.</p>
      </RevealItem>

      <div className="pricing-grid">
        {plans.map((p, i) => (
          <RevealItem key={i}>
            <TiltCard className={`pricing-card ${p.featured ? 'featured' : ''}`}>
              {p.featured && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-tier">{p.tier}</div>
              <div className="pricing-price">
                {p.price !== 'Custom' && <span className="currency">₹</span>}
                <span className="amount">{p.price}</span>
              </div>
              <p className="pricing-desc">{p.desc}</p>
              <ul className="pricing-features">
                {p.features.map((f, j) => (
                  <li key={j} className={f.ok ? '' : 'disabled'}>
                    {f.ok ? <BiCheck /> : <BiX />} {f.text}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn pricing-btn ${p.featured ? 'primary' : ''}`}>
                {p.tier === 'Premium' ? "Let's Discuss" : 'Get Started'}
              </a>
            </TiltCard>
          </RevealItem>
        ))}
      </div>

      <p className="pricing-note">
        All prices in INR. International clients accepted. <a href="#contact">Contact me</a> for a custom quote.
      </p>
    </SectionReveal>
  )
}
