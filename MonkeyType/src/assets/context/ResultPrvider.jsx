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
  const [cpsData,setcpsData]=useState({
    cps:0
  })
  return (
    <ResultContext.Provider value={{ resultData, setResultData,cpsData,setcpsData }}>
      {children}
    </ResultContext.Provider>
  )
}

export default ResultProvider
