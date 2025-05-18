// src/components/charts/ChartComponents.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Pie, Doughnut } from 'react-chartjs-2';

// Enregistrement des composants nécessaires
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// 📈 Line Chart
export const LineChartComponent = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  const chartData = {
    labels: data?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Production',
        data: data?.values || [10, 25, 40, 45, 60, 75, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} options={options} />;
};

// 🥧 Pie Chart
export const PieChartComponent = ({ conformes = 60, nonConformes = 40 }) => {
  const chartData = {
    labels: ['Conformes', 'Non conformes'],
    datasets: [
      {
        data: [conformes, nonConformes],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  return <Pie data={chartData} />;
};

// ⚙️ Gauge Chart simulé avec Doughnut
export const GaugeChartComponent = ({ percentage = 75 }) => {
  const chartData = {
    labels: ['Progression', 'Reste'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#2196F3', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: '70%',
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ position: 'relative', width: '200px', height: '100px' }}>
      <Doughnut data={chartData} options={options} />
      <div style={{
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18px',
        fontWeight: 'bold',
      }}>
        {percentage}%
      </div>
    </div>
  );
};


export default ChartComponent;
