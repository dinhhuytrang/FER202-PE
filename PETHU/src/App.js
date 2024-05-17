import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ListEmployee from "./Components/ListEmployee";
import EditProject from "./Components/Edit";
import AddProject from "./Components/AddProject";

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Home />} />
          <Route path="/departments/:id/employees" element={<ListEmployee />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/project/add"element={<AddProject />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
