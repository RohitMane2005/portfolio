import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ message, type = 'success' }) {
  return (
    <AnimatePresence>
      <motion.div
        className={`toast ${type}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  )
}
