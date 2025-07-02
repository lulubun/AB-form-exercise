const NAME_REGEX = /^[a-zA-Z\s]+$/;
const ADDRESS_REGEX = /^[\w\s.,#-]+$/;
const CARD_NUMBER_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_REGEX = /^\d{3,4}$/;

export { NAME_REGEX, ADDRESS_REGEX, CARD_NUMBER_REGEX, EXPIRY_REGEX, CVV_REGEX };