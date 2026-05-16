import { motion } from 'framer-motion'
import { SectionReveal, RevealItem } from './SectionReveal'

const tags = ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'JWT', 'FastAPI', 'Python', 'Git']

export default function About() {
  return (
    <SectionReveal>
      <section id="about" className="about">
        <div className="about-grid">
          <RevealItem>
            <div className="about-visual">
              <div className="about-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1, padding: '28px' }}>
                  <div className="code-badge">{'>'} rohit.init()</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                    <span style={{ color: 'var(--accent)' }}>const</span> <span style={{ color: 'var(--text)' }}>developer</span> = {'{'}<br />
                    &nbsp;&nbsp;<span style={{ color: 'var(--accent2)' }}>name</span>: <span style={{ color: '#a5d6ff' }}>"Rohit Mane"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: 'var(--accent2)' }}>role</span>: <span style={{ color: '#a5d6ff' }}>"Full-Stack Developer"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: 'var(--accent2)' }}>focus</span>: [<span style={{ color: '#a5d6ff' }}>"AI Platforms"</span>, <span style={{ color: '#a5d6ff' }}>"Web Apps"</span>],<br />
                    &nbsp;&nbsp;<span style={{ color: 'var(--accent2)' }}>coffee</span>: <span style={{ color: '#79c0ff' }}>Infinity</span>,<br />
                    {'}'};
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="about-text">
              <p className="section-label">About Me</p>
              <h2>Building things that<br />actually <span className="gradient-text">matter</span></h2>
              <p>
                I'm a full-stack developer specializing in Java/Spring Boot backends and React frontends.
                I've built production-grade AI platforms, implemented enterprise-level security architectures,
                and integrated LLM APIs to create intelligent applications that solve real problems.
              </p>
              <p>
                I believe in writing clean, maintainable code that scales. Every project I ship is built from scratch
                — no templates, no shortcuts. Just well-engineered software that works.
              </p>
              <div className="about-tags">
                {tags.map((t) => (
                  <motion.span key={t} className="about-tag" whileHover={{ y: -2, scale: 1.05 }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </RevealItem>
        </div>
      </section>
    </SectionReveal>
  )
}
