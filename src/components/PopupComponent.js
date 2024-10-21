import React from 'react';
import { Popup } from 'react-map-gl';

interface PopupComponentProps {
  feature: any;
  closePopup: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ feature, closePopup }) => {
  return (
    <Popup
      latitude={feature.geometry.coordinates[1]}
      longitude={feature.geometry.coordinates[0]}
      onClose={closePopup}
    >
      <div>
        <h4>{feature.properties.name || 'Details'}</h4>
        <p>Phase: {feature.properties.phase || 'N/A'}</p>
        <p>Temperature: {feature.properties.temperature || 'N/A'}°C</p>
      </div>
    </Popup>
  );
};

export default PopupComponent;
