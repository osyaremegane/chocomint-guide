"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import type { TasteProfile } from "@/lib/microcms";
import { TASTE_LABELS } from "@/lib/microcms";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart(props: TasteProfile) {
  const data = {
    labels: Object.values(TASTE_LABELS),
    datasets: [
      {
        data: [
          props.mint_level,
          props.sweet_level,
          props.aroma_level,
          props.choco_level,
          props.cool_level,
        ],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="max-w-sm mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}
