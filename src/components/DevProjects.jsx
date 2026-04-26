import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const ALLOWED = [/^demo\//, /^https:\/\/(www\.)?genzxr\.in\//]

const projects = [
  {
    title: 'DSA Practice Programs',
    desc: 'Collection of Java programs implementing core data structures and algorithms such as arrays, linked lists, recursion, and sorting.',
    tech: null,
    code: 'https://github.com/RohitMane2005/JavaDSA',
    preview: null,
  },
  {
    title: 'Responsive Portfolio Website',
    desc: 'Personal portfolio built using HTML, CSS, and JavaScript with responsive layout, smooth animations, and clean UI design.',
    tech: 'HTML, CSS, JavaScript',
    code: 'https://github.com/RohitMane2005/portfolio',
    preview: 'https://www.genzxr.in/',
  },
  {
    title: 'Library Management System',
    desc: 'Console-based Library Management System built using Java, JDBC, and MySQL. Implements role-based access (Admin/User).',
    tech: 'Java, JDBC, MySQL, DAO Pattern',
    code: 'https://github.com/RohitMane2005/library-management-system',
    preview: null,
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
        <h2 className="section-heading center">Coding Projects</h2>
      </RevealItem>

      <div className="project-grid">
        {projects.map((p, i) => (
          <RevealItem key={i}>
            <TiltCard className="project-card">
              <h3>{p.title}</h3>
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
