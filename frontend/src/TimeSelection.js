import React from "react";

const TimeSelection = ({
  selectedStartDate,
  selectedEndDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  return (
    <div>
      <label>Start Date:</label>
      <input
        type="date"
        value={selectedStartDate}
        onChange={handleStartDateChange}
      />
      <label>End Date:</label>
      <input
        type="date"
        value={selectedEndDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default TimeSelection;
