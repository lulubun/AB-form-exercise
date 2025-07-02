import { PiCalendarDotsDuotone } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { useState, useMemo, useCallback } from "react";
import BandDescription from "../BandDescription/BandDescription";
import TicketPurchasing from "../TicketPurchasing";
import './BandForm.css';


function BandForm({ bands, formData, dispatch }) {
  const [selectedBand, setBand] = useState(bands[0]);

  const bandMap = useMemo(() => {
    return bands.reduce((map, band) => {
      map[band.id] = band;
      return map;
    }, {});
  }, [bands]);

  const handleBandChange = useCallback((e) => {
    const newBand = bandMap[e.target.value]; // O(1) lookup!
    setBand(newBand);
  }, [bandMap]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.totalCost || formData.totalCost <= 0) {
      alert("Please select at least one ticket to purchase.");
      return;
    };
    if (formData.errors.size > 0
      || !formData.firstName
      || !formData.lastName
      || !formData.address
      || !formData.cardNumber
      || !formData.expiry
      || !formData.cvv
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    };
    /**
     * this is a little ugly but the data would be more complex in a real application
     * this should also be sanitized and encrypted before sending to the server but
     * that is outside the scope of this exercise
     */
    const submitData = formData;
    delete submitData.errors;
    console.log("POST /api/purchaseTickets", submitData);
    alert("Tickets purchased successfully!");
    dispatch({ type: 'RESET' });
  }, [formData, dispatch]);
  return (
    <div className="form-body">
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <form onSubmit={handleSubmit} role="form">
        <label htmlFor="band-choice">Pick a band </label>
        <select id="band-choice" name="band-choice" onChange={handleBandChange}>
          {bands.map((band) => (
            <option key={band.id} value={band.id}>
              {band.name}
            </option>
          ))}
        </select>
        <div className='general-header'>
          <h1>{selectedBand.name}</h1>
          <div className='row-with-icon'>
            <PiCalendarDotsDuotone />
            <p>{new Date(selectedBand.date).toLocaleDateString()}</p>
          </div>
          <div className='row-with-icon'>
            <IoLocationSharp />
            <p>{selectedBand.location}</p>
          </div>
        </div>
        <div className="row">
          <div className="shorter-col">
            <div>
              <BandDescription band={selectedBand} />
            </div>
          </div>
          <div>
            <TicketPurchasing band={selectedBand} formData={formData} dispatch={dispatch} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BandForm;
