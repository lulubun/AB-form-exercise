import './TicketPurchasing.css';


function TicketListing({ ticket, onQuantityChange, selectedTickets }) {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        const difference = (newQuantity - selectedTickets) * ticket.cost / 100;
        // Converted to dollars for readability but should it be converted back before submission?
        if (onQuantityChange) {
            onQuantityChange(ticket.type, newQuantity, difference);
        }
    };
    return (
        <div className='ticket-select' key={ticket.id + ticket.name}>
            <div className="ticket-option">
                <div className='ticket-name'>{ticket.name.toUpperCase()}</div>
                <div className='ticket-description'>{ticket.description}</div>
                <div className='ticket-cost'>{`$${ticket.cost / 100}`}</div>
            </div>
            <div className='ticket-quantity'>
                <input
                    id={`quantity-${ticket.type}`}
                    type="number"
                    min="0"
                    aria-label={`Quantity for ${ticket.name}`}
                    onChange={handleQuantityChange}
                    value={selectedTickets}
                />
            </div>
        </div>
    );
};

export default TicketListing;