import { useQuery } from '@tanstack/react-query'
import './Quiz.scss'
import { QuestionData } from '../models/question'
import { fetchQuestions } from '../services/questions'

const Quiz = () => {
  const { data, isLoading, isError, error } = useQuery<QuestionData>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })

  console.log(data)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return <div className="quiz-container">Quiz</div>
}

export default Quiz
