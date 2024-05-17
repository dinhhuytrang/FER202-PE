import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AddEmployees() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(''); // State for gender
    const [position, setPosition] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/departments")
            .then(res => res.json())
            .then(result => setDepartments(result))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {  name, dob, gender, position, department: parseInt(selectedDepartment) };
        if (validEmployee(newEmployee)) {
            fetch("http://localhost:9999/employees", {
                method: "POST",
                body: JSON.stringify(newEmployee),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`Employee created successfully`);
                        navigate('/employees');
                    }
                })
                .catch(error => console.error('Error creating employee:', error));
        }
    };

    const validEmployee = ({  name, dob, gender, position, department }) => {
        if (!name || !dob || !gender || !position || !department) {
            alert("Please enter all required form fields.");
            return false;
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dob)) {
            alert("Date of Birth must be in YYYY-MM-DD format.");
            return false;
        }

        return true;
    };

    // Update gender state based on selected radio button
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center" }}>Add an Employee</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/`}>Home page</Link>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control readOnly  onChange={e => setId(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type='date' onChange={e => setDob(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Position</Form.Label>
                            <Form.Select onChange={e => setPosition(e.target.value)}>
                                <option value="">Select Position</option>
                                <option value='Develop'>Develop</option>
                                <option value='Tester'>Tester</option>
                                <option value='Font-End'>Font-End</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select onChange={e => setSelectedDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Male"
                                    name="gender"
                                    value="Male"
                                    onChange={handleGenderChange} // Handle gender change
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Female"
                                    name="gender"
                                    value="Female"
                                    onChange={handleGenderChange} // Handle gender change
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className='mb-3'>
                            <Button type='submit' variant='primary'>Create</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default AddEmployees;
