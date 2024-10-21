import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode; // Define children as a prop of type ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean; // Track if an error has occurred
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Initialize state
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }; // Update state to indicate an error
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>; // Fallback UI
    }

    return this.props.children; // Render children when there’s no error
  }
}

export default ErrorBoundary;
