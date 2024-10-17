import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns'; // För att hantera tidsskala

// Registrera alla komponenter från Chart.js
import {
  CategoryScale,
  LinearScale,
  TimeScale,
  BarController,
  BarElement,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarController,
  BarElement,
  PointElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: 'line', // eller 'bar' beroende på ditt diagram
        data,
        options,
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
