import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">XSO<span>R</span></div>
          <p>Java Backend Developer & AI Platform Builder</p>
        </div>
        <div className="footer-social">
          <a href="https://github.com/RohitMane2005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub /></a>
          <a href="https://www.linkedin.com/in/rohitmane2005/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedin /></a>
          <a href="mailto:rohitbusiness9115@gmail.com" aria-label="Email"><BiEnvelope /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rohit Mane · <span className="footer-tagline">Built with React & Three.js</span></p>
      </div>
    </footer>
  )
}
