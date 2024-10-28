import { useEffect, useState } from 'react'
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
  const [currentOptionId, setCurrentOptionId] = useState(options[0].id)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    setCurrentOptionId(selectedOptionId)
  }, [selectedOptionId])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = (optionId: number) => {
    if (isLocked || optionId === selectedOptionId) return

    setCurrentOptionId(optionId) // Update selected option
    onOptionSelect(answerId, optionId)
  }

  const selectedIndex = options.findIndex(
    (option) => option.id === selectedOptionId
  )

  const hasLongTextOption = options.some((option) => option.text.length > 20)

  const sliderSize = 100 / options.length
  const positionPercentage = selectedIndex * 100

  return (
    <div
      className={`answers-toggle-container ${
        hasLongTextOption && isMobile ? 'wrap' : ''
      }`}
    >
      <motion.div
        className={`toggle-slider ${
          hasLongTextOption && isMobile ? 'wrap' : ''
        }`}
        initial={{
          y: isMobile && hasLongTextOption ? `${positionPercentage}%` : 0,
          x: !isMobile || !hasLongTextOption ? `${positionPercentage}%` : 0,
        }}
        animate={{
          x: !isMobile || !hasLongTextOption ? `${positionPercentage}%` : 0,
          y:
            hasLongTextOption && isMobile
              ? `${positionPercentage}%`
              : undefined,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          width: !isMobile || !hasLongTextOption ? `${sliderSize}%` : '100%',
          height: isMobile && hasLongTextOption ? `${sliderSize}%` : '100%',
        }}
      />
      {options.map((option) => {
        return (
          <AnswerToggleButton
            key={option.id}
            option={option}
            onClick={() => handleToggle(option.id)}
            isSelected={option.id === currentOptionId}
            isLocked={isLocked}
          />
        )
      })}
    </div>
  )
}

export default AnswersToggle
