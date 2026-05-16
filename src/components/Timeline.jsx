import { SectionReveal, RevealItem } from './SectionReveal'
import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2024–2025',
    title: 'Full-Stack AI Developer',
    org: 'PathShashtra & Gitriage',
    desc: 'Built production-grade AI platforms using Spring Boot, React, PostgreSQL, and LLM APIs. Designed enterprise security architectures with JWT/RBAC. Integrated NLP pipelines achieving 95% confidence scoring.',
    type: 'project',
  },
  {
    year: '2023–Present',
    title: 'Freelance Web Developer',
    org: 'Self-Employed',
    desc: 'Designing and deploying responsive business websites for restaurants, clinics, salons, and more. 5+ projects delivered with 100% custom code, 3-7 day turnaround.',
    type: 'work',
  },
  {
    year: '2023–Present',
    title: 'B.Tech Computer Science',
    org: 'University Studies',
    desc: 'Strong foundations in DSA, OOP, DBMS, and software engineering. Active competitive programmer and open-source contributor.',
    type: 'education',
  },
]

const typeColors = {
  project: '#7c6cf0',
  work: '#764ba2',
  education: '#a78bfa',
}

export default function Timeline() {
  return (
    <SectionReveal>
      <section id="timeline">
        <RevealItem>
          <p className="section-label center">Journey</p>
          <h2 className="section-heading center">Experience & Education</h2>
          <p className="section-sub">
            A brief timeline of my journey as a developer — from learning to building to shipping.
          </p>
        </RevealItem>

        <div className="timeline-container">
          {timeline.map((item, i) => (
            <RevealItem key={i}>
              <motion.div
                className="timeline-item"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="timeline-marker" style={{ background: typeColors[item.type] }}>
                  <div className="timeline-line" />
                </div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <span className="timeline-org">{item.org}</span>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
