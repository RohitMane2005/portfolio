import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function SectionReveal({ children, className = '', id, as = 'div' }) {
  const Component = motion[as] || motion.div
  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ children, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  )
}

