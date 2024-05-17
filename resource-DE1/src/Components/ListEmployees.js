import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

function ListEmployees() {
    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        // Fetch projects data
        fetch(`http://localhost:9999/employees/?department=${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch customer data');
                }
                return res.json();
            })
            .then(result => {
                console.log(result); // Log dữ liệu trả về để kiểm tra
                setEmployees(result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
        fetch(`http://localhost:9999/departments`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch customer data');
                }
                return res.json();
            })
            .then(result => {
                console.log(result); // Log dữ liệu trả về để kiểm tra
                setDepartments(result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });

    }, []);

  const departmentname = departments.find(data => data.id===id);
    return (
        <div>
            <Container>
                <h2 style={{ textAlign: 'center' }}>List of Employees</h2>
                <Row>
                    <Link to={`/`}>
                        Home page
                    </Link>

                </Row>

                <Row>
                    <Col>
                        <Row>
                            <h4>
                                Department: {departmentname?.name}
                            </h4>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Employees name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    <th>Positon</th>

                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((project) => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.dob}</td>
                                        <td>{project.gender}</td>
                                        <td>{project.position}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ListEmployees
