// graphs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const options = {
  animation: {
    duration: 0,
  },
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#000000",
        font: {
          family: "Gilroy",
          weight: "400",
        },
      },
      border: {
        dash: [2, 4],
        color: "#778aa1",
        display: false,
      },
      grid: {
        dash: [2, 4],
        color: "#778aa1",
      },
    },
    x: {
      ticks: {
        color: "#000000",
        font: {
          family: "Gilroy",
          weight: "400",
        },
      },
      border: {
        dash: [2, 4],
        color: "#000000",
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ data }) => {
  return (
    <>
      {/* graphs */}
      <Line options={options} data={data} width={530} height={350} />
    </>
  );
};

export default LineChart;
