import { useContext, useEffect, useState } from 'react';
import { ResultContext } from '../assets/context/ResultContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Result = () => {
  const Value = useContext(ResultContext);
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  useEffect(() => {
    const resultKey = "typingResults";
    const existingData = JSON.parse(localStorage.getItem(resultKey)) || {};
    const uniqueKey = new Date().toISOString();
    existingData[uniqueKey] = Value.resultData;
    localStorage.setItem(resultKey, JSON.stringify(existingData));

    const timestamps = Object.keys(existingData);
    const formattedTimestamps = timestamps.map(t => new Date(t).toLocaleTimeString());

    const wpmData = timestamps.map(t => existingData[t].wpm);
    const accuracyData = timestamps.map(t => (existingData[t].accuracy || 0) * 100);

    setChartData1({
      labels: formattedTimestamps,
      datasets: [
        {
          label: 'Words Per Minute (WPM)',
          data: wpmData,
          borderColor: 'rgba(34, 197, 94, 1)', // lime-green
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          fill: true,
          tension: 0.3
        }
      ]
    });
   
    setChartData2({
      labels: formattedTimestamps,
      datasets: [
        {
          label: 'Accuracy (%)',
          data: accuracyData,
          borderColor: 'rgba(59, 130, 246, 1)', // blue
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.3
        }
      ]
    });
  }, [Value.resultData]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-lime-400">Last Test Stats</h2>
      <div className="mb-4">
        <p>✅ Correct: <span className="text-lime-400">{Value.resultData.correct}</span></p>
        <p>❌ Wrong: <span className="text-red-400">{Value.resultData.wrong}</span></p>
        <p>⌨️ WPM: <span className="text-blue-400">{Value.resultData.wpm.toFixed(2)}</span></p>
        <p>🧪 Validity: <span className="text-yellow-400">{Value.resultData.validity}</span></p>
        <p>🎯 Accuracy: <span className="text-indigo-400">{(Value.resultData.accuracy * 100).toFixed(2)}%</span></p>
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-lime-300">📈 Progress Chart</h3>
      {chartData1.labels ? (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
          <Line data={chartData1} />
        </div>
      ) : (
        <p className="text-zinc-400">Loading chart...</p>
      )}
      <br />
      {chartData2.labels ? (
        <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
          <Line data={chartData2} />
        </div>
      ) : (
        <p className="text-zinc-400">Loading chart...</p>
      )}
    </div>
  );
};

export default Result;
