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
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                    <span style={{ color: '#EA4E33' }}>const</span> <span style={{ color: 'var(--text)' }}>developer</span> = {'{'}<br />
                    &nbsp;&nbsp;<span style={{ color: '#F59E0B' }}>name</span>: <span style={{ color: '#BBB5AA' }}>"Rohit Mane"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#F59E0B' }}>role</span>: <span style={{ color: '#BBB5AA' }}>"Java Backend Developer"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#F59E0B' }}>focus</span>: [<span style={{ color: '#BBB5AA' }}>"Spring Boot APIs"</span>, <span style={{ color: '#BBB5AA' }}>"AI Platforms"</span>],<br />
                    {'}'};
                  </div>
                </div>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="about-text">
              <p className="section-label">About Me</p>
              <h2>Building things that<br />actually <span className="accent-text">matter</span></h2>
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
