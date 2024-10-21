import React from 'react';

interface SidebarProps {
  selectedCountry: any;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCountry }) => {
  if (!selectedCountry) {
    return (
      <div className="sidebar">
        <p>Select a country on the map to view details.</p>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h3>Country Information</h3>
      <p><strong>Name:</strong> {selectedCountry.name}</p>
      <p><strong>Population:</strong> {selectedCountry.population || 'Data not available'}</p>
      <p><strong>Food Security Phase:</strong> {selectedCountry.foodSecurityPhase || 'Data not available'}</p>
      <p><strong>Climate Data:</strong> {selectedCountry.climateData || 'Data not available'}</p>
      <p><strong>Hazards:</strong> {selectedCountry.hazards || 'Data not available'}</p>
    </div>
  );
};

export default Sidebar;
