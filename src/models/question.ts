export interface Option {
  id: number
  text: string
  isCorrect: boolean
}

export interface Answer {
  id: number
  options: Option[]
}

export interface Question {
  id: number
  title: string
  answers: Answer[]
}

export type QuestionData = Question[]
