import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function ListEmployee() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Fetch projects data
        fetch(`http://localhost:9999/employees/?department=${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEmployees(data);
            });
        fetch(`http://localhost:9999/departments`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDepartments(data);
            });


    }, []);
    
    const department = departments.find((department) => department.id == id);
    return (
        <Container>
            <h3 style={{ textAlign: "center" }}> List of Employees</h3>

            <Row>
                <Link to={`/`}>Homepage</Link>
                <br></br>

                <h5>Departments: {department?.name} </h5>
                <br></br>
            </Row>
            <Row>
                <Col>
                    <Table striped hover bordered >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Employees Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.dob}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.position}</td>
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

export default ListEmployee
