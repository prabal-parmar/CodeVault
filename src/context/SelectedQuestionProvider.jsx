import React, { createContext, useState } from 'react'

export const QuestionContext = createContext()
function SelectedQuestionProvider({children}) {
    
    const [question, setQuestion] = useState(null)

  return (
    <QuestionContext.Provider value={{question, setQuestion}}>
        {children}
    </QuestionContext.Provider>
  )
}

export default SelectedQuestionProvider