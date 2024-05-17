import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AddProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [type, setType] = useState('');
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
        const newProject = { name, description, startDate, type, department: parseInt(selectedDepartment) };
        if (validProject(newProject)) {
            fetch("http://localhost:9999/projects", {
                method: "POST",
                body: JSON.stringify(newProject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`Project created successfully`);
                        navigate('/');
                    }
                })
                .catch(error => console.error('Error creating project:', error));
        }
    };

    const validProject = ({ name, description, startDate, type, department }) => {
        if (!name || !description || !startDate || !type || !department) {
            alert("Please enter all required form fields.");
            return false;
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(startDate)) {
            alert("Start date must be in YYYY-MM-DD format.");
            return false;
        }

        return true;
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center" }}>Add a New Project</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/`}>Home page</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project name</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Start date</Form.Label>
                            <Form.Control type='date' onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type='text' onChange={e => setType(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select onChange={e => setSelectedDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Button type='submit' variant='primary'>Create</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProject;
