import { formReducer, initialFormState } from '../State/FormState';

describe('FormState Reducer', () => {
  let mockInitialState;

  beforeEach(() => {
    mockInitialState = {
      ticketSelections: {},
      totalCost: 0,
      firstName: '',
      lastName: '',
      address: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      errors: new Set(),
    };
  });

  describe('CREATE_BAND_OBJ action', () => {
    it('should initialize ticket selections', () => {
      const action = {
        type: 'CREATE_BAND_OBJ',
        payload: {
          ticketSelections: {
            'band1': { 'vip': 0, 'general': 0 },
            'band2': { 'premium': 0 }
          }
        }
      };

      const result = formReducer(mockInitialState, action);

      expect(result.ticketSelections).toEqual({
        'band1': { 'vip': 0, 'general': 0 },
        'band2': { 'premium': 0 }
      });
    });

    it('should handle empty payload', () => {
      const action = {
        type: 'CREATE_BAND_OBJ',
        payload: {}
      };

      const result = formReducer(mockInitialState, action);
      expect(result.ticketSelections).toEqual({});
    });
  });

  describe('UPDATE_TICKET_SELECTION action', () => {
    beforeEach(() => {
      mockInitialState.ticketSelections = {
        'band1': { 'vip': 0, 'general': 2 }
      };
      mockInitialState.totalCost = 20.00;
    });

    it('should update ticket quantity and total cost', () => {
      const action = {
        type: 'UPDATE_TICKET_SELECTION',
        payload: {
          bandId: 'band1',
          ticketType: 'vip',
          newQuantity: 3,
          difference: 45.00
        }
      };

      const result = formReducer(mockInitialState, action);

      expect(result.ticketSelections.band1.vip).toBe(3);
      expect(result.totalCost).toBe(65.00);
    });

    it('should handle negative differences (reducing tickets)', () => {
      const action = {
        type: 'UPDATE_TICKET_SELECTION',
        payload: {
          bandId: 'band1',
          ticketType: 'general',
          newQuantity: 1,
          difference: -10.00
        }
      };

      const result = formReducer(mockInitialState, action);

      expect(result.ticketSelections.band1.general).toBe(1);
      expect(result.totalCost).toBe(10.00);
    });

    it('should create new band entry if it doesn\'t exist', () => {
      const action = {
        type: 'UPDATE_TICKET_SELECTION',
        payload: {
          bandId: 'band2',
          ticketType: 'premium',
          newQuantity: 1,
          difference: 25.00
        }
      };

      const result = formReducer(mockInitialState, action);

      expect(result.ticketSelections.band2.premium).toBe(1);
      expect(result.totalCost).toBe(45.00);
    });
  });

  describe('UPDATE_FIELD action', () => {
    it('should update firstName field', () => {
      const action = {
        type: 'UPDATE_FIELD',
        field: 'firstName',
        value: 'John'
      };

      const result = formReducer(mockInitialState, action);
      expect(result.firstName).toBe('John');
    });

    it('should auto-format expiry date', () => {
      const action = {
        type: 'UPDATE_FIELD',
        field: 'expiry',
        value: '1225'
      };

      const result = formReducer(mockInitialState, action);
      expect(result.expiry).toBe('12/25');
    });

    it('should not auto-format short expiry input', () => {
      const action = {
        type: 'UPDATE_FIELD',
        field: 'expiry',
        value: '12'
      };

      const result = formReducer(mockInitialState, action);
      expect(result.expiry).toBe('12');
    });

    it('should update errors based on validation', () => {
      const action = {
        type: 'UPDATE_FIELD',
        field: 'firstName',
        value: ''
      };

      const result = formReducer(mockInitialState, action);
      expect(result.errors.has('firstName')).toBe(true);
    });

    it('should clear errors when field becomes valid', () => {
      mockInitialState.errors = new Set(['firstName']);
      
      const action = {
        type: 'UPDATE_FIELD',
        field: 'firstName',
        value: 'John'
      };

      const result = formReducer(mockInitialState, action);
      expect(result.errors.has('firstName')).toBe(false);
    });
  });

  describe('RESET action', () => {
    it('should reset to initial state', () => {
      const modifiedState = {
        ...mockInitialState,
        firstName: 'John',
        lastName: 'Doe',
        totalCost: 50.00,
        ticketSelections: { 'band1': { 'vip': 2 } },
        errors: new Set(['cardNumber'])
      };

      const action = { type: 'RESET' };
      const result = formReducer(modifiedState, action);

      expect(result).toEqual(initialFormState);
    });
  });

  describe('Unknown action', () => {
    it('should return current state for unknown action', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const result = formReducer(mockInitialState, action);
      expect(result).toBe(mockInitialState);
    });
  });
});
