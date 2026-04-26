import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const services = [
  {
    icon: '🎨', title: 'Custom Website Design',
    desc: 'Fully hand-coded websites tailored to your brand. No templates, no drag-and-drop — just clean, unique code.',
    list: ['Unique visual design', 'Mobile-first layout', 'Fast load times'],
  },
  {
    icon: '📱', title: 'Responsive Development',
    desc: 'Your site works flawlessly on every screen — from the largest desktop to the smallest phone.',
    list: ['All screen sizes covered', 'Touch-friendly UI', 'Cross-browser tested'],
  },
  {
    icon: '⚡', title: 'Performance Optimized',
    desc: 'Speed is SEO. I build sites that score high on Core Web Vitals and load in under 2 seconds.',
    list: ['Optimized assets', 'Clean semantic HTML', 'SEO-ready structure'],
  },
  {
    icon: '🔗', title: 'Contact & Booking Forms',
    desc: 'Working contact forms with email notifications so potential clients can reach you instantly.',
    list: ['Email integration', 'Spam protection', 'Instant delivery'],
  },
  {
    icon: '🚀', title: 'Deployment & Hosting',
    desc: "I set up your domain, host your site, and handle the technical launch so you go live stress-free.",
    list: ['Domain configuration', 'Hosting setup', 'SSL certificate'],
  },
  {
    icon: '🛠️', title: 'Maintenance & Updates',
    desc: 'Need to update your menu, prices, or team page? I offer affordable ongoing maintenance packages.',
    list: ['Content updates', 'Bug fixes', 'Feature additions'],
  },
]

export default function Services() {
  return (
    <SectionReveal id="services" className="services">
      <RevealItem>
        <p className="section-label center">What I Offer</p>
        <h2 className="section-heading center">Services for your business</h2>
        <p className="section-sub">Everything you need to get online and look great doing it.</p>
      </RevealItem>

      <div className="services-grid">
        {services.map((s, i) => (
          <RevealItem key={i}>
            <TiltCard className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-list">
                {s.list.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </TiltCard>
          </RevealItem>
        ))}
      </div>
    </SectionReveal>
  )
}
