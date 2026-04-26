import { SectionReveal, RevealItem } from './SectionReveal'
import TiltCard from './TiltCard'

const testimonials = [
  {
    text: '"Rohit delivered my restaurant website in just 5 days. It looks amazing on mobile and I\'m already getting booking enquiries through the contact form."',
    name: 'Suresh Mehta', role: 'Spice Garden Restaurant', initials: 'SM',
  },
  {
    text: '"Very professional work. He understood exactly what I needed for my clinic and the site was live within a week. Communication was smooth throughout."',
    name: 'Dr. Priya Desai', role: 'Wellness Clinic', initials: 'DP',
  },
  {
    text: '"Got a beautiful salon website with an online booking form. My customers love it and it\'s helped my business look credible. Great value for money!"',
    name: 'Neha Kulkarni', role: 'Glow Beauty Salon', initials: 'NK',
  },
]

export default function Testimonials() {
  return (
    <SectionReveal id="testimonials" className="testimonials">
      <RevealItem>
        <p className="section-label center">Client Love</p>
        <h2 className="section-heading center">What people say</h2>
      </RevealItem>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <RevealItem key={i}>
            <TiltCard className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </div>
    </SectionReveal>
  )
}
