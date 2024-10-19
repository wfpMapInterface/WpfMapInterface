// src/__tests__/MapComponent.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import MapComponent from '../components/MapComponent';
import '@testing-library/jest-dom/extend-expect';
import fetch from 'node-fetch';

describe('MapComponent', () => {
  test('renders map with default viewport', () => {
    const { getByRole } = render(<MapComponent />);

    // Check if the map is rendered
    const mapElement = getByRole('application');
    expect(mapElement).toBeInTheDocument();
  });

  test('renders navigation controls', () => {
    const { container } = render(<MapComponent />);

    // Check if the navigation controls are rendered
    const navigationControl = container.querySelector('.mapboxgl-ctrl');
    expect(navigationControl).toBeInTheDocument();
  });
});
