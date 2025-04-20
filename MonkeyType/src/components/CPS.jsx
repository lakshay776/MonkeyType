import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResultContext } from "../assets/context/ResultContext";

// Ripple effect component
const TapEffect = ({ x, y }) => (
  <motion.div
    initial={{ opacity: 0.8, scale: 0 }}
    animate={{ opacity: 0, scale: 2 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ top: y, left: x }}
    className="absolute w-16 h-16 bg-lime-400/40 rounded-full pointer-events-none"
  />
);

const CpsTester = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [tapEffects, setTapEffects] = useState([]);
  const Value = useContext(ResultContext);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 32;
    const y = e.clientY - rect.top - 32;

    const id = Date.now();
    setTapEffects((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setTapEffects((prev) => prev.filter((tap) => tap.id !== id));
    }, 500);

    if (!isRunning) setIsRunning(true);
    setClicks((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      Value.setcpsData({ cps: clicks / 5 });
    }
  }, [timeLeft, isRunning, clicks, Value]);

  const reset = () => {
    setClicks(0);
    setTimeLeft(5);
    setIsRunning(false);
    setTapEffects([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-zinc-900 text-white px-4 py-10 relative overflow-hidden font-mono transition-all duration-300">

      {/* 💡 Stylish Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-lime-400 mb-8 drop-shadow-lg text-center">
        ⚡ Click Speed Test
      </h1>

      {/* Click area */}
      <div className="flex-grow flex items-center justify-center w-full">
        <button
          onClick={handleClick}
          disabled={timeLeft === 0}
          className="relative w-full max-w-3xl h-[45vh] bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all duration-300 ease-in-out rounded-3xl shadow-2xl flex items-center justify-center text-2xl sm:text-4xl font-semibold select-none disabled:opacity-50"
        >
          Click or Tap Anywhere
          <AnimatePresence>
            {tapEffects.map(({ id, x, y }) => (
              <TapEffect key={id} x={x} y={y} />
            ))}
          </AnimatePresence>
        </button>
      </div>

      {/* Results Box */}
      <div className="mt-10 w-full max-w-md bg-zinc-800 border border-lime-500/30 rounded-xl shadow-xl p-6 text-center space-y-3 transition-all duration-300">
        <p className="text-gray-300 text-lg">
          🕒 Time Left: <span className="font-bold text-lime-400">{timeLeft}s</span>
        </p>
        <p className="text-gray-300 text-lg">
          🖱️ Clicks: <span className="font-bold text-lime-400">{clicks}</span>
        </p>
        <p className="text-gray-300 text-lg">
          ⚡ CPS:{" "}
          <span className="font-bold text-lime-400">
            {timeLeft === 0 ? (clicks / 5).toFixed(2) : "-"}
          </span>
        </p>

        {timeLeft === 0 && (
          <button
            onClick={reset}
            className="mt-4 bg-lime-400 text-zinc-900 px-6 py-2 rounded-lg shadow-md hover:bg-lime-300 active:scale-95 transition-all font-medium"
          >
            🔄 Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default CpsTester;
