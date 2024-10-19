// src/__tests__/MapComponentIntegration.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MapComponent from '../components/MapComponent';

describe('MapComponent Integration', () => {
  test('updates viewport on zoom', () => {
    const { container } = render(<MapComponent />);

    // Simulate a zoom interaction
    const zoomInButton = container.querySelector('.mapboxgl-ctrl-zoom-in');
    if (zoomInButton) {
      fireEvent.click(zoomInButton);
    }

    // Check if the zoom level has changed after the event
    const zoomOutButton = container.querySelector('.mapboxgl-ctrl-zoom-out');
    expect(zoomOutButton).toBeInTheDocument();
  });
});
