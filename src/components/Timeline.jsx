import { SectionReveal, RevealItem } from './SectionReveal'
import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2024–2025',
    title: 'Full-Stack AI Developer',
    org: 'PathShashtra & Gitriage',
    desc: 'Built production-grade AI platforms using Spring Boot, React, PostgreSQL, and LLM APIs. Implemented enterprise JWT/RBAC security. Integrated NLP pipelines achieving 95% confidence scoring — reducing manual triage by ~40%.',
    type: 'project',
  },
  {
    year: '2024',
    title: 'State-Level Buildathon Finalist',
    org: 'Institute Representative',
    desc: 'Selected to represent institute at a state-level hackathon. Designed an AI-based smart monitoring system featuring a real-time processing pipeline and anomaly detection.',
    type: 'achievement',
  },
  {
    year: 'Aug 2023–May 2026',
    title: 'B.Com IT — CGPA 8.27/10',
    org: 'Dhananjayrao Gadgil College of Commerce, Satara',
    desc: 'Bachelor of Commerce in Information Technology. Strong foundations in DSA, OOP, DBMS, and software engineering.',
    type: 'education',
  },
]

const typeColors = {
  project: '#EA4E33',
  achievement: '#F59E0B',
  education: '#7D776C',
}

export default function Timeline() {
  return (
    <SectionReveal as="div">
      <section id="timeline">
        <RevealItem>
          <p className="section-label center">Journey</p>
          <h2 className="section-heading center">Experience & Education</h2>
          <p className="section-sub">
            A brief timeline of my journey as a developer — from learning to building to shipping.
          </p>
        </RevealItem>

        <div className="timeline-steps">
          {timeline.map((item, i) => (
            <RevealItem key={i}>
              <motion.div
                className="timeline-step"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div>
                  <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="step-badge">{item.year}</span>
                </div>
                <h3 className="step-title">
                  {item.title}
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--accent)', fontWeight: 500, marginTop: '2px' }}>
                    {item.org}
                  </span>
                </h3>
                <p className="step-desc">{item.desc}</p>
              </motion.div>
            </RevealItem>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
