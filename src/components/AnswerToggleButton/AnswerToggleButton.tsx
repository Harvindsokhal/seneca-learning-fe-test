import { Option } from '../../models/question'
import './AnswerToggleButton.scss'

interface AnswerToggleButtonProps {
  option: Option
  onClick: () => void
}

const AnswerToggleButton = ({ option, onClick }: AnswerToggleButtonProps) => {
  return (
    <button className={'answer-toggle-button'} onClick={onClick}>
      {option.text}
    </button>
  )
}

export default AnswerToggleButton
