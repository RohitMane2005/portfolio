import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const ALLOWED = [/^demo\//, /^https:\/\/(www\.)?genzxr\.in\//]

const projects = [
  {
    title: 'PathShashtra — AI Student Success Platform',
    desc: 'Production-grade full-stack AI platform with personalized study plans, DSA problem generation, and AI-driven career roadmaps. Increased student engagement by 30%+.',
    tech: 'Spring Boot, React, PostgreSQL, JWT, Spring Security, Groq AI, Docker',
    year: '2024–2025',
    code: 'https://github.com/RohitMane2005/PathShashtra',
    preview: null,
  },
  {
    title: 'Gitriage — AI-Powered GitHub Issue Triage',
    desc: 'Full-stack AI triage platform that auto-classifies GitHub issue priority and detects duplicates using NLP — reducing manual triage effort by ~40% with up to 95% confidence scoring.',
    tech: 'Spring Boot, React, FastAPI, scikit-learn, WebSocket, JWT, Docker',
    year: '2024',
    code: 'https://github.com/RohitMane2005/Gitriage',
    preview: null,
  },
  {
    title: 'Responsive Developer Portfolio',
    desc: 'Performance-optimized portfolio using modern UI patterns (glassmorphism, CSS animations) with secure EmailJS contact form and Google reCAPTCHA v3 integration.',
    tech: 'HTML, CSS, JavaScript, EmailJS',
    year: '2023',
    code: 'https://github.com/RohitMane2005/portfolio',
    preview: 'https://www.genzxr.in/',
  },
]

export default function DevProjects({ onPreview }) {
  const handlePreview = (url) => {
    if (url && ALLOWED.some((p) => p.test(url))) onPreview(url)
  }

  return (
    <SectionReveal id="devprojects" className="projects-section">
      <RevealItem>
        <p className="section-label center">Developer Side</p>
        <h2 className="section-heading center">Engineering Projects</h2>
      </RevealItem>

      <div className="project-grid">
        {projects.map((p, i) => (
          <RevealItem key={i}>
            <TiltCard className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h3>{p.title}</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '12px', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{p.year}</span>
              </div>
              <p>{p.desc}</p>
              {p.tech && <p className="tech"><strong>Tech:</strong> {p.tech}</p>}
              <div className="project-buttons">
                <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-btn code">View Code</a>
                {p.preview && (
                  <button className="project-btn preview" onClick={() => handlePreview(p.preview)}>Live Preview</button>
                )}
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </div>
    </SectionReveal>
  )
}
