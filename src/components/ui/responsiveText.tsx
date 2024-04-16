import { useEffect, useRef } from 'react'

export function ScreenFitText() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)

  const resizeText = () => {
    const container = containerRef.current
    const text = textRef.current

    if (!container || !text) {
      return
    }

    const containerWidth = container.offsetWidth
    let min = 1
    let max = 70 // Max font size limit

    while (min <= max) {
      const mid = Math.floor((min + max) / 2)

      text.style.fontSize = `${mid}px` // Applying calculated font size

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1 // Increase font size
      } else {
        max = mid - 1 // Decrease font size
      }
    }

    text.style.fontSize = `${max}px` // Set font size to maximum possible within container
  }

  useEffect(() => {
    resizeText() // Initial resize on component mount

    window.addEventListener('resize', resizeText) // Add resize listener

    return () => {
      window.removeEventListener('resize', resizeText) // Clean up listener on component unmount
    }
  }, [])

  return (
    <div
      className=" w-full text-center" // This centers the text container in the viewport
      ref={containerRef}
    >
      <span
        className="whitespace-nowrap text-[#8369f5] font-extrabold uppercase"
        ref={textRef}
      >
        Expense Tracker
      </span>
    </div>
  )
}
