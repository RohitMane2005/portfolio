import { SectionReveal, RevealItem } from './SectionReveal'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Discovery Call', desc: "We chat about your business, goals, and what you need from your website. Free consultation — no obligations." },
  { num: '02', title: 'Design & Quote', desc: "I send you a clear quote and a rough design direction within 24 hours. You approve before any work begins." },
  { num: '03', title: 'Build & Review', desc: "I build your site and share a live preview. You give feedback, I revise until you're 100% happy." },
  { num: '04', title: 'Launch 🚀', desc: "Your site goes live. I handle domain, hosting, and all technical setup. You just share the link." },
]

export default function Process() {
  return (
    <SectionReveal id="process" className="process">
      <RevealItem>
        <p className="section-label center">How It Works</p>
        <h2 className="section-heading center">From idea to live site in days</h2>
        <p className="section-sub">A simple, transparent process — no surprises, no delays.</p>
      </RevealItem>

      <div className="process-steps">
        {steps.map((s, i) => (
          <RevealItem key={i} className="process-step-wrapper">
            {i > 0 && <div className="process-connector" />}
            <motion.div
              className="process-step"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="step-number">{s.num}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </motion.div>
          </RevealItem>
        ))}
      </div>
    </SectionReveal>
  )
}
