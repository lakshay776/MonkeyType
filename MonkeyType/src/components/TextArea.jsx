import React, { useContext, useEffect, useRef, useState } from "react";
import "../components/TextArea.css";
import { ResultContext } from "../assets/context/ResultContext";

function TextArea() {
  const [time, setTime] = useState(0);
  const sampleText = "this is the sample text";
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const resultRef = useRef(null);
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [validity, setValidity] = useState("");
  const Value = useContext(ResultContext);
  const meanAccuracyRef = useRef(0);
  const totalCorrectWordsRef = useRef(0);
  const [accuracy,setAccuracy]=useState(0)
  const handleChange = (e) => {
    const input = e.target.value;
    const currentIndex = input.length - 1;
    const isMatch = input[currentIndex] === sampleText[currentIndex];

    if (isMatch) correctCountRef.current += 1;
    else wrongCountRef.current += 1;

    setText(input);

    if (textAreaRef.current) {
      textAreaRef.current.style.color = isMatch ? "green" : "red";
    }

    if (input.length === sampleText.length) {
      resultRef.current.style.display = "block";
      textAreaRef.current.disabled = true;
      clearInterval(intervalId);

      checkWPM(input); // ✅ Now handles context update inside
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Backspace") e.preventDefault();
    if (text.length === 1) startTimer();
  };

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => setTime((prev) => prev + 1), 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  async function checkWPM(inputText) {
    const sampleWords = sampleText.trim().split(/\s+/);
    let typedWords = [];
    let startIndex = 0;

    for (let i = 0; i < sampleWords.length; i++) {
      const wordLength = sampleWords[i].length;
      typedWords.push(inputText.slice(startIndex, startIndex + wordLength));
      startIndex += wordLength + 1;
    }

    typedWords.forEach((typedWord, i) => {
      let correct = 0;
      const sampleWord = sampleWords[i];
      for (let j = 0; j < sampleWord.length; j++) {
        if (sampleWord.charAt(j) === typedWord.charAt(j)) correct += 1;
      }
      const accuracy = correct / sampleWord.length;
      meanAccuracyRef.current += accuracy;
      totalCorrectWordsRef.current += accuracy >= 0.5 ? 1 : 0.5;
    });

    const meanAccuracy = meanAccuracyRef.current / sampleWords.length;
    let testWpm = 0;
    let testValidity = "";

    if (meanAccuracy >= 0.5) {
      testWpm = totalCorrectWordsRef.current / (time / 60);
      testValidity = "valid";
    } else {
      testValidity = "invalid test";
    }

    setWpm(testWpm);
    setValidity(testValidity);
    setAccuracy(meanAccuracy)
    // ✅ Correctly send up-to-date data to context
    if(testValidity!="invalid test"){
    Value.setResultData({
      correct: correctCountRef.current,
      wrong: wrongCountRef.current,
      wpm: testWpm,
      validity: testValidity,
      accuracy:meanAccuracy
    });
  }

    // Optionally reset input field
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
      textAreaRef.current.style.color = "black";
    }
  }

  const reset = () => {
    setText("");
    correctCountRef.current = 0;
    wrongCountRef.current = 0;
    setTime(0);
    setWpm(0);
    meanAccuracyRef.current = 0;
    totalCorrectWordsRef.current = 0;
    setValidity("");
    if (resultRef.current) resultRef.current.style.display = "none";
    if (textAreaRef.current) textAreaRef.current.disabled = false;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-zinc-900 text-white font-mono transition-all duration-300">
      <div className="max-w-3xl w-full text-xl mb-4">
        <span className="text-lime-400">{sampleText.slice(0, text.length)}</span>
        <span className="text-zinc-600">{sampleText.slice(text.length)}</span>
      </div>

      <textarea
        ref={textAreaRef}
        className="w-full max-w-3xl h-40 p-4 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none text-white placeholder-zinc-500"
        placeholder={sampleText}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        value={text}
      />

      <div
        ref={resultRef}
        className="mt-6 hidden w-full max-w-3xl p-4 bg-zinc-800 border border-zinc-700 rounded-lg"
      >
        <p>
          ✅ Correct: <span className="text-lime-400">{correctCountRef.current}</span>
        </p>
        <p>
          ❌ Wrong: <span className="text-red-400">{wrongCountRef.current}</span>
        </p>
        <p>
          ⌨️ WPM: <span className="text-blue-400">{wpm.toFixed(2)}</span>
        </p>
        <p>
          🧪 Validity: <span className="text-yellow-400">{validity}</span>
        </p>
        <p>
          📌 Accuracy: <span className="text-yellow-400">{(Math.round(accuracy*100))+"%"}</span>
        </p>
      </div>

      <button
        onClick={reset}
        className="mt-6 px-6 py-2 bg-lime-500 hover:bg-lime-600 text-black rounded-lg shadow-md transition-all"
      >
        🔁 Take Another Test
      </button>
    </div>
  );
}

export default TextArea;
