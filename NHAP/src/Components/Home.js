import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
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
  const handleDepartmentFilter = (event) => {
    const value = event.target.value;
    if (value === "0") {

      setSelectedDepartment(null);
    } else {

      setSelectedDepartment(value);
    }
  };

  return (
    <Container>
      <h3 style={{ textAlign: "center" }}>List of Project</h3>
      <Row>
        <Col xs={2}>
          <h5>Departments</h5>
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
        <Col xs={9}>
          <br></br>
          <Link to={`/project/add`}>
            <Button style={{marginBottom:"5px"}} variant='success'>Add new projects</Button>
          </Link>
          <br></br>

          <Table striped hover bordered >
            <thead>
              <tr>
                <th>Id</th>
                <th>Project name</th>
                <th>Descrition</th>
                <th>Start date</th>
                <th>Type</th>
                <th>Department</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {
                projects.filter(data => !selectedDepartment || data.department == selectedDepartment).map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.startDate}</td>
                    <td>{data.type}</td>

                    <td>
                      <Link to={`/departments/${data.department}/employees`}>
                        {
                          departments.find((cha) => cha.id == data.department)?.name
                        }
                      </Link>
                    </td>
                    <td>
                      <Link to={`/projects/edit/${data.id}`}>
                        Edit
                      </Link>
                    </td>
                  </tr>

                ))
              }

            </tbody>

          </Table>
        </Col>
      </Row>

    </Container>
  )
}

export default Home
