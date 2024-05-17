import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListProject() {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Giá trị của phòng ban đã chọn

  useEffect(() => {
    // Fetch projects data
    fetch('http://localhost:9999/projects')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      });

    // Fetch departments data
    fetch('http://localhost:9999/departments')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDepartments(data);
      });

  }, []);

  // Hàm để xử lý sự kiện khi radio button được chọn
  const handleDepartmentFilter = (event) => {
    const value = event.target.value;
    if (value === "0") {
      // Nếu chọn radio button "All", đặt giá trị selectedDepartment thành null
      setSelectedDepartment(null);
    } else {
      // Nếu chọn một phòng ban cụ thể, đặt giá trị selectedDepartment thành id của phòng ban đó
      setSelectedDepartment(value);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h1 style={{ textAlign: "center" }}>List of Projects</h1>
          <Col xs={3}>
            <h5>Fill</h5>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="0"
                  id="all-checkbox"
                  onChange={handleDepartmentFilter} // Gọi hàm khi radio button được thay đổi
                  checked={!selectedDepartment} // Kiểm tra nếu không có phòng ban nào được chọn
                />
                <label className="form-check-label" htmlFor="all-checkbox">
                  All
                </label>
              </div>
              {departments.map((cha) => (
                <div key={cha.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value={cha.id}
                    id={`product-type-${cha.id}`}
                    onChange={handleDepartmentFilter} // Gọi hàm khi radio button được thay đổi
                    checked={selectedDepartment === cha.id} // Kiểm tra nếu phòng ban được chọn là phòng ban hiện tại
                  />
                  <label className="form-check-label" htmlFor={`product-type-${cha.id}`}>
                    {cha.name}
                  </label>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={8}>
            <Link to={`/projects/add`}>
              <Button style={{ marginBottom: "10px" }} variant="success">Create new Project</Button>{' '}
            </Link>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project name</th>
                  <th>Description</th>
                  <th>Start date</th>
                  <th>Type</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(project => !selectedDepartment || project.department == selectedDepartment).map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.startDate}</td>
                    <td>{project.type}</td>
                    <td>
                      <Link to={`/departments/${project.department}/employees`}>  
                        {departments.find((dept) => dept.id == project.department)?.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListProject;
