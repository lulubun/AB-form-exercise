import { checkForErrors } from '../utilities/helpers';

const initialFormState = {
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


const formReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_BAND_OBJ':
            const initialTicketSelections = action.payload.ticketSelections || {};
            return {
                ...state,
                ticketSelections: initialTicketSelections,
            };
        case 'UPDATE_TICKET_SELECTION':
            const { bandId, ticketType, newQuantity, difference } = action.payload;
            const updatedTicketSelections = {
                ...state.ticketSelections,
                [bandId]: {
                    ...state.ticketSelections[bandId],
                    [ticketType]: newQuantity,
                },
            };
            const newTotalCost = state.totalCost + difference;
            return {
                ...state,
                ticketSelections: updatedTicketSelections,
                totalCost: newTotalCost,
            };
        case 'UPDATE_FIELD':
            let newValue = action.value;
            if (action.field === 'expiry' && newValue.length === 4) {
               newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
            }
            const fieldErrors = checkForErrors(action.field, newValue, state.errors);
            return {
                ...state,
                [action.field]: newValue,
                errors: fieldErrors,
            };
        case 'RESET':
            return initialFormState;
        default:
            return state;
    }
}

export { formReducer, initialFormState };
