import React, { useState, useEffect } from "react";
import "./App.css";
import LoadMWGraph from "./LoadMWGraph";
import EmissionsGraph from "./EmissionsGraph";
import GenerationGraph from "./GenerationGraph";
import SourceComparisonGraph from "./SourceGraph";
import PricingGraph from "./PricingGraph";
import TimeSelection from "./TimeSelection";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStartTime, setSelectedStartTime] =
    useState("2024-03-02T16:05");
  const [selectedEndTime, setSelectedEndTime] = useState("2024-03-02T18:05");
  const [selectedTab, setSelectedTab] = useState("TimeSelection");

  useEffect(() => {
    fetchData();
  }, [selectedStartTime, selectedEndTime]);

  const fetchData = async () => {
    try {
      const url = "http://127.0.0.1:5000/data/";
      const formattedStartDate = selectedStartTime
        .replace("T", "-")
        .replace(":", "-");
      const formattedEndDate = selectedEndTime
        .replace("T", "-")
        .replace(":", "-");

      const params = {
        start_timestamp: formattedStartDate,
        end_timestamp: formattedEndDate,
      };

      const queryString = Object.keys(params)
        .map((key) => {
          if (Array.isArray(params[key])) {
            return params[key].map((val) => `${key}=${val}`).join("&");
          } else {
            return `${key}=${params[key]}`;
          }
        })
        .join("&");

      const response = await fetch(`${url}?${queryString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="App">
      <div className="side-panel">
        <h2>Navigation</h2>
        <div className="custom-list">
          <div onClick={() => handleTabClick("TimeSelection")}>
            Time Selection
          </div>
          <div onClick={() => handleTabClick("LoadMW")}>Load</div>
          <div onClick={() => handleTabClick("EmissionsIntensity")}>
            Emissions Intensity
          </div>
          <div onClick={() => handleTabClick("EnergyGeneration")}>
            Energy Generation
          </div>
          <div onClick={() => handleTabClick("SourceComparison")}>
            Source Comparison
          </div>
          <div onClick={() => handleTabClick("Pricing")}>Pricing</div>
        </div>
      </div>
      <div className="content">
        <div>
          {selectedTab === "TimeSelection" && (
            <header className="App-header">
              <h1>Grid Statistics Display</h1>
              <TimeSelection
                selectedStartTime={selectedStartTime}
                selectedEndTime={selectedEndTime}
                handleStartTimeChange={(e) =>
                  setSelectedStartTime(e.target.value)
                }
                handleEndTimeChange={(e) => setSelectedEndTime(e.target.value)}
              />
            </header>
          )}

          {selectedTab === "LoadMW" && <LoadMWGraph data={data} />}
          {selectedTab === "EmissionsIntensity" && (
            <EmissionsGraph data={data} />
          )}
          {selectedTab === "EnergyGeneration" && (
            <GenerationGraph
              data={data}
              columns={[
                "coal",
                "natural_gas",
                "nuclear",
                "wind",
                "solar",
                "other",
              ]}
            />
          )}
          {selectedTab === "SourceComparison" && (
            <SourceComparisonGraph
              data={data}
              columns={[
                "coal",
                "natural_gas",
                "nuclear",
                "wind",
                "solar",
                "other",
              ]}
            />
          )}
          {selectedTab === "Pricing" && <PricingGraph data={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
