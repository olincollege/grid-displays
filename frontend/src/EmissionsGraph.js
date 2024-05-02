import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const EmissionsGraph = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const newDataPoints = data.map((point) => ({
      x: point["timestamp-est"],
      y: point["emissions_intensity"],
    }));

    setDataPoints(newDataPoints);
  }, [data]);

  useEffect(() => {
    const ctx = document.getElementById("emissionsChart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    if (dataPoints.length > 0) {
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Emissions Intensity",
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
                text: "Emissions Intensity (kgCO2e/MWh)",
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
      <h2 style={{ color: "white" }}>Emissions Intensity Graph</h2>
      <canvas id="emissionsChart" style={{ backgroundColor: "white" }}></canvas>
    </div>
  );
};

export default EmissionsGraph;
