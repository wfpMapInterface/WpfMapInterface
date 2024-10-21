import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
import './App.css'; // Import global styles
const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country); // Update the selected country when clicked
  };

  return (
    <div className="app-container">
      {/* Map component passing the handler to select country */}
      <MapComponent onCountrySelect={handleCountrySelect} />

      {/* Sidebar area, passing the selectedCountry to Sidebar */}
      {selectedCountry && <Sidebar selectedCountry={selectedCountry} />}
    </div>
  );
};

export default App;
