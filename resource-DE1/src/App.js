import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProject from "./Components/ListProject";
import ListEmployees from "./Components/ListEmployees";
import AddProject from "./Components/AddProject";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProject />} />

          <Route path="/departments/:id/employees" element={<ListEmployees />} />
          <Route path="/projects/add" element={<AddProject />} />
        </Routes>


      </BrowserRouter>
      
    </div>
  );
}

export default App;
