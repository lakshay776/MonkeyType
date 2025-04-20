// src/context/ResultProvider.jsx
import { useState, useEffect } from 'react';
import { ResultContext } from './ResultContext';

const ResultProvider = ({ children }) => {
  const [resultData, setResultData] = useState({
    correct: 0,
    wrong: 0,
    wpm: 0,
    validity: 0,
    accuracy: 0,
    hasRun: false
  });

  const [cpsData, setcpsData] = useState({
    cps: 0
  });

  // ⬇ Get initial login status from localStorage
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // ⬇ Update localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <ResultContext.Provider
      value={{
        resultData,
        setResultData,
        cpsData,
        setcpsData,
        isLoggedIn,
        setLoggedIn
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultProvider;
