import React, { useCallback, useMemo } from 'react';
import { ImCreditCard } from 'react-icons/im';

function UserDetails({ formData, dispatch }) {
    const { firstName, lastName, address, cardNumber, expiry, cvv, errors } = formData;
    const errorHelpers = useMemo(() => ({
        hasErrors: (field) => errors.has(field),
        errorBorderClass: (type) => errors.has(type) ? 'error' : '',
        errorClass: (type) => errors.has(type) ? 'visible-error' : 'hidden-error'
    }), [errors]);
    const manageFormChange = useCallback((field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    }, [dispatch]);

    return (<div className="user-details">
        <div className="names">
            <div className="error-message-wrapper">
                <input
                    id="firstName"
                    type='text'
                    placeholder='First Name'
                    aria-invalid={errors.has('firstName')}
                    aria-describedby="firstNameError"
                    aria-label="First Name"
                    className={`fname-input${errorHelpers.errorBorderClass('firstName')}`}
                    value={firstName}
                    onChange={(e) => manageFormChange('firstName', e.target.value)}
                />
                <span id="firstNameError" className={errorHelpers.errorClass('firstName')}>
                    First Name is required.
                </span>
            </div>
            <div className="error-message-wrapper">
                <input
                    id="lastName"
                    type='text'
                    placeholder='Last Name'
                    aria-invalid={errorHelpers.hasErrors('lastName')}
                    aria-describedby="lastNameError"
                    aria-label="Last Name"
                    className={`lname-input${errorHelpers.errorBorderClass('lastName')}`}
                    value={lastName}
                    onChange={(e) => manageFormChange('lastName', e.target.value)}
                />
                <span id="lastNameError" className={errorHelpers.errorClass('lastName')}>
                    Last Name is required.
                </span>
            </div>
        </div>
        <div className="error-message-wrapper">
            <input
                id="address"
                type='text'
                placeholder='Address'
                aria-label="Address"
                aria-invalid={errorHelpers.hasErrors('address')}
                aria-describedby="addressError"
                className={`address-input${errorHelpers.errorBorderClass('address')}`}
                value={address}
                onChange={(e) => manageFormChange('address', e.target.value)}
            />
            <span id="addressError" className={errorHelpers.errorClass('address')}>
                Address is required.
            </span>
        </div>
        <p>Payment Details</p>
        <div className="error-message-wrapper">
            <div className='card-number-wrapper'>
                <input
                    id="cardNumber"
                    type='password'
                    maxLength={19}
                    aria-label="Credit Card Number"
                    aria-invalid={errorHelpers.hasErrors('cardNumber')}
                    aria-describedby="creditCardNumberError"
                    placeholder='0000 0000 0000 0000'
                    className={`card-number-input${errorHelpers.errorBorderClass('cardNumber')}`}
                    value={cardNumber}
                    onChange={(e) => manageFormChange('cardNumber', e.target.value)}
                />
                <ImCreditCard className='card-icon' />
            </div>
            <span id="creditCardNumberError" className={errorHelpers.errorClass('cardNumber')}>
                Credit Card Number is required.
            </span>
        </div>
        <div className="card-details">
            <div className="error-message-wrapper">

                <input
                    id="expiry"
                    type='text'
                    maxLength={5}
                    aria-label="Card Expiry Date"
                    aria-invalid={errorHelpers.hasErrors('expiry')}
                    aria-describedby="expiryError"
                    placeholder='MM/YY'
                    className={`expiry-input${errorHelpers.errorBorderClass('expiry')}`}
                    value={expiry}
                    onChange={(e) => manageFormChange('expiry', e.target.value)}
                />
                <span id="expiryError" className={errorHelpers.errorClass('expiry')}>
                    Expiry Date is required.
                </span>
            </div>
            <div className="error-message-wrapper">
                <input
                    id="cvv"
                    type='password'
                    maxLength={4}
                    aria-label="CVV"
                    aria-invalid={errorHelpers.hasErrors('cvv')}
                    aria-describedby="cvvError"
                    placeholder='CVV'
                    className={`cvv-input${errorHelpers.errorBorderClass('cvv')}`}
                    value={cvv}
                    onChange={(e) => manageFormChange('cvv', e.target.value)}
                />
                <span id="cvvError" className={errorHelpers.errorClass('cvv')}>
                    CVV is required.
                </span>
            </div>
        </div>
    </div>)
}

export default UserDetails;