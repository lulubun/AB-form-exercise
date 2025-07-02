import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketListing from '../Components/TicketPurchasing/TicketListing';
// import userEvent from '@testing-library/user-event';

describe('TicketListing Component', () => {
  let mockOnQuantityChange;
  let mockTicket;

  beforeEach(() => {
    mockOnQuantityChange = jest.fn();
    mockTicket = {
      id: 'vip-1',
      type: 'vip',
      name: 'VIP Experience',
      description: 'Premium concert experience with exclusive perks',
      cost: 15000 // $150.00 in cents
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render ticket information correctly', () => {
      render(
        <TicketListing
          ticket={mockTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={0}
        />
      );

      expect(screen.getByText('VIP EXPERIENCE')).toBeInTheDocument();
      expect(screen.getByText('Premium concert experience with exclusive perks')).toBeInTheDocument();
      expect(screen.getByText('$150')).toBeInTheDocument();
    });

    it('should render quantity input with correct value', () => {
      render(
        <TicketListing
          ticket={mockTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={3}
        />
      );

      const quantityInput = screen.getByDisplayValue('3');
      expect(quantityInput).toBeInTheDocument();
      expect(quantityInput).toHaveAttribute('type', 'number');
      expect(quantityInput).toHaveAttribute('min', '0');
    });

    it('should have proper accessibility attributes', () => {
      render(
        <TicketListing
          ticket={mockTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={2}
        />
      );

      const quantityInput = screen.getByRole('spinbutton');
      expect(quantityInput).toHaveAttribute('aria-label', 'Quantity for VIP Experience');
    });
  });

//   describe('Quantity Changes', () => {
//     it('should call onQuantityChange when quantity is updated', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={mockOnQuantityChange}
//           selectedTickets={0}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.clear(quantityInput);
//       await user.type(quantityInput, '2');

//       expect(mockOnQuantityChange).toHaveBeenCalledWith(
//         'vip',
//         2,
//         300 // (2 - 0) * 150.00
//       );
//     });

//     it('should calculate correct difference when increasing quantity', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={mockOnQuantityChange}
//           selectedTickets={1}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.click(quantityInput);

//       expect(mockOnQuantityChange).toHaveBeenCalledWith(
//         'vip',
//         2,
//         300
//       );
//     });

//     it('should calculate correct negative difference when decreasing quantity', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={mockOnQuantityChange}
//           selectedTickets={3}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.clear(quantityInput);
//       await user.type(quantityInput, '1');

//       expect(mockOnQuantityChange).toHaveBeenCalledWith(
//         'vip',
//         1,
//         -300 // (1 - 3) * 150.00
//       );
//     });

//     it('should handle zero quantity correctly', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={mockOnQuantityChange}
//           selectedTickets={2}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.clear(quantityInput);
//       await user.type(quantityInput, '0');

//       expect(mockOnQuantityChange).toHaveBeenCalledWith(
//         'vip',
//         0,
//         -300 // (0 - 2) * 150.00
//       );
//     });

//     it('should handle invalid input gracefully', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={mockOnQuantityChange}
//           selectedTickets={1}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.clear(quantityInput);
//       await user.type(quantityInput, 'abc');

//       // When parsing fails, parseInt should return NaN
//       // The component should handle this gracefully
//       expect(mockOnQuantityChange).toHaveBeenCalledWith(
//         'vip',
//         NaN,
//         NaN
//       );
//     });
//   });

  describe('Price Display', () => {
    it('should format prices correctly for different amounts', () => {
      const expensiveTicket = {
        ...mockTicket,
        cost: 25050 // $250.50
      };

      render(
        <TicketListing
          ticket={expensiveTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={0}
        />
      );

      expect(screen.getByText('$250.5')).toBeInTheDocument();
    });

    it('should handle whole dollar amounts', () => {
      const wholeTicket = {
        ...mockTicket,
        cost: 10000 // $100.00
      };

      render(
        <TicketListing
          ticket={wholeTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={0}
        />
      );

      expect(screen.getByText('$100')).toBeInTheDocument();
    });

    it('should handle small amounts', () => {
      const cheapTicket = {
        ...mockTicket,
        cost: 50 // $0.50
      };

      render(
        <TicketListing
          ticket={cheapTicket}
          onQuantityChange={mockOnQuantityChange}
          selectedTickets={0}
        />
      );

      expect(screen.getByText('$0.5')).toBeInTheDocument();
    });
  });

//   describe('Conditional Rendering', () => {
//     it('should not call onQuantityChange if callback is not provided', async () => {
//       const user = userEvent.setup();

//       render(
//         <TicketListing
//           ticket={mockTicket}
//           onQuantityChange={null}
//           selectedTickets={0}
//         />
//       );

//       const quantityInput = screen.getByRole('spinbutton');
//       await user.clear(quantityInput);
//       await user.type(quantityInput, '2');

//       // Should not throw an error when callback is null
//       expect(screen.getByDisplayValue('2')).toBeInTheDocument();
//     });
//   });
});
