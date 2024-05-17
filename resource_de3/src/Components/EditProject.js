import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';


function EditProject() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [type, setType] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:9999/departments`)
            .then(res => res.json())
            .then(result => setDepartments(result))
            .catch(error => console.error('Error fetching departments:', error));

        fetch(`http://localhost:9999/projects/${id}`)
            .then(res => res.json())
            .then(result => {
                setName(result.name);
                setDescription(result.description);
                setStartDate(result.startDate);
                setType(result.type);
                setSelectedDepartment(result.department);
            })


            .catch(error => console.error('Error fetching departments:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateProject = { name, description, startDate, type, department: parseInt(selectedDepartment) };
        if (validProject(updateProject)) {
            fetch(`http://localhost:9999/projects/${id}`, {
                method: "PUT",
                body: JSON.stringify(updateProject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`Project Update successfully`);
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
                    <h3 style={{ textAlign: "center" }}>Update Project</h3>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Link to={`/`}>Home page</Link>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control readOnly value={id} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Project name</Form.Label>
                            <Form.Control value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={description} as="textarea" rows={3} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Start date</Form.Label>
                            <Form.Control value={startDate} type='date' onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control value={type} type='text' onChange={e => setType(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Form.Select>
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
    )
}

export default EditProject
