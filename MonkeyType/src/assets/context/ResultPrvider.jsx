// src/context/ResultProvider.jsx
import { useState } from 'react'
import { ResultContext } from './ResultContext'

const ResultProvider = ({ children }) => {
  const [resultData, setResultData] = useState({
    correct: 0,
    wrong: 0,
    wpm: 0,
    validity: 0,
    accuracy:0,
    hasRun:false
  })
  return (
    <ResultContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultContext.Provider>
  )
}

export default ResultProvider
