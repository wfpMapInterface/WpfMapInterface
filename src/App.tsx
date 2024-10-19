import React from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import './App.css'; // Import global styles

// Main App component
const App: React.FC = () => {
  return (
    <div className="app-container">
      {/* Map area */}
      <div className="map-area">
        <MapComponent />
      </div>

      {/* Sidebar area */}
      <Sidebar />
    </div>
  );
};

export default App;
