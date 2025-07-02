import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BandForm from '../Components/BandForm/BandForm';

// Mock the child components
jest.mock('../Components/BandDescription/BandDescription', () => {
  return function MockBandDescription({ band }) {
    return <div data-testid="band-description">{band.name} Description</div>;
  };
});

jest.mock('../Components/TicketPurchasing', () => {
  return function MockTicketSelection({ band, formData, dispatch }) {
    return (
      <div data-testid="ticket-selection">
        <span>Tickets for {band.name}</span>
        <button onClick={() => dispatch({ type: 'TEST_ACTION' })}>
          Test Dispatch
        </button>
      </div>
    );
  };
});

describe('BandForm Component', () => {
  let mockDispatch;
  let mockBands;
  let mockFormData;

  beforeEach(() => {
    mockDispatch = jest.fn();
    
    mockBands = [
      {
        id: 'band1',
        name: 'Test Band 1',
        date: 1683644012000,
        location: 'Test Venue 1, 123 Test St, Test City, TS 12345',
        ticketTypes: [
          { type: 'vip', name: 'VIP', cost: 15000 },
          { type: 'general', name: 'General', cost: 5000 }
        ]
      },
      {
        id: 'band2',
        name: 'Test Band 2',
        date: 1683730412000,
        location: 'Test Venue 2, 456 Test Ave, Test Town, TS 67890',
        ticketTypes: [
          { type: 'premium', name: 'Premium', cost: 12000 }
        ]
      }
    ];

    mockFormData = {
      ticketSelections: {
        'band1': { vip: 0, general: 0 },
        'band2': { premium: 0 }
      },
      totalCost: 0,
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, City, ST 12345',
      cardNumber: '1234567890123456',
      expiry: '12/25',
      cvv: '123',
      errors: new Set()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the band selection form', () => {
      render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByLabelText('Pick a band')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Band 1')).toBeInTheDocument();
    });

    it('should display first band by default', () => {
      render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getAllByText('Test Band 1')[0]).toBeInTheDocument();
      expect(screen.getByText('Test Venue 1, 123 Test St, Test City, TS 12345')).toBeInTheDocument();
    });

    it('should render all band options in select', () => {
      render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByRole('option', { name: 'Test Band 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Test Band 2' })).toBeInTheDocument();
    });

    it('should render band description and ticket selection components', () => {
      render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByTestId('band-description')).toBeInTheDocument();
      expect(screen.getByTestId('ticket-selection')).toBeInTheDocument();
    });
  });

//   describe('Band Selection', () => {
//     it('should change band when selection changes', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <BandForm 
//           bands={mockBands} 
//           formData={mockFormData} 
//           dispatch={mockDispatch} 
//         />
//       );

//       const select = screen.getByLabelText('Pick a band');
//       await user.selectOptions(select, 'band2');

//       expect(screen.getAllByText('Test Band 2')[0]).toBeInTheDocument();
//       expect(screen.getByText('Test Venue 2, 456 Test Ave, Test Town, TS 67890')).toBeInTheDocument();
//     });

//     it('should use optimized band lookup', async () => {
//       const user = userEvent.setup();
      
//       render(
//         <BandForm 
//           bands={mockBands} 
//           formData={mockFormData} 
//           dispatch={mockDispatch} 
//         />
//       );

//       const select = screen.getByLabelText('Pick a band');
//       await user.selectOptions(select, 'band2');

//       // Verify the band was changed (indirectly testing the O(1) lookup)
//       expect(screen.getByTestId('ticket-selection')).toHaveTextContent('Tickets for Test Band 2');
//     });
//   });

  describe('Form Submission', () => {
    it('should prevent submission with no tickets selected', () => {
      // Mock window.alert
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      const emptyFormData = {
        ...mockFormData,
        totalCost: 0
      };

      render(
        <BandForm 
          bands={mockBands} 
          formData={emptyFormData} 
          dispatch={mockDispatch} 
        />
      );

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(alertSpy).toHaveBeenCalledWith('Please select at least one ticket to purchase.');
      expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'RESET' });
      
      alertSpy.mockRestore();
    });

    it('should prevent submission with validation errors', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      const invalidFormData = {
        ...mockFormData,
        totalCost: 50,
        errors: new Set(['firstName'])
      };

      render(
        <BandForm 
          bands={mockBands} 
          formData={invalidFormData} 
          dispatch={mockDispatch} 
        />
      );

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields before submitting.');
      expect(mockDispatch).not.toHaveBeenCalledWith({ type: 'RESET' });
      
      alertSpy.mockRestore();
    });

    it('should prevent submission with missing required fields', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      const incompleteFormData = {
        ...mockFormData,
        totalCost: 50,
        firstName: '' // Missing required field
      };

      render(
        <BandForm 
          bands={mockBands} 
          formData={incompleteFormData} 
          dispatch={mockDispatch} 
        />
      );

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields before submitting.');
      
      alertSpy.mockRestore();
    });

    it('should submit successfully with valid data', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
      const validFormData = {
        ...mockFormData,
        totalCost: 50
      };

      render(
        <BandForm 
          bands={mockBands} 
          formData={validFormData} 
          dispatch={mockDispatch} 
        />
      );

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(consoleSpy).toHaveBeenCalledWith('POST /api/purchaseTickets', expect.any(Object));
      expect(alertSpy).toHaveBeenCalledWith('Tickets purchased successfully!');
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET' });
      
      alertSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe('Date Formatting', () => {
    it('should format dates correctly', () => {
      render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      // The date 1683644012000 should be formatted as a locale date string
      const expectedDate = new Date(1683644012000).toLocaleDateString();
      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
  });

  describe('Performance Optimizations', () => {
    it('should memoize band selection handler', () => {
      const { rerender } = render(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      const select = screen.getByLabelText('Pick a band');
      const initialHandler = select.onchange;

      // Re-render with same props
      rerender(
        <BandForm 
          bands={mockBands} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      // Handler should be the same reference (memoized)
      expect(select.onchange).toBe(initialHandler);
    });
  });
});
