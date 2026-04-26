import { BiLogoJava, BiLogoHtml5, BiLogoCss3, BiLogoJavascript, BiCodeAlt, BiCube, BiLogoGithub, BiData } from 'react-icons/bi'
import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const skills = [
  { icon: <BiLogoJava />, label: 'Java' },
  { icon: <BiLogoHtml5 />, label: 'HTML5' },
  { icon: <BiLogoCss3 />, label: 'CSS3' },
  { icon: <BiLogoJavascript />, label: 'JavaScript' },
  { icon: <BiCodeAlt />, label: 'DSA' },
  { icon: <BiCube />, label: 'OOP' },
  { icon: <BiLogoGithub />, label: 'Git & GitHub' },
  { icon: <BiData />, label: 'MySQL / JDBC' },
]

export default function About() {
  return (
    <SectionReveal id="about" className="about">
      <div className="about-inner">
        <RevealItem className="about-text">
          <p className="section-label">About Me</p>
          <h2 className="section-heading">Developer who codes,<br />designer who ships</h2>
          <p>
            I'm Rohit — a Java & frontend developer who builds clean, fast websites for real businesses.
            I handle everything from design to deployment so you don't have to worry about the technical side.
          </p>
          <p>
            Strong foundations in DSA and OOP mean your site isn't just pretty — it's built right,
            loads fast, and is easy to update.
          </p>
          <a href="#contact" className="btn primary" style={{ display: 'inline-flex', marginTop: '1.5rem' }}>Work with me →</a>
        </RevealItem>

        <RevealItem className="about-skills">
          <p className="skills-label">Tech Stack</p>
          <div className="skills">
            {skills.map((s) => (
              <TiltCard key={s.label} className="skill-chip">
                {s.icon} {s.label}
              </TiltCard>
            ))}
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  )
}
