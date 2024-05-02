import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const SourceComparisonGraph = ({ data, columns }) => {
  const [dataPoints, setDataPoints] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newDataPoints = {};

    data.forEach((point) => {
      columns.forEach((col) => {
        if (!newDataPoints[col]) {
          newDataPoints[col] = [];
        }
        newDataPoints[col].push({
          x: point["timestamp-est"],
          y: point[col],
        });
      });
    });

    setDataPoints(newDataPoints);
  }, [data, columns]);

  useEffect(() => {
    const ctx = document.getElementById("sourceChart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    if (Object.keys(dataPoints).length > 0) {
      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: columns.map((col, index) => ({
            label: col,
            data: dataPoints[col],
            borderColor: getColor(index),
            borderWidth: 1,
            fill: false,
          })),
        },
        options: {
          scales: {
            x: {
              stacked: true,
              type: "category",
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: "Energy Source Generation Comparison",
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
  }, [dataPoints, columns]);

  const getColor = (index) => {
    const colors = [
      "red", // Coal
      "blue", // Natural Gas
      "green", // Nuclear
      "orange", // Wind
      "purple", // Solar
      "brown", // Other
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>
        Energy Source Generation Comparison Graph
      </h2>
      <canvas id="sourceChart" style={{ backgroundColor: "white" }}></canvas>
    </div>
  );
};

export default SourceComparisonGraph;
