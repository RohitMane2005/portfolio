import { motion } from 'framer-motion'
import { SectionReveal, RevealItem } from './SectionReveal'
import AboutModel from '../scene/AboutModel'

const tags = ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'JWT', 'JPA/Hibernate', 'React.js', 'PostgreSQL', 'MySQL', 'Docker', 'Maven', 'Git']

export default function About() {
  return (
    <SectionReveal as="div">
      <section id="about" className="about">
        <div className="about-grid">
          <RevealItem>
            <div className="about-visual">
              <div className="about-card">
                <AboutModel />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1, padding: '24px' }}>
                  <div className="code-badge">{'>'} rohit.init()</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 2 }}>
                    <span style={{ color: '#42a1ec' }}>const</span> <span style={{ color: '#f5f5f7' }}>developer</span> = {'{'}<br />
                    &nbsp;&nbsp;<span style={{ color: '#a78bfa' }}>name</span>: <span style={{ color: '#a5d6ff' }}>"Rohit Mane"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#a78bfa' }}>role</span>: <span style={{ color: '#a5d6ff' }}>"Java Backend Developer"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#a78bfa' }}>focus</span>: [<span style={{ color: '#a5d6ff' }}>"Spring Boot APIs"</span>, <span style={{ color: '#a5d6ff' }}>"AI Platforms"</span>],<br />
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
                I'm a Java Backend Developer with hands-on experience designing and delivering scalable,
                production-grade full-stack applications using Spring Boot, REST APIs, JWT authentication,
                and AI integrations.
              </p>
              <p>
                Currently pursuing B.Com IT at Dhananjayrao Gadgil College of Commerce, Satara (CGPA: 8.27/10).
                Every project I ship is built from scratch — no templates, no shortcuts.
              </p>
              <div className="about-tags">
                {tags.map((t) => (
                  <motion.span key={t} className="about-tag" whileHover={{ y: -2, scale: 1.03 }}>
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
