import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons'
import {
  FiChevronDown, FiCoffee, FiShoppingCart, FiHome, FiDollarSign,
} from 'react-icons/fi'

interface DropDownProps {
  text: string;
  Icon: IconType;
  setOpen: (isOpen: boolean) => void;
}
const wrapperVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.95,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -20 },
}

function Option({ text, Icon, setOpen } : DropDownProps) {
  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-sm font-medium rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 cursor-pointer"
    >
      <Icon className="text-lg" />
      <span>{text}</span>
    </motion.li>
  )
}

export default function DropDown() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <motion.div animate={open ? 'open' : 'closed'} className="relative overflow-visible">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 transition-colors"
        >
          <span className="font-medium text-sm">Select Category</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial="closed"
          animate={open ? 'open' : 'closed'}
          variants={wrapperVariants}
          style={{ originY: 0.5, translateX: '-50%' }}
          className="absolute top-full left-1/2 z-50 flex flex-col mt-2 p-2 rounded-lg bg-white shadow-xl w-48 "
        >
          <Option Icon={FiHome} text="Utilities" setOpen={setOpen} />
          <Option Icon={FiShoppingCart} text="Groceries" setOpen={setOpen} />
          <Option Icon={FiDollarSign} text="Online Shopping" setOpen={setOpen} />
          <Option Icon={FiCoffee} text="Going Out" setOpen={setOpen} />
        </motion.ul>
      </motion.div>
    </div>
  )
}
