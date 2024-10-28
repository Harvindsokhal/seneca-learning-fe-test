import { Option } from '../../models/question'
import './AnswerToggleButton.scss'

interface AnswerToggleButtonProps {
  option: Option
  onClick: () => void
  isSelected: boolean
}

const AnswerToggleButton = ({
  option,
  onClick,
  isSelected,
}: AnswerToggleButtonProps) => {
  return (
    <button
      className={`answer-toggle-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {option.text}
    </button>
  )
}

export default AnswerToggleButton
