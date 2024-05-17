import { BrowserRouter, Route, Routes } from "react-router-dom";
import Films from "./Components/Films";
import Customer from "./Components/Customer";
import Edit from "./Components/Edit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        
           
            <Route path="/" element={<Films/>} />
            <Route path="/departments/:id/customers" element={<Customer />} />
            <Route path="/projects/edit/:id" element={<Edit />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
