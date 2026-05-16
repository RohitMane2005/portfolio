import { motion } from 'framer-motion'
import { BiLogoGithub, BiLinkExternal } from 'react-icons/bi'
import { SectionReveal, RevealItem } from './SectionReveal'

const projects = [
  {
    title: 'PathShashtra',
    subtitle: 'AI Student Success Platform',
    desc: 'Production-grade full-stack AI platform powering personalized study plans, DSA problem generation, and AI-driven career roadmaps — increasing student engagement by 30%+.',
    tech: ['Spring Boot', 'React', 'PostgreSQL', 'JWT', 'Groq AI', 'Docker'],
    year: '2024–2025',
    code: 'https://github.com/RohitMane2005/PathShashtra',
    icon: '🧠',
    highlights: [
      'Enterprise JWT + RBAC security across all endpoints',
      'LLM-powered study plan & career roadmap generation',
      'End-to-end architecture, deployment, and maintenance',
    ],
  },
  {
    title: 'Gitriage',
    subtitle: 'AI-Powered Issue Triage',
    desc: 'Full-stack AI triage platform that auto-classifies GitHub issue priority and detects duplicates using NLP — reducing manual triage effort by ~40% with up to 95% confidence.',
    tech: ['Spring Boot', 'React', 'FastAPI', 'scikit-learn', 'WebSocket', 'Docker'],
    year: '2024',
    code: 'https://github.com/RohitMane2005/Gitriage',
    icon: '⚡',
    highlights: [
      'NLP pipeline: TF-IDF + 80+ regex patterns',
      'Real-time WebSocket notifications',
      'Multi-layer security: HttpOnly JWT, rate limiting, CSP/HSTS',
    ],
  },
  {
    title: 'Developer Portfolio',
    subtitle: 'Immersive 3D Web Experience',
    desc: 'Performance-optimized portfolio with 3D animations, glassmorphism UI, and interactive particle systems — built to impress at first glance.',
    tech: ['React', 'Three.js', 'Framer Motion', 'EmailJS'],
    year: '2023–Present',
    code: 'https://github.com/RohitMane2005/portfolio',
    live: 'https://www.genzxr.in/',
    icon: '🚀',
    highlights: [
      'React Three Fiber with post-processing effects',
      'Custom cursor, particle trails, magnetic buttons',
      'EmailJS + reCAPTCHA v3 secure contact form',
    ],
  },
]

export default function FeaturedProjects() {
  return (
    <SectionReveal>
      <section id="projects" className="projects-section">
        <RevealItem>
          <p className="section-label center">Selected Work</p>
          <h2 className="section-heading center">Projects I've Built</h2>
          <p className="section-sub">
            Each project represents end-to-end engineering — from architecture design to production deployment.
          </p>
        </RevealItem>

        <div className="project-list">
          {projects.map((p, i) => (
            <RevealItem key={i}>
              <motion.div
                className="featured-project"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="project-info">
                  <span className="project-year">{p.year}</span>
                  <h3>{p.title} <span style={{ fontWeight: 400, fontSize: '0.85em', color: 'var(--text-secondary)' }}>— {p.subtitle}</span></h3>
                  <p>{p.desc}</p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {p.highlights.map((h, j) => (
                      <li key={j} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="project-tech">
                    {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                  </div>

                  <div className="project-links">
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-link">
                      <BiLogoGithub /> Source Code
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link primary">
                        <BiLinkExternal /> Live Site
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-visual">
                  <div className="project-visual-inner">{p.icon}</div>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
