import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 50, rotateX: 6 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function SectionReveal({ children, className = '', id, as = 'section' }) {
  const Component = motion[as] || motion.section
  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      style={{ perspective: '1200px' }}
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

export function RevealText({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
