import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [sports, setSports] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:9999/events/${id}`)
            .then(res => res.json())
            .then(result => {
                setName(result.name);
                setDescription(result.description);
                setStartDate(result.startDate);
                setSelectedSport(result.sport);
                console.log(result);
            })
            .catch(error => console.error('Error fetching project:', error));

        fetch("http://localhost:9999/sports")
            .then(res => res.json())
            .then(result => setSports(result))
            .catch(error => console.error('Error fetching departments:', error));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProject = { name, description, startDate, sport:parseInt(selectedSport) };
        if (validProject(updatedProject)) {
            fetch(`http://localhost:9999/events/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedProject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert(`Project updated successfully`);
                        navigate('/');
                    }
                })
                .catch(error => console.error('Error updating project:', error));
        }
    };

    const validProject = ({ name, description, startDate, sport }) => {
        if (!name || !description || !startDate) {
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
            <h1 style={{ textAlign: "center" }}>Edit Project</h1>
            <Row>
                <Row>
                    <Col>
                        <Link to={`/`}>Home page</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Event name</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                            </Form.Group>



                            <Form.Group className="mb-3">
                                <Form.Label>Sport</Form.Label>
                                <Form.Select value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
                                    {sports.map(department => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Button type='submit' variant='primary'>Update</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Edit
