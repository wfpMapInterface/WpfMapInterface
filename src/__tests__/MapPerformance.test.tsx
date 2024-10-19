// src/__tests__/MapPerformance.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import MapComponent from '../components/MapComponent';

describe('MapComponent Performance', () => {
  test('renders within reasonable time', () => {
    const startTime = performance.now();
    render(<MapComponent />);
    const endTime = performance.now();

    // Assert that the map renders within 500ms
    expect(endTime - startTime).toBeLessThan(500);
  });
});
