import React, { useEffect, useRef, useState } from "react";
import "../components/TextArea.css";

function TextArea() {
  const [time, setTime] = useState(0);
  const sampleText = "this is the sample text";
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const resultRef = useRef(null);
  const [correctCount, setCorrect] = useState(0);
  const [wrongCount, setWrong] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [validity, setValidity] = useState("");

  const meanAccuracyRef = useRef(0);
  const totalCorrectWordsRef = useRef(0);

  const handleChange = (e) => {
    const input = e.target.value;
    const currentIndex = input.length - 1;
    const isMatch = input[currentIndex] === sampleText[currentIndex];

    if (isMatch) {
      setCorrect((prev) => prev + 1);
    } else {
      setWrong((prev) => prev + 1);
    }

    setText(input);

    if (textAreaRef.current) {
      textAreaRef.current.style.color = isMatch ? "green" : "red";
    }

    if (input.length === sampleText.length) {
      resultRef.current.style.display = "block";
      textAreaRef.current.disabled = true;
      clearInterval(intervalId);
      checkWPM();

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
        textAreaRef.current.style.color = "black";
      }
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    }
    if (text.length === 1) {
      startTimer();
    }
  };

  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const checkWPM = () => {
    const sampleWords = sampleText.trim().split(/\s+/);
    let typedWords = [];
    let startIndex = 0;

    for (let i = 0; i < sampleWords.length; i++) {
      const wordLength = sampleWords[i].length;
      typedWords.push(text.slice(startIndex, startIndex + wordLength));
      startIndex += wordLength + 1;
    }

    typedWords.forEach((typedWord, i) => {
      let correct = 0;
      const sampleWord = sampleWords[i];
      for (let j = 0; j < sampleWord.length; j++) {
        if (sampleWord.charAt(j) === typedWord.charAt(j)) {
          correct += 1;
        }
      }
      const accuracy = correct / sampleWord.length;
      meanAccuracyRef.current += accuracy;
      totalCorrectWordsRef.current += accuracy >= 0.5 ? 1 : 0.5;
    });

    const meanAccuracy = meanAccuracyRef.current / sampleWords.length;

    if (meanAccuracy >= 0.5) {
      const calculatedWPM = totalCorrectWordsRef.current / (time / 60);
      setWpm(calculatedWPM);
      setValidity('valid');
     
    } else {
      setValidity('invalid test');
    
    }
  };

  const reset = () => {
    setText("");
    setCorrect(0);
    setWrong(0);
    setTime(0);
    setWpm(0);
    meanAccuracyRef.current = 0;
    totalCorrectWordsRef.current = 0;
    setValidity('');
    if (resultRef.current) resultRef.current.style.display = "none";
    if (textAreaRef.current) textAreaRef.current.disabled = false;
  };
  return (
    <div className="p-4">
      <span style={{ color: "blue" }}>{sampleText.slice(0, text.length)}</span>
      <span style={{ color: "yellow" }}>{sampleText.slice(text.length)}</span>
      <label className="block mb-2 text-lg font-semibold">TextArea</label>
      <textarea
        ref={textAreaRef}
        className="w-full h-40 p-2 border rounded resize-none"
        placeholder={sampleText}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        value={text}
      ></textarea>
      Result
      <div
        className="hidden block mb-2 text-lg font-semibold w-full h-40 p-2 border rounded resize-none"
        ref={resultRef}
      >
        correct=<span>{correctCount}</span>
        wrong=<span>{wrongCount}</span>
        wpm=<span>{wpm}</span>
        validity=<span>{validity}</span>
      </div>
      <button onClick={reset}>Take another Test</button>
    </div>
  );
}

export default TextArea;
