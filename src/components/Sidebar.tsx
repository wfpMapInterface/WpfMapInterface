import React from 'react';

// Sidebar component for displaying information
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Country Information</h2>
      {/* This is where detailed data will be shown */}
      <div>
        <strong>Population:</strong> 10M<br/>
        <strong>Food Security:</strong> Phase 2<br/>
        <strong>Climate Data:</strong> 25°C, Moderate Rain
      </div>
    </div>
  );
};

export default Sidebar;
