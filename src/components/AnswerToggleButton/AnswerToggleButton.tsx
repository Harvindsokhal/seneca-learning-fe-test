import { Option } from '../../models/question'
import './AnswerToggleButton.scss'

interface AnswerToggleButtonProps {
  option: Option
}

const AnswerToggleButton = ({ option }: AnswerToggleButtonProps) => {
  return <button className={'answer-toggle-button'}>{option.text}</button>
}

export default AnswerToggleButton
