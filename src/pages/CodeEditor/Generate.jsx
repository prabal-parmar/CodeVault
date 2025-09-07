import CodeEditor from './CodeEditor'
import RecentQuestions from './DsaTopics'
import SelectedQuestionProvider from '../../context/SelectedQuestionProvider'

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