/* eslint-disable max-len */
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import tw from 'twin.macro'
import { useExpenses } from '../hooks/context/ExpenseContext'
import Pager from './ui/tabs/pager'
import { Modal } from './ui'
import AddExpensesForm from './forms/addExpenseform'

const TabContainer = styled.div`
  ${tw`shadow-none min-w-full`}
`

const TabList = styled.div`
  ${tw`flex relative  overflow-clip z-20 mb-4`}
  
`

const tabVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
}

const TabItem = styled(motion.button).attrs(() => ({
  initial: 'hidden',
  animate: 'visible',
  variants: tabVariants,
}))<{ isActive: boolean }>`
  ${tw`flex-grow whitespace-nowrap appearance-none box-border text-center select-none outline-none cursor-pointer [text-decoration:none] border-none overflow-x-hidden py-3 px-4 text-lg font-semibold transition-colors duration-100 ease-in-out`}
  color: ${(props) => (props.isActive ? 'rgb(80, 3, 112)' : 'rgb(95, 104, 113)')};
  background-color: ${(props) => (props.isActive ? '#6c767d' : 'transparent')};

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }
`

const Slider = styled(motion.div)`
  ${tw`h-1 bg-[rgb(80, 3, 112)] rounded-full absolute bottom-0 w-full`}
`

export default function ExpensesList() {
  const { categories } = useExpenses()
  const [activeTab, setActiveTab] = useState<number>(0)
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    const tab = tabRefs.current[index]
    const list = tabListRef.current

    if (tab && list) {
      const { left: tabLeft, width: tabWidth } = tab.getBoundingClientRect()
      const { left: listLeft } = list.getBoundingClientRect()

      setSliderStyle({
        left: tabLeft - listLeft,
        width: tabWidth,
      })
    }
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!entry.contentRect.width) continue
        setSliderStyle((prev) => ({
          ...prev,
          width: tabRefs.current[activeTab]?.getBoundingClientRect().width ?? prev.width,
        }))
      }
    })

    if (tabListRef.current) {
      resizeObserver.observe(tabListRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [activeTab])
  const capitalizeFirstLetter = (string : String) => {
    if (!string) return string

    return string[0].toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <div className="text-yellow-50 flex flex-col items-center" style={{ height: '75vh' }}>
      <TabContainer>
        <TabList className="glass min-w-full" ref={tabListRef}>
          {categories.map((category, index) => (
            <TabItem
              key={category.name}
              isActive={index === activeTab}
              onClick={() => handleTabClick(index)}
              ref={(el) => { tabRefs.current[index] = el }}
            >
              {category.name}
              , $
              {category.total}
            </TabItem>
          ))}
          <Slider style={sliderStyle} layoutId="underline" />
        </TabList>
      </TabContainer>
      <Pager value={activeTab}>
        {categories.map((category) => (
          <div
            key={category.name}
            style={{
              padding: '16px', margin: '1rem', width: '100%', height: '300px',
            }}
          >
            {category.expenses.map((expense) => (
              <p key={expense.id}>
                {capitalizeFirstLetter(expense.name)}
                , €
                {' '}
                {expense.amount}
              </p>
            ))}
          </div>
        ))}
      </Pager>
      <Modal content={AddExpensesForm()} />
    </div>
  )
}
