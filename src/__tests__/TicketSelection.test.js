import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TicketPurchasing from '../Components/TicketPurchasing/TicketPurchasing';

// Mock the TicketListing component
jest.mock('../Components/TicketPurchasing/TicketListing', () => {
  return function MockTicketListing({ ticket, onQuantityChange, selectedTickets }) {
    return (
      <div data-testid={`ticket-${ticket.type}`}>
        <span>{ticket.name}</span>
        <input
          type="number"
          value={selectedTickets}
          onChange={(e) => onQuantityChange(ticket.type, parseInt(e.target.value), 0)}
          data-testid={`quantity-${ticket.type}`}
        />
      </div>
    );
  };
});

describe('TicketPurchasing Component', () => {
  let mockDispatch;
  let mockBand;
  let mockFormData;

  beforeEach(() => {
    mockDispatch = jest.fn();
    
    mockBand = {
      id: 'test-band',
      name: 'Test Band',
      ticketTypes: [
        {
          type: 'vip',
          name: 'VIP',
          description: 'VIP Experience',
          cost: 15000
        },
        {
          type: 'general',
          name: 'General Admission',
          description: 'General tickets',
          cost: 5000
        }
      ]
    };

    mockFormData = {
      ticketSelections: {
        'test-band': {
          vip: 0,
          general: 2
        }
      },
      totalCost: 100.00,
      firstName: '',
      lastName: '',
      address: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      errors: new Set()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the ticket selection form', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByText('Select Tickets')).toBeInTheDocument();
      expect(screen.getByText('Total:')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Credit Card Number')).toBeInTheDocument();
      expect(screen.getByLabelText('Card Expiry Date')).toBeInTheDocument();
      expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    });

    it('should render ticket listings for each ticket type', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByTestId('ticket-vip')).toBeInTheDocument();
      expect(screen.getByTestId('ticket-general')).toBeInTheDocument();
    });
  });

  describe('Form Interactions', () => {
    it('should update form data on input change', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );
      const firstNameInput = screen.getByPlaceholderText('First Name');
      fireEvent.change(firstNameInput, { target: { value: 'John' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_FIELD',
        field: 'firstName',
        value: 'John'
      });
    });

    it('should show error state for invalid fields', () => {
      const errorFormData = {
        ...mockFormData,
        errors: new Set(['firstName', 'cardNumber'])
      };

      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={errorFormData} 
          dispatch={mockDispatch} 
        />
      );

      const firstNameInput = screen.getByLabelText('First Name');
      const cardNumberInput = screen.getByLabelText('Credit Card Number');

      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
      expect(cardNumberInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('should display error messages for invalid fields', () => {
      const errorFormData = {
        ...mockFormData,
        errors: new Set(['firstName'])
      };

      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={errorFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByText('First Name is required.')).toBeInTheDocument();
    });

    it('should handle ticket quantity changes', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      const vipQuantityInput = screen.getByTestId('quantity-vip');
      fireEvent.change(vipQuantityInput, { target: { value: '2' } });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TICKET_SELECTION',
        payload: {
          bandId: 'test-band',
          ticketType: 'vip',
          difference: 0,
          newQuantity: 2
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      const firstNameInput = screen.getByLabelText('First Name');
      expect(firstNameInput).toHaveAttribute('aria-describedby', 'firstNameError');
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('should associate error messages with inputs', () => {
      const errorFormData = {
        ...mockFormData,
        errors: new Set(['firstName'])
      };

      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={errorFormData} 
          dispatch={mockDispatch} 
        />
      );

      const errorMessage = screen.getByText('First Name is required.');
      expect(errorMessage).toHaveAttribute('id', 'firstNameError');
    });
  });

  describe('Input Constraints', () => {
    it('should have proper maxLength attributes', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByLabelText('Credit Card Number')).toHaveAttribute('maxLength', '19');
      expect(screen.getByLabelText('Card Expiry Date')).toHaveAttribute('maxLength', '5');
      expect(screen.getByLabelText('CVV')).toHaveAttribute('maxLength', '4');
    });

    it('should have correct input types', () => {
      render(
        <TicketPurchasing 
          band={mockBand} 
          formData={mockFormData} 
          dispatch={mockDispatch} 
        />
      );

      expect(screen.getByLabelText('Credit Card Number')).toHaveAttribute('type', 'password');
      expect(screen.getByLabelText('CVV')).toHaveAttribute('type', 'password');
      expect(screen.getByLabelText('Card Expiry Date')).toHaveAttribute('type', 'text');
    });
  });
});
