import { useEffect, useMemo, useReducer } from "react";
import { formReducer, initialFormState } from "./State/FormState";
import { createTicketSelections } from "./utilities/helpers";

import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";
import BandForm from "./Components/BandForm";

function App() {
  const bands = useMemo(() => [skaBand, kpopBand, punkBand], []);
  const [formData, dispatch] = useReducer(formReducer, initialFormState);
  useEffect(() => {
      const initialTicketSelections = createTicketSelections(bands);
      dispatch({ type: 'CREATE_BAND_OBJ', payload: { ticketSelections: initialTicketSelections } });
    }, [bands]);
  return (
    <div className="App">
      <BandForm bands={bands} formData={formData} dispatch={dispatch} />
    </div>
  );
}

export default App;
