import React from 'react';

const LegendComponent: React.FC = () => {
  return (
    <div className="legend">
      <h4>Legend</h4>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#888888' }}></span>
        <span>Country Layer</span>
      </div>
      <div className="legend-item">
        <span className="legend-color" style={{ backgroundColor: '#FF0000' }}></span>
        <span>Food Security Layer</span>
      </div>
      {/* Add more items as needed */}
    </div>
  );
};

export default LegendComponent;
