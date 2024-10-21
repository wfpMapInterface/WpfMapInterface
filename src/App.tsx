import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
import './App.css'; // Import global styles
import LoadingSpinner from './components/LoadingSpinner'; // Optional: you can use this spinner for loading states

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner

  const handleCountrySelect = (country: any) => {
    setLoading(true); // Set loading to true when a country is selected
    setSelectedCountry(country); // Update the selected country when clicked
    setLoading(false); // Optionally set loading to false after a delay or data fetching
  };

  return (
    <div className="app-container">
      {/* Map component passing the handler to select country */}
      <MapComponent onCountrySelect={handleCountrySelect} />

      {/* Show loading spinner if loading is true */}
      {loading && <LoadingSpinner />}

      {/* Sidebar area, passing the selectedCountry to Sidebar */}
      {selectedCountry && <Sidebar selectedCountry={selectedCountry} />}
    </div>
  );
};

export default App;
