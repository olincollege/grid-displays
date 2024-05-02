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
            backgroundColor: getColor(index),
            borderColor: getColor(index),
            borderWidth: 1,
            fill: true,
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
                text: "MW",
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
      "rgba(255, 99, 132, 1)", // Red
      "rgba(54, 162, 235, 1)", // Blue
      "rgba(75, 192, 192, 1)", // Green
      "rgba(255, 206, 86, 1)", // Yellow
      "rgba(153, 102, 255, 1)", // Purple
      "rgba(255, 159, 64, 1)", // Orange
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
