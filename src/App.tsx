import { useQuery } from '@tanstack/react-query'
import Quiz from './components/Quiz/Quiz'
import { QuestionData } from './models/question'
import { fetchQuestions } from './services/questions'

const App = () => {
  const { data, isLoading, isError, error } = useQuery<QuestionData>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })

  if (isError) return <p>Error: {(error as Error).message}</p>

  return <div>{data ? <Quiz data={data} /> : <p>Loading...</p>}</div>
}

export default App
