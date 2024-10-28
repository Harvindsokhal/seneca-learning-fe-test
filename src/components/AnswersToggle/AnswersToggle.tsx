import { Option } from '../../models/question'
import AnswerToggleButton from '../AnswerToggleButton/AnswerToggleButton'
import './AnswersToggle.scss'

interface AnswersToggleProps {
  options: Option[]
}
const AnswersToggle = ({ options }: AnswersToggleProps) => {
  return (
    <div className={'answers-toggle-container'}>
      {options.map((option) => {
        return <AnswerToggleButton key={option.id} option={option} />
      })}
    </div>
  )
}

export default AnswersToggle
