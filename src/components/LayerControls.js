import React from 'react';

interface LayerControlsProps {
  visibleLayers: { [key: string]: boolean };
  toggleLayer: (layerId: string) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({ visibleLayers, toggleLayer }) => {
  return (
    <div className="layer-controls">
      <h4>Toggle Layers</h4>
      {Object.keys(visibleLayers).map((layerId) => (
        <div key={layerId}>
          <input
            type="checkbox"
            checked={visibleLayers[layerId]}
            onChange={() => toggleLayer(layerId)}
          />
          <label>{layerId}</label>
        </div>
      ))}
    </div>
  );
};

export default LayerControls;
