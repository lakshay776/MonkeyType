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

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#ccc' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    },
    y: {
      ticks: { color: '#ccc' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#fff',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#ddd'
    }
  }
};

const Result = () => {
  const Value = useContext(ResultContext);
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartData3, setChartData3] = useState({});

  // Typing Chart
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
          borderColor: 'rgba(34, 197, 94, 1)',
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
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.3
        }
      ]
    });
  }, [Value.resultData]);

  // CPS Chart
  useEffect(() => {
    const cpsKey = "cpsResults";
    const existingData = JSON.parse(localStorage.getItem(cpsKey)) || {};
    const uniqueKey = new Date().toISOString();
    existingData[uniqueKey] = Value.cpsData;
    localStorage.setItem(cpsKey, JSON.stringify(existingData));

    const timestamps = Object.keys(existingData);
    const formattedTimestamps = timestamps.map(t => new Date(t).toLocaleTimeString());
    const clickData = timestamps.map(t => existingData[t].cps);

    setChartData3({
      labels: formattedTimestamps,
      datasets: [
        {
          label: 'Clicks Per Second (CPS)',
          data: clickData,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: true,
          tension: 0.3
        }
      ]
    });
  }, [Value.cpsData]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-lime-400 text-center">Last Test Stats</h2>

      <div className="mb-8 space-y-2 text-center text-base sm:text-lg max-w-lg mx-auto">
        <p>✅ Correct: <span className="text-lime-400">{Value.resultData.correct}</span></p>
        <p>❌ Wrong: <span className="text-red-400">{Value.resultData.wrong}</span></p>
        <p>⌨️ WPM: <span className="text-blue-400">{Value.resultData.wpm.toFixed(2)}</span></p>
        <p>🧪 Validity: <span className="text-yellow-400">{Value.resultData.validity}</span></p>
        <p>🎯 Accuracy: <span className="text-indigo-400">{(Value.resultData.accuracy * 100).toFixed(2)}%</span></p>
        <p>🖱️ CPS: <span className="text-pink-400">{Value.cpsData.cps}</span></p>
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold text-lime-300 mb-6 text-center">
        📈 Progress Charts
      </h3>

      <div className="w-full flex flex-wrap justify-center gap-6">
        {chartData1.labels && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow-lg w-full sm:w-[90%] md:w-[600px] h-[300px] mx-auto">
            <Line data={chartData1} options={commonOptions} />
          </div>
        )}
        {chartData2.labels && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow-lg w-full sm:w-[90%] md:w-[600px] h-[300px] mx-auto">
            <Line data={chartData2} options={commonOptions} />
          </div>
        )}
        {chartData3.labels && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow-lg w-full sm:w-[90%] md:w-[600px] h-[300px] mx-auto">
            <Line data={chartData3} options={commonOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
