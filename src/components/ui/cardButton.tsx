/* eslint-disable react/no-unused-prop-types */
import {
  FiEdit, FiChevronDown, FiTrash,
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { useExpenses } from '../../hooks/context/ExpenseContext'

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}

function Option({
  text,
  Icon,
  setOpen,
  action,

}: {
  text: string;
  Icon: IconType;
  setOpen: (open: boolean) => void;
  expenseId: string;
  categoryName: string;
  action: () => void;
}) {
  return (
    <motion.li
      variants={itemVariants}
      whileHover={{ backgroundColor: '#e0e7ff' }} // Enhanced visual feedback on hover
      onClick={() => {
        action()
        setOpen(false)
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  )
}

function CardButtons({ categoryName, expenseId }: { expenseId: string;
  categoryName: string; }) {
  const [open, setOpen] = useState(false)
  const { deleteExpense, modifyExpense } = useExpenses()

  // Handlers for delete and modify
  const handleDelete = () => deleteExpense(categoryName, expenseId)
  const handleModify = (newData : any) => modifyExpense(categoryName, expenseId, newData)

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-600 transition-colors"
      >
        <span className="font-medium text-sm">Post actions</span>
        <motion.span variants={iconVariants}>
          <FiChevronDown />
        </motion.span>
      </button>

      <motion.ul
        initial="closed"
        animate={open ? 'open' : 'closed'}
        variants={wrapperVariants}
        style={{ originY: 0, originX: 0.5 }}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      >
        <Option setOpen={setOpen} Icon={FiEdit} text="Edit" expenseId={expenseId} categoryName={categoryName} action={() => handleModify({ amount: 100, description: 'Updated Item', category: categoryName })} />
        <Option setOpen={setOpen} Icon={FiTrash} text="Remove" expenseId={expenseId} categoryName={categoryName} action={handleDelete} />
      </motion.ul>
    </div>
  )
}

export default CardButtons
