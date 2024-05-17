import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListofEvent from "./Components/ListofEvent";
import ListAthletes from "./Components/ListAthletes";
import AddAthletes from "./Components/AddAthletes";
import Athletes from "./Components/Athletes";
import AddtoCard from "./Components/Addtocard.js";
import Edit from "./Components/Edit.js";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<ListofEvent />} />

          <Route path="/sport/:id/athletes" element={<ListAthletes />} />
          <Route path="/edit/:id/events" element={<Edit />} />

          <Route path="/athletes/add" element={<AddAthletes />} />
          <Route path="/athletes" element={<Athletes />} />
          <Route path="/add/cart" element={<AddtoCard />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
