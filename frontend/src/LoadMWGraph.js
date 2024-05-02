// LoadMWGraph.js
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const LoadMWGraph = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newDataPoints = data.map((point) => ({
      x: point["timestamp-est"],
      y: point["load-mw"],
    }));

    setDataPoints(newDataPoints);
  }, [data]);

  useEffect(() => {
    const ctx = document.getElementById("loadChart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    if (dataPoints.length > 0) {
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Load MW",
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
                text: "Load MW",
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
      <h2 style={{ color: "white" }}>Load MW Graph</h2>
      <canvas id="loadChart" style={{ backgroundColor: "white" }}></canvas>
    </div>
  );
};

export default LoadMWGraph;
