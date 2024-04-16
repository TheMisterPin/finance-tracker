import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}
function SpringModal({ isOpen, setIsOpen, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="glass text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default flex flex-col"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Modal({ content }:{ content: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Add Expense
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        {' '}
        {content}
      </SpringModal>
    </>
  )
}
export default Modal
