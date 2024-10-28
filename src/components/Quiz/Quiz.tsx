import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Answer, Option, QuestionData } from '../../models/question'
import { fetchQuestions } from '../../services/questions'
import { interpolateGradient } from '../../utils/gradientUtils'
import { shuffleArray } from '../../utils/arrayUtils'
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
  const [isLocked, setIsLocked] = useState(false)
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([])

  useEffect(() => {
    if (data) {
      const question = data[currentQuestionIndex]
      const shuffledAnswers = question.answers.map((answer: Answer) => ({
        ...answer,
        options: shuffleArray(answer.options),
      }))
      setShuffledAnswers(shuffleArray(shuffledAnswers))

      const initialSelectedAnswers: { [key: number]: number } = {}
      shuffledAnswers.forEach((answer: Answer) => {
        const randomOptionId =
          answer.options[Math.floor(Math.random() * answer.options.length)].id
        initialSelectedAnswers[answer.id] = randomOptionId
      })
      setSelectedAnswers(initialSelectedAnswers)
    }
  }, [data, currentQuestionIndex])

  const handleAnswerSelect = (answerId: number, optionId: number) => {
    if (isLocked || !data) return
    setSelectedAnswers((prev) => {
      const updatedAnswers = { ...prev, [answerId]: optionId }

      // Check if all answers are correct after updating the state
      const allCorrect = shuffledAnswers.every(
        (answer: Answer) =>
          updatedAnswers[answer.id] ===
          answer.options.find((option: Option) => option.isCorrect)?.id
      )
      setIsLocked(allCorrect)

      return updatedAnswers
    })
  }

  const correctnessLevel = data
    ? shuffledAnswers.reduce((acc: number, answer: Answer) => {
        const selectedOptionId = selectedAnswers[answer.id]
        const isCorrect = answer.options.some(
          (option: Option) => option.id === selectedOptionId && option.isCorrect
        )
        return acc + (isCorrect ? 1 : 0)
      }, 0) / shuffledAnswers.length
    : 0

  const backgroundStyle = useMemo(
    () => interpolateGradient(correctnessLevel),
    [correctnessLevel]
  )

  const handleNextQuestion = () => {
    if (data) {
      if (currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setCurrentQuestionIndex(0)
      }
      setSelectedAnswers({})
      setIsLocked(false)
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <motion.div
      className="quiz-container"
      initial={false}
      animate={{
        background: backgroundStyle,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="quiz-content">
        <h1 className="question-title">{data?.[currentQuestionIndex].title}</h1>
        {shuffledAnswers.map((answer: Answer) => (
          <AnswersToggle
            key={answer.id}
            answerId={answer.id}
            options={answer.options}
            selectedOptionId={selectedAnswers[answer.id]}
            onOptionSelect={handleAnswerSelect}
            isLocked={isLocked}
          />
        ))}
        <h2 className="result-message">
          {isLocked ? 'The answer is correct!' : 'The answer is incorrect'}
        </h2>
        <button className="next-question-button" onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </motion.div>
  )
}

export default Quiz
