import React from "react";

function TimeSelection({
  selectedStartTime,
  selectedEndTime,
  handleStartTimeChange,
  handleEndTimeChange,
}) {
  const roundMinutesToNearestFive = (timeString) => {
    const date = new Date(timeString);
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 5) * 5;
    date.setMinutes(roundedMinutes);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutesFormatted = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutesFormatted}`;
  };

  return (
    <div className="time-selection">
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Start Time:</label>
        <input
          type="datetime-local"
          value={roundMinutesToNearestFive(selectedStartTime)}
          onChange={handleStartTimeChange}
          style={{ width: "200px" }}
        />
      </div>
      <div>
        <label style={{ marginRight: "10px" }}>End Time:</label>
        <input
          type="datetime-local"
          value={roundMinutesToNearestFive(selectedEndTime)}
          onChange={handleEndTimeChange}
          style={{ width: "200px" }}
        />
      </div>
    </div>
  );
}

export default TimeSelection;
