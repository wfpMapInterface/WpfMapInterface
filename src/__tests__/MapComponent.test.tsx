import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapComponent from './MapComponent';
import Sidebar from './Sidebar';

describe('MapComponent', () => {
  const mockCountry = {
    name: 'Test Country',
    population: 5000000,
    foodSecurityPhase: 'Phase 3',
    climateData: 'Tropical',
    hazards: 'Floods',
  };

  const mockOnCountrySelect = jest.fn();

  test('renders MapComponent and handles country click event', () => {
    render(<MapComponent onCountrySelect={mockOnCountrySelect} />);

    // Simulate map rendering and user interaction
    const map = screen.getByRole('presentation'); // Get the MapGL component

    fireEvent.click(map); // Simulate a click event on the map

    expect(mockOnCountrySelect).toHaveBeenCalled();
  });

  test('displays the sidebar with country data when a country is clicked', () => {
    render(<Sidebar selectedCountry={mockCountry} />);

    // Check if country details are displayed in the sidebar
    expect(screen.getByText(/Test Country/i)).toBeInTheDocument();
    expect(screen.getByText(/5000000/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Tropical/i)).toBeInTheDocument();
    expect(screen.getByText(/Floods/i)).toBeInTheDocument();
  });
});
