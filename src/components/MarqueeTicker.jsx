export default function MarqueeTicker() {
  const items = [
    'Spring Boot & Java',
    'REST APIs that scale',
    'AI-powered platforms',
    'Production-grade security',
    'End-to-end architecture',
    'JWT & RBAC authentication',
    'Open to opportunities',
  ]

  // Duplicate for seamless loop
  const track = [...items, ...items]

  return (
    <div className="marquee-ticker">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
