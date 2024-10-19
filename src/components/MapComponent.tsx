import React, { useState, useEffect } from 'react';
import MapGL, { NavigationControl, Layer, Source, ViewStateChangeEvent, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
import shp from 'shpjs';
import Sidebar from "../components/Sidebar"; // Import your Sidebar component
import '../App.css';
// API token stored in an environment variable for security
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent: React.FC = () => {
  // Initial state for the map viewport (position, zoom level, etc.)
  const [viewport, setViewport] = useState({
    latitude: 0,      // Default latitude at the equator
    longitude: 0,     // Default longitude at the prime meridian
    zoom: 2,          // Default zoom level (adjust as needed)
    width: '100%',    // Map takes full width
    height: '100vh',  // Map takes the full height of the viewport
  });

  // States to store different data sources (as GeoJSON)
  const [countryData, setCountryData] = useState<any>(null);
  const [foodSecurityData, setFoodSecurityData] = useState<any>(null);
  const [climateData, setClimateData] = useState<any>(null);
  const [hazardsData, setHazardsData] = useState<any>(null);

  // State to store selected feature for popup
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  // Function to load external data (GeoJSON or Shapefiles)
  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const response = await fetch('/assets/data/country_info.json');
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error('Error loading country data:', error);
      }
    };

    const loadFoodSecurityData = async () => {
      try {
        const response = await fetch('/assets/data/food_security_phase_classification.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFoodSecurityData(data);
      } catch (error) {
        console.error('Error loading food security data:', error);
      }
    };

    const loadClimateData = async () => {
      try {
        const response = await fetch('/assets/data/climate_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClimateData(data);
      } catch (error) {
        console.error('Error loading climate data:', error);
      }
    };

    const loadHazardsData = async () => {
      try {
        const response = await fetch('/assets/data/hazards_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHazardsData(data);
      } catch (error) {
        console.error('Error loading hazards data:', error);
      }
    };


    loadCountryData();
    loadFoodSecurityData();
    loadClimateData();
    loadHazardsData();
  }, []);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Sidebar /> {/* Example sidebar for additional controls */}
      <MapGL
        {...viewport} // Destructuring viewport state to apply the map settings
        mapStyle="mapbox://styles/mapbox/streets-v11" // Mapbox street map style
        mapboxAccessToken={MAPBOX_TOKEN} // Mapbox API token
        onMove={(evt: ViewStateChangeEvent) => {
          const { viewState } = evt;
          setViewport((prevViewport) => ({
            ...prevViewport,  // Preserve width and height
            ...viewState,     // Update latitude, longitude, zoom
          }));
        }}
        onClick={(event) => {
          const feature = event.features?.[0]; // Capture clicked feature
          setSelectedFeature(feature);
        }}
        interactiveLayerIds={['country-layer', 'food-security-layer', 'climate-layer', 'hazards-layer']}
      >
        {/* Navigation controls (zoom in/out) */}
        <NavigationControl style={{ right: 10, top: 10 }} />

        {/* Country Information Layer */}
        {countryData && (
          <Source id="country-source" type="json" data={countryData}>
            <Layer
              id="country-layer"
              type="fill"
              paint={{
                'fill-color': '#888888', // Example fill color for countries
                'fill-opacity': 0.5,
              }}
            />
          </Source>
        )}

        {/* Food Security Phase Classification Layer */}
        {foodSecurityData && (
          <Source id="food-security-source" type="json" data={foodSecurityData}>
            <Layer
              id="food-security-layer"
              type="fill"
              paint={{
                'fill-color': ['step', ['get', 'phase'], '#ffffcc', 1, '#ffeda0', 2, '#feb24c', 3, '#f03b20'],
                'fill-opacity': 0.6,
              }}
            />
          </Source>
        )}

        {/* Climate Data Layer */}
        {climateData && (
          <Source id="climate-source" type="json" data={climateData}>
            <Layer
              id="climate-layer"
              type="circle"
              paint={{
                'circle-radius': 5,
                'circle-color': ['interpolate', ['linear'], ['get', 'temperature'], 0, '#2DC4B2', 40, '#F33C24'],
                'circle-opacity': 0.8,
              }}
            />
          </Source>
        )}

        {/* Hazards Data Layer */}
        {hazardsData && (
          <Source id="hazards-source" type="json" data={hazardsData}>
            <Layer
              id="hazards-layer"
              type="symbol"
              layout={{
                'icon-image': 'hazard-15', // Example Mapbox icon for hazards
                'icon-size': 1.5,
              }}
            />
          </Source>
        )}

        {/* Popup for selected feature */}
        {selectedFeature && (
          <Popup
            latitude={selectedFeature.geometry.coordinates[1]}
            longitude={selectedFeature.geometry.coordinates[0]}
            onClose={() => setSelectedFeature(null)}
          >
            <div>
              <h4>{selectedFeature.properties.name || 'Details'}</h4>
              {/* Render additional info from selected feature properties */}
              <p>Phase: {selectedFeature.properties.phase || 'N/A'}</p>
              <p>Temperature: {selectedFeature.properties.temperature || 'N/A'}°C</p>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default MapComponent;
