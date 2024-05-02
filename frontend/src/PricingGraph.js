import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const PricingGraph = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newDataPoints = data.map((point) => ({
      x: point["timestamp-est"],
      y: point["LMP"],
    }));

    setDataPoints(newDataPoints);
  }, [data]);

  useEffect(() => {
    const ctx = document.getElementById("pricingChart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    if (dataPoints.length > 0) {
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Market Price Analysis",
              data: dataPoints,
              borderColor: "blue",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "LMP ($/MWh)",
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [dataPoints]);

  return (
    <div>
      <h2 style={{ color: "white" }}>Market Price Analysis Graph</h2>
      <canvas id="pricingChart" style={{ backgroundColor: "white" }}></canvas>
    </div>
  );
};

export default PricingGraph;
