import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AddAthletes() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [club, setClub] = useState('');
    const [nationality, setNationality] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [sports, setSports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9999/sports")
            .then(res => res.json())
            .then(result => setSports(result))
            .catch(error => console.error('Error fetching departments:', error));
    }, []);
    useEffect(() => {
        if (!selectedDepartment && sports.length > 0) {
            setSelectedDepartment(sports[0].id);
        }
    }, [sports, selectedDepartment]);
    // đoạn code này để nó lấy giá trị đầu tiên khi người dùng ko nhập chọn mục select


    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = { name, dob, gender, sport: parseInt(selectedDepartment), club, nationality };
        if (validProject(newProject)) {
            fetch("http://localhost:9999/athletes", {
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

    const validProject = ({ name, dob, gender, sport, club, nationality }) => {
        if (!name || !dob || !gender || !sport || !club || !nationality) {
            alert("Please enter all required form fields.");
            return false;
        }

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dob)) {
            alert("Start date must be in YYYY-MM-DD format.");
            return false;
        }

        return true;
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h3 style={{ textAlign: "center" }}>Add new Athletes</h3>
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
                            <Form.Label>Full Name athletes</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type='date' onChange={e => setDob(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <div>
                                <Form.Check inline type="checkbox" label="Male" onChange={e => setGender("Male")} />
                                <Form.Check inline type="checkbox" label="Female" onChange={e => setGender("Female")} />
                            </div>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Sport</Form.Label>
                            <Form.Select onChange={e => setSelectedDepartment(e.target.value)}>
                                {sports.map(data => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Club</Form.Label>
                            <Form.Control type='text' onChange={e => setClub(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type='text' onChange={e => setNationality(e.target.value)} />
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

export default AddAthletes;
