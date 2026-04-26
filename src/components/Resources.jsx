import { useState } from 'react'
import { SectionReveal, RevealItem } from './SectionReveal'

const resources = [
  { href: 'https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z', label: '🚀 Striver DSA Sheet', sub: 'Interview Prep', cat: 'dsa' },
  { href: 'https://roadmap.sh/frontend', label: '🌐 Frontend Roadmap', sub: 'Beginner → Advanced', cat: 'web' },
  { href: 'https://docs.google.com/document/d/1oh2Bzq-MC13CtXWPHgeKITWTYLIcPM7u/edit?usp=sharing', label: '☕ Java Developer Roadmap', sub: 'Core → Advanced', cat: 'dsa' },
  { href: 'https://scholarships.gov.in/', label: '💰 National Scholarship Portal', sub: 'Govt Financial Aid', cat: 'scholarship' },
  { href: 'https://drive.google.com/', label: '📄 My Notes & PDFs', sub: 'Java • DSA • Web', cat: 'pdf' },
]

const categories = ['all', 'dsa', 'web', 'pdf', 'scholarship', 'tools']

export default function Resources() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = resources.filter((r) => {
    const matchSearch = (r.label + r.sub).toLowerCase().includes(query.toLowerCase())
    const matchCat = cat === 'all' || r.cat === cat
    return matchSearch && matchCat
  })

  return (
    <SectionReveal id="resources" className="linktree">
      <RevealItem>
        <p className="section-label center">Free Resources</p>
        <h2 className="section-heading center">📚 Resources Hub</h2>
        <p>Curated roadmaps, PDFs, scholarships & tools</p>
      </RevealItem>

      <RevealItem>
        <input
          type="text"
          id="resourceSearch"
          placeholder="Search resources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${cat === c ? 'active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div className="links">
          {filtered.map((r, i) => (
            <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" className="link-card">
              {r.label} <span>{r.sub}</span>
            </a>
          ))}
          {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No resources found.</p>}
        </div>
      </RevealItem>
    </SectionReveal>
  )
}
