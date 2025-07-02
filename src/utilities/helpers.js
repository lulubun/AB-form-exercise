import { NAME_REGEX, ADDRESS_REGEX, CARD_NUMBER_REGEX, EXPIRY_REGEX, CVV_REGEX } from './constants';

const createTicketSelections = (bands) => {
    return bands.reduce((acc, band) => {
        acc[band.id] = {};
        band.ticketTypes.forEach(ticket => {
            acc[band.id][ticket.type] = 0;
        });
        return acc;
    }, {});
};

const checkForErrors = (field, value, currentErrors) => {
    const invalidFields = new Set(currentErrors || []);
    switch (field) {
        case 'address':
            if (!ADDRESS_REGEX.test(value.trim()) || value.trim() === '') {
                return invalidFields.add(field);
            } else if (invalidFields.has(field)) {
                invalidFields.delete(field);
            }
        break;
        case 'cardNumber':
            /**
             * This regex is more simple than I would really want to use but it is simplified for this exercise
             * In reality, I would want to build more security and validation around capturing credit card info
             * but that seems out of scope for now
             */
            if (!CARD_NUMBER_REGEX.test(value.trim())) {
                return invalidFields.add(field);
            } else if (invalidFields.has(field)) {
                invalidFields.delete(field);
            }
        break;
        case 'expiry':
            /**
             * This regex is a simple check for MM/YY format
             * In reality, I would want to check if the date is valid and not in the past
             */
            if (!EXPIRY_REGEX.test(value.trim())) {

                return invalidFields.add(field);
            } else if (invalidFields.has(field)) {
                invalidFields.delete(field);
            }
            break;
        case 'cvv':
            if (!CVV_REGEX.test(value.trim())) {
                return invalidFields.add(field);
            } else if (invalidFields.has(field)) {
                invalidFields.delete(field);
            }
        break;
        default:
            if (value.trim() === '' || !NAME_REGEX.test(value.trim())) {
                invalidFields.add(field);
            } else if (invalidFields.has(field)) {
                invalidFields.delete(field);
            }
    }
    return invalidFields;
};

export { createTicketSelections, checkForErrors };