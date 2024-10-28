import { Option } from '../../models/question'
import { motion } from 'framer-motion'
import AnswerToggleButton from '../AnswerToggleButton/AnswerToggleButton'
import './AnswersToggle.scss'
import { useEffect, useState } from 'react'

interface AnswersToggleProps {
  answerId: number
  options: Option[]
  selectedOptionId: number
  onOptionSelect: (answerId: number, optionId: number) => void
}
const AnswersToggle = ({
  answerId,
  options,
  selectedOptionId,
  onOptionSelect,
}: AnswersToggleProps) => {
  const [currentOptionId, setCurrentOptionId] = useState(options[0].id)

  useEffect(() => {
    setCurrentOptionId(selectedOptionId)
  }, [selectedOptionId])

  const handleToggle = (optionId: number) => {
    if (optionId === selectedOptionId) return

    setCurrentOptionId(optionId) // Update selected option
    onOptionSelect(answerId, optionId)
  }

  const selectedIndex = options.findIndex(
    (option) => option.id === selectedOptionId
  )

  return (
    <div className={'answers-toggle-container'}>
      <motion.div
        className={'toggle-slider'}
        animate={{
          x: `${selectedIndex * 100}%`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {options.map((option) => {
        return (
          <AnswerToggleButton
            key={option.id}
            option={option}
            onClick={() => handleToggle(option.id)}
            isSelected={option.id === currentOptionId}
          />
        )
      })}
    </div>
  )
}

export default AnswersToggle
