import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">XSO<span>R</span></div>
          <p>Full-Stack Developer & AI Platform Builder</p>
        </div>
        <div className="footer-social">
          <a href="https://github.com/RohitMane2005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub /></a>
          <a href="https://www.linkedin.com/in/rohit-mane-570487333/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedin /></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitbusiness9115@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><BiEnvelope /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rohit Mane · <span className="footer-tagline">Built with React & Three.js</span></p>
      </div>
    </footer>
  )
}
