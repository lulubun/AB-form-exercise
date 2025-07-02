import { createTicketSelections, checkForErrors } from '../utilities/helpers';

describe('Utility Functions', () => {
  describe('createTicketSelections', () => {
    it('should create ticket selections object for multiple bands', () => {
      const bands = [
        {
          id: 'band1',
          ticketTypes: [
            { type: 'vip', name: 'VIP', description: 'VIP Experience', cost: 15000 },
            { type: 'general', name: 'General', description: 'General Admission', cost: 8000 }
          ]
        },
        {
          id: 'band2',
          ticketTypes: [
            { type: 'premium', name: 'Premium', description: 'Premium Experience', cost: 20000 }
          ]
        }
      ];

      const result = createTicketSelections(bands);

      expect(result).toEqual({
        band1: {
          vip: 0,
          general: 0
        },
        band2: {
          premium: 0
        }
      });
    });

    it('should handle empty bands array', () => {
      const result = createTicketSelections([]);
      expect(result).toEqual({});
    });

    it('should handle band with no ticket types', () => {
      const bands = [
        {
          id: 'band1',
          ticketTypes: []
        }
      ];

      const result = createTicketSelections(bands);
      expect(result).toEqual({
        band1: {}
      });
    });
  });

  describe('checkForErrors', () => {
    let mockErrors;

    beforeEach(() => {
      mockErrors = new Set();
    });

    describe('firstName and lastName validation', () => {
      it('should add error for empty first name', () => {
        const result = checkForErrors('firstName', '', mockErrors);
        expect(result.has('firstName')).toBe(true);
      });

      it('should remove error for valid first name', () => {
        mockErrors.add('firstName');
        const result = checkForErrors('firstName', 'John', mockErrors);
        expect(result.has('firstName')).toBe(false);
      });

      it('should add error for whitespace-only name', () => {
        const result = checkForErrors('lastName', '   ', mockErrors);
        expect(result.has('lastName')).toBe(true);
      });
    });

    describe('address validation', () => {
      it('should accept valid address format', () => {
        const validAddress = '123 Main Street, New York, NY 10001';
        const result = checkForErrors('address', validAddress, mockErrors);
        expect(result.has('address')).toBe(false);
      });

      it('should reject invalid address format', () => {
        const invalidAddress = '  Invalid Address!@#';
        const result = checkForErrors('address', invalidAddress, mockErrors);
        expect(result.has('address')).toBe(true);
      });

      it('should reject empty address', () => {
        const result = checkForErrors('address', '', mockErrors);
        expect(result.has('address')).toBe(true);
      });
    });

    describe('card number validation', () => {
      it('should accept valid 16-digit card number', () => {
        const validCard = '1234567890123456';
        const result = checkForErrors('cardNumber', validCard, mockErrors);
        expect(result.has('cardNumber')).toBe(false);
      });

      it('should reject card number with wrong length', () => {
        const invalidCard = '123456789012345'; // 15 digits
        const result = checkForErrors('cardNumber', invalidCard, mockErrors);
        expect(result.has('cardNumber')).toBe(true);
      });

      it('should reject card number with letters', () => {
        const invalidCard = '123456789012345a';
        const result = checkForErrors('cardNumber', invalidCard, mockErrors);
        expect(result.has('cardNumber')).toBe(true);
      });
    });

    describe('expiry validation', () => {
      it('should accept valid MM/YY format', () => {
        const validExpiry = '12/25';
        const result = checkForErrors('expiry', validExpiry, mockErrors);
        expect(result.has('expiry')).toBe(false);
      });

      it('should reject invalid month', () => {
        const invalidExpiry = '13/25'; // Month 13 doesn't exist
        const result = checkForErrors('expiry', invalidExpiry, mockErrors);
        expect(result.has('expiry')).toBe(true);
      });

      it('should reject invalid format', () => {
        const invalidExpiry = '1/25'; // Should be 01/25
        const result = checkForErrors('expiry', invalidExpiry, mockErrors);
        expect(result.has('expiry')).toBe(true);
      });
    });

    describe('CVV validation', () => {
      it('should accept 3-digit CVV', () => {
        const validCvv = '123';
        const result = checkForErrors('cvv', validCvv, mockErrors);
        expect(result.has('cvv')).toBe(false);
      });

      it('should accept 4-digit CVV', () => {
        const validCvv = '1234';
        const result = checkForErrors('cvv', validCvv, mockErrors);
        expect(result.has('cvv')).toBe(false);
      });

      it('should reject CVV with letters', () => {
        const invalidCvv = '12a';
        const result = checkForErrors('cvv', invalidCvv, mockErrors);
        expect(result.has('cvv')).toBe(true);
      });

      it('should reject CVV with wrong length', () => {
        const invalidCvv = '12'; // Too short
        const result = checkForErrors('cvv', invalidCvv, mockErrors);
        expect(result.has('cvv')).toBe(true);
      });
    });
  });
});
