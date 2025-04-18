// src/components/Result.jsx
import { useContext } from 'react'
import { ResultContext } from '../assets/context/ResultContext'

const Result = () => {
  const { resultData } = useContext(ResultContext)

  return (
    <div>
      <h2>Typing Stats</h2>
      <p>Correct: {resultData.correct}</p>
      <p>Wrong: {resultData.wrong}</p>
      <p>WPM: {resultData.wpm}</p>
      <p>Validity: {resultData.validity}%</p>
    </div>
  )
}

export default Result
