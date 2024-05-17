import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/employees")
            .then(res => res.json())
            .then(result => setEmployees(result))
            .catch(error => console.error('Error fetching employees:', error));

        fetch("http://localhost:9999/departments")
            .then(res => res.json())
            .then(result => setDepartments(result))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const sortByname = () => {
        const sortedEmployees = [...employees].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        setEmployees(sortedEmployees);
    };

    const searchByPosition = (e) => {
        const keyword = e.target.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
        if (!keyword) {
            // If the keyword is empty, reset the employees list
            setEmployees(employees);
            return;
        }

        const filteredEmployees = employees.filter(employee =>
            employee.position.toLowerCase().includes(keyword)
        );

        if (filteredEmployees.length === 0) {
            // If no matches found, display a message
            console.log('Not found.');
            // Or you can set an empty array to clear the list
            // setEmployees([]);
        } else {
            setEmployees(filteredEmployees);
        }
    };


    return (
        <Container>
            <Row>
                <Col xs={3}>
                    <br />
                    <Button variant="primary" onClick={sortByname}>Sort by Name</Button>
                </Col>
                <Col xs={9}>
                    <br />
                    <Form.Control
                        type="text"
                        placeholder="Search here..."
                        onChange={searchByPosition}
                    />
                </Col>
            </Row>
            <br />
            <Col xs={10}>
                <br />
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Position</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.position}</td>
                                <td>
                                    {departments.find((department) => department.id == employee.department)?.name}
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="3">Not found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Container>
    );
}

export default Employee;
