import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Answer, Option, QuestionData } from '../../models/question'
import { fetchQuestions } from '../../services/questions'
import { interpolateGradient } from '../../utils/gradientUtils'
import { shuffleArray } from '../../utils/arrayUtils'
import AnswersToggle from '../AnswersToggle/AnswersToggle'
import './Quiz.scss'

interface QuizProps {
  data: QuestionData
}

const Quiz = ({ data }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number
  }>({})
  const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([])

  useEffect(() => {
    const question = data[currentQuestionIndex]
    const shuffledAnswers = question.answers.map((answer: Answer) => ({
      ...answer,
      options: shuffleArray(answer.options),
    }))
    setShuffledAnswers(shuffleArray(shuffledAnswers))

    const initialSelectedAnswers: { [key: number]: number } = {}
    let correctCount = 0

    // Select initial answers
    shuffledAnswers.forEach((answer: Answer, index: number) => {
      const randomOption =
        answer.options[Math.floor(Math.random() * answer.options.length)]
      initialSelectedAnswers[answer.id] = randomOption.id

      // Track if the selected answer is correct
      if (randomOption.isCorrect) correctCount++
    })

    // If all selected answers are correct, force the last answer to be incorrect
    if (correctCount === shuffledAnswers.length) {
      const lastAnswer = shuffledAnswers[shuffledAnswers.length - 1]
      const incorrectOption = lastAnswer.options.find(
        (option: Option) => !option.isCorrect
      )

      if (incorrectOption) {
        initialSelectedAnswers[lastAnswer.id] = incorrectOption.id
      }
    }
    setSelectedAnswers(initialSelectedAnswers)
  }, [data, currentQuestionIndex])

  const handleAnswerSelect = (answerId: number, optionId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [answerId]: optionId }))
  }

  const correctnessLevel =
    shuffledAnswers.reduce((acc: number, answer: Answer) => {
      const selectedOptionId = selectedAnswers[answer.id]
      const isCorrect = answer.options.some(
        (option: Option) => option.id === selectedOptionId && option.isCorrect
      )
      return acc + (isCorrect ? 1 : 0)
    }, 0) / shuffledAnswers.length

  const backgroundStyle = useMemo(
    () => interpolateGradient(correctnessLevel),
    [correctnessLevel]
  )

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setCurrentQuestionIndex(0)
    }
    setSelectedAnswers({})
  }

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
        <h1 className="question-title">{data[currentQuestionIndex].title}</h1>
        {shuffledAnswers.map((answer: Answer) => (
          <AnswersToggle
            key={answer.id}
            answerId={answer.id}
            options={answer.options}
            selectedOptionId={selectedAnswers[answer.id]}
            onOptionSelect={handleAnswerSelect}
            isLocked={correctnessLevel === 1}
          />
        ))}
        <h2 className="result-message">
          {correctnessLevel === 1
            ? 'The answer is correct!'
            : 'The answer is incorrect'}
        </h2>
        <button className="next-question-button" onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </motion.div>
  )
}

export default Quiz
