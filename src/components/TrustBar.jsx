import { BiLogoHtml5, BiLogoCss3, BiLogoJavascript, BiLogoJava, BiLogoGithub, BiData } from 'react-icons/bi'
import { RevealText } from './SectionReveal'

const stack = [
  { icon: <BiLogoHtml5 />, label: 'HTML5' },
  { icon: <BiLogoCss3 />, label: 'CSS3' },
  { icon: <BiLogoJavascript />, label: 'JavaScript' },
  { icon: <BiLogoJava />, label: 'Java' },
  { icon: <BiLogoGithub />, label: 'GitHub' },
  { icon: <BiData />, label: 'MySQL' },
]

export default function TrustBar() {
  return (
    <RevealText>
      <div className="trust-bar">
        <div className="trust-inner">
          <span>Trusted tools & stack:</span>
          <div className="trust-logos">
            {stack.map((s) => (
              <span key={s.label}>{s.icon} {s.label}</span>
            ))}
          </div>
        </div>
      </div>
    </RevealText>
  )
}
