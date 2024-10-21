import React, { useState, useEffect } from 'react';
import MapGL, { NavigationControl, ViewStateChangeEvent } from 'react-map-gl';
import axios from 'axios';
import PopupComponent from './PopupComponent'; // Optional popup
import LoadingSpinner from './LoadingSpinner'; // Fixed the import statement
import Sidebar from './Sidebar';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

interface MapComponentProps {
  onCountrySelect: (country: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onCountrySelect }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
    width: '100%',
    height: '100%',
  });

  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const response = await axios.get('/assets/data/country_info.geojson');
        setCountryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading country data:', error);
        setLoading(false);
      }
    };

    loadCountryData();
  }, []);

  const handleCountryClick = (event: any) => {
    event.preventDefault(); // Prevent default zoom/pan behavior
    const feature = event.features && event.features[0];
    if (feature) {
      const countryProps = feature.properties;
      const countryDetails = {
        name: countryProps.name,
        population: countryProps.population,
        foodSecurityPhase: countryProps.foodSecurityPhase,
        climateData: countryProps.climateData,
        hazards: countryProps.hazards,
      };

      setSelectedCountry(countryDetails); // Update the selected country details
      onCountrySelect(countryDetails); // Pass the selected country details to the parent component (App)
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="map-container">
      {/* Map area (central) */}
      <div className="map-area">
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
          onMove={(evt: ViewStateChangeEvent) => setViewport((prev) => ({ ...prev, ...evt.viewState }))}
          onClick={handleCountryClick}
          interactiveLayerIds={['country-layer']}
        >
          <NavigationControl style={{ right: 10, top: 10 }} />
        </MapGL>
      </div>

      {/* Sidebar for country details */}
      <Sidebar selectedCountry={selectedCountry} />
    </div>
  );
};

export default MapComponent;
