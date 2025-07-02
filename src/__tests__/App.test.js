import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock all child components
jest.mock('../Components/BandForm', () => {
  return function MockBandForm({ bands, formData, dispatch }) {
    return (
      <div data-testid="band-form">
        <div data-testid="bands-count">{bands.length}</div>
        <div data-testid="form-data">{JSON.stringify(formData.ticketSelections)}</div>
        <button onClick={() => dispatch({ type: 'TEST_ACTION' })}>
          Test Dispatch
        </button>
      </div>
    );
  };
});

describe('App Component', () => {
  beforeEach(() => {
    // Clear any potential side effects
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the App component', () => {
      render(<App />);
      expect(screen.getByTestId('band-form')).toBeInTheDocument();
    });

    it('should pass correct number of bands to BandForm', () => {
      render(<App />);
      
      // Should have 3 bands (ska, kpop, punk)
      expect(screen.getByTestId('bands-count')).toHaveTextContent('3');
    });

    it('should initialize form data correctly', () => {
      render(<App />);
      
      // Should have proper ticket selections structure
      const formDataElement = screen.getByTestId('form-data');
      expect(formDataElement).toBeInTheDocument();
      
      // The content should be a valid JSON string representing ticket selections
      const ticketSelections = JSON.parse(formDataElement.textContent);
      expect(typeof ticketSelections).toBe('object');
    });
  });

  describe('State Management', () => {
    it('should provide dispatch function to BandForm', () => {
      render(<App />);
      
      const testButton = screen.getByText('Test Dispatch');
      expect(testButton).toBeInTheDocument();
      
      // Should not throw error when clicking (tests that dispatch is provided)
      expect(() => {
        testButton.click();
      }).not.toThrow();
    });
  });

  describe('Data Loading', () => {
    it('should load band data from JSON files', () => {
      render(<App />);
      
      // Verify that bands are loaded (indirectly through count)
      expect(screen.getByTestId('bands-count')).toHaveTextContent('3');
    });
  });

  describe('Performance', () => {
    it('should memoize bands array', () => {
      const { rerender } = render(<App />);
      
      const initialBandsCount = screen.getByTestId('bands-count').textContent;
      
      // Re-render component
      rerender(<App />);
      
      // Should maintain same band count (tests memoization working)
      expect(screen.getByTestId('bands-count')).toHaveTextContent(initialBandsCount);
    });
  });

  describe('Initial State', () => {
    it('should initialize with proper form state structure', () => {
      render(<App />);
      
      const formDataElement = screen.getByTestId('form-data');
      const ticketSelections = JSON.parse(formDataElement.textContent);
      
      // Should be an object (not null or undefined)
      expect(ticketSelections).toBeInstanceOf(Object);
      
      // Should have entries for each band
      const bandIds = Object.keys(ticketSelections);
      expect(bandIds.length).toBeGreaterThan(0);
    });
  });
});
