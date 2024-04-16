/* eslint-disable react/no-array-index-key */
import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { ClassValue } from 'clsx'

const PagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures nothing outside this container is shown */
  width: 100%;
  position: relative; /* Ensures proper stacking context for absolute positioning */
`

const PagerAnimatedContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  will-change: transform;
  width: 100%; /* Ensures the container takes full width */
  min-height: 100%; /* Minimum height to contain all pages properly */
`

const Page = styled.div`
  min-width: 100%; /* Each page takes exactly the width of the container */
  margin-right: 2px;
  flex-shrink: 0; /* Prevents the page from shrinking */
  height: 100%; /* Optional: Adjust according to content size */
  overflow: hidden; /* Hides anything outside this element's box */
`

interface PagerProps {
  children: React.ReactNode;
  value: number;
}

function Pager({ children, value }: PagerProps) {
  return (
    <PagerContainer>
      <PagerAnimatedContainer
        transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
        initial={false}
        animate={{ x: `${value * -100}%` }}
        className="glass"
      >
        {React.Children.map(children, (child, index) => (
          <Page
            key={index}
            aria-hidden={value !== index}
            tabIndex={value === index ? 0 : -1}
            className="glass"
          >
            {child}
          </Page>
        ))}
      </PagerAnimatedContainer>
    </PagerContainer>
  )
}

export default Pager
