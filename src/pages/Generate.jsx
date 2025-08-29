import CodeEditor from './CodeEditor/CodeEditor'
import RecentQuestions from './CodeEditor/DsaTopics'
import SelectedQuestionProvider from '../context/SelectedQuestionProvider'

function Generate() {
  return (
    <>
      <SelectedQuestionProvider>
          <CodeEditor/>
          <RecentQuestions/>
      </SelectedQuestionProvider>
    </>
  )
}

export default Generate