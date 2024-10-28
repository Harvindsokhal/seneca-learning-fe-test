import { useQuery } from '@tanstack/react-query'
import { Answer, QuestionData } from '../../models/question'
import { fetchQuestions } from '../../services/questions'
import { useEffect, useState } from 'react'
import AnswersToggle from '../AnswersToggle/AnswersToggle'
import './Quiz.scss'

const Quiz = () => {
  const { data, isLoading, isError, error } = useQuery<QuestionData>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number
  }>({})

  useEffect(() => {
    if (data) {
      const initialSelectedAnswers: { [key: number]: number } = {}
      data[currentQuestionIndex].answers.forEach((answer: Answer) => {
        const randomOptionId =
          answer.options[Math.floor(Math.random() * answer.options.length)].id
        initialSelectedAnswers[answer.id] = randomOptionId
      })
      setSelectedAnswers(initialSelectedAnswers)
    }
  }, [data, currentQuestionIndex])

  const handleAnswerSelect = (answerId: number, optionId: number) => {
    if (!data) return
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev, [answerId]: optionId }

      return updatedAnswers
    })
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h1 className="question-title">{data?.[currentQuestionIndex].title}</h1>
        {data?.[currentQuestionIndex].answers.map((answer: Answer) => (
          <AnswersToggle
            key={answer.id}
            answerId={answer.id}
            options={answer.options}
            selectedOptionId={selectedAnswers[answer.id]}
            onOptionSelect={handleAnswerSelect}
          />
        ))}
        <h2 className="result-message">{'The answer is incorrect'}</h2>
      </div>
    </div>
  )
}

export default Quiz
