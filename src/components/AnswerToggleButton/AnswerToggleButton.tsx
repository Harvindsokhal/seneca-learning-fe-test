import { Option } from '../../models/question'
import './AnswerToggleButton.scss'

interface AnswerToggleButtonProps {
  option: Option
  onClick: () => void
  isSelected: boolean
  isLocked: boolean
}

const AnswerToggleButton = ({
  option,
  onClick,
  isSelected,
  isLocked,
}: AnswerToggleButtonProps) => {
  return (
    <button
      className={`answer-toggle-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={isLocked}
    >
      {option.text}
    </button>
  )
}

export default AnswerToggleButton
