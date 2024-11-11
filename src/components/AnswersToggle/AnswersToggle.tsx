import { useEffect, useRef, useState } from 'react'
import { Option } from '../../models/question'
import { motion } from 'framer-motion'
import AnswerToggleButton from '../AnswerToggleButton/AnswerToggleButton'
import './AnswersToggle.scss'

interface AnswersToggleProps {
  answerId: number
  options: Option[]
  selectedOptionId: number
  onOptionSelect: (answerId: number, optionId: number) => void
  isLocked: boolean
}
const AnswersToggle = ({
  answerId,
  options,
  selectedOptionId,
  onOptionSelect,
  isLocked,
}: AnswersToggleProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef(document.createElement('canvas'))

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    if (!context) return

    const checkLayout = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const buttonWidth = containerWidth / options.length

      context.font = '700 24px Mulish'

      // Determine if any option text is too long for its button width
      const shouldWrap = options.some((option) => {
        const textWidth = context.measureText(option.text).width
        return textWidth > buttonWidth - 20
      })
      setIsMobile(shouldWrap)
    }

    checkLayout()
    window.addEventListener('resize', checkLayout)

    return () => window.removeEventListener('resize', checkLayout)
  }, [options])

  const handleToggle = (optionId: number) => {
    if (isLocked || optionId === selectedOptionId) return

    onOptionSelect(answerId, optionId)
  }

  const selectedIndex = options.findIndex(
    (option) => option.id === selectedOptionId
  )

  const sliderSize = 100 / options.length
  const positionPercentage = selectedIndex * 100

  return (
    <div
      ref={containerRef}
      className={`answers-toggle-container ${isMobile ? 'wrap' : ''}`}
    >
      <motion.div
        className={`toggle-slider ${isMobile ? 'wrap' : ''}`}
        layout
        initial={{
          y: isMobile ? `${positionPercentage}%` : 0,
          x: !isMobile ? `${positionPercentage}%` : 0,
        }}
        animate={{
          x: !isMobile ? `${positionPercentage}%` : 0,
          y: isMobile ? `${positionPercentage}%` : undefined,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: !isMobile ? `${sliderSize}%` : '100%',
          height: isMobile ? `${sliderSize}%` : '100%',
        }}
      />
      {options.map((option) => {
        return (
          <AnswerToggleButton
            key={option.id}
            option={option}
            onClick={() => handleToggle(option.id)}
            isSelected={option.id === selectedOptionId}
            isLocked={isLocked}
          />
        )
      })}
    </div>
  )
}

export default AnswersToggle
