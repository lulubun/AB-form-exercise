import { useCallback } from "react";
import UserDetails from "./UserDetails";
import TicketListing from "./TicketListing";
import './TicketPurchasing.css';

function TicketPurchasing({ band, formData, dispatch }) {
    const onQuantityChange = useCallback((ticketType, quantity, difference) => {
        dispatch({
            type: 'UPDATE_TICKET_SELECTION',
            payload: { bandId: band.id, ticketType, difference, newQuantity: quantity }
        });
    }, [band.id, dispatch]);


    const { ticketSelections, totalCost } = formData;



    return (
        <div className="ticket-selection">
            <div className="band-form">
                <h1>Select Tickets</h1>
                {band.ticketTypes.map((ticket) => {
                    const selectedTickets = ticketSelections[band.id] && ticketSelections[band.id][ticket.type] ? ticketSelections[band.id][ticket.type] : 0;
                    return (
                        <TicketListing
                            key={`${ticket.type}-key`}
                            ticket={ticket}
                            onQuantityChange={onQuantityChange}
                            selectedTickets={selectedTickets}
                        />
                    );
                })}
                <div className='total-cost'>
                    <p>Total:</p>
                    <p>${totalCost}</p>
                </div>
                <UserDetails dispatch={dispatch} formData={formData} />
            </div>
            <button type='submit' className='submit-button'>Get Tickets</button>
        </div>
    );
}

export default TicketPurchasing;