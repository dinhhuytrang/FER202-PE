import React from 'react';
import Home from './Components/Home';
import ProjectList from './Components/ProjectList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProject from './AddProject';
import AddEmployees from './AddEmployees';
import Employee from './Components/Employee';
import EditProject from './Components/EditProject';
function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
        <Routes>


          <Route path="/projects" element={<ProjectList />} />
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/employees/add" element={<AddEmployees />} />
          <Route path="/project/:id/edit" element={<EditProject />} />
        </Routes>

      </BrowserRouter>



    </>
  )
}

export default App

