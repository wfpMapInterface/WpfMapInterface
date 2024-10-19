import React, { useState, useEffect } from 'react';
import MapGL, { NavigationControl, Layer, Source, ViewStateChangeEvent, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
import axios from 'axios'; // Import Axios
import Sidebar from '../components/Sidebar'; // Correct Sidebar import

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
    width: '100%',
    height: '100vh',
  });

  const [countryData, setCountryData] = useState<any>(null);
  const [foodSecurityData, setFoodSecurityData] = useState<any>(null);
  const [climateData, setClimateData] = useState<any>(null);
  const [hazardsData, setHazardsData] = useState<any>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const response = await axios.get('/assets/data/country_info.geojson');
        setCountryData(response.data);
      } catch (error) {
        console.error('Error loading country data:', error);
      }
    };

    const loadFoodSecurityData = async () => {
      try {
        const response = await axios.get('/assets/data/food_security_phase_classification.geojson');
        setFoodSecurityData(response.data);
      } catch (error) {
        console.error('Error loading food security data:', error);
      }
    };

    const loadClimateData = async () => {
      try {
        const response = await axios.get('/assets/data/climate_data.geojson');
        setClimateData(response.data);
      } catch (error) {
        console.error('Error loading climate data:', error);
      }
    };

    const loadHazardsData = async () => {
      try {
        const response = await axios.get('/assets/data/hazards_data.geojson');
        setHazardsData(response.data);
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
      <Sidebar />
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt: ViewStateChangeEvent) => setViewport(prev => ({ ...prev, ...evt.viewState }))}
        onClick={(event) => {
          const feature = event.features?.[0];
          setSelectedFeature(feature);
        }}
        interactiveLayerIds={['country-layer', 'food-security-layer', 'climate-layer', 'hazards-layer']}
      >
        <NavigationControl style={{ right: 10, top: 10 }} />

        {/* Country Information Layer */}
        {countryData && (
          <Source id="country-source" type="geojson" data={countryData}>
            <Layer
              id="country-layer"
              type="fill"
              paint={{
                'fill-color': '#888888',
                'fill-opacity': 0.5,
              }}
            />
          </Source>
        )}

        {/* Food Security Phase Classification Layer */}
        {foodSecurityData && (
          <Source id="food-security-source" type="geojson" data={foodSecurityData}>
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
          <Source id="climate-source" type="geojson" data={climateData}>
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
          <Source id="hazards-source" type="geojson" data={hazardsData}>
            <Layer
              id="hazards-layer"
              type="symbol"
              layout={{
                'icon-image': 'hazard-15',
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
