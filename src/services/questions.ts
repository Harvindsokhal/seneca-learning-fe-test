import { QuestionData } from '../models/question'

export const fetchQuestions = async (): Promise<QuestionData> => {
  try {
    const response = await fetch('/questions.json')

    if (!response.ok) {
      throw new Error('Failed to fetch questions')
    }

    const data: QuestionData = await response.json()

    return data
  } catch (error) {
    console.error('Failed to fetch questions', error)
    throw error
  }
}
