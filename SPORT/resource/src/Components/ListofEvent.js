import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function ListofEvent() {
    const [events, setEvents] = useState([]);
    const [sports, setSports] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null); // Giá trị của phòng ban đã chọn

    useEffect(() => {
        // Fetch projects data
        fetch('http://localhost:9999/events')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setEvents(data);
            });

        // Fetch departments data
        fetch('http://localhost:9999/sports')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSports(data);
            });

    }, []);
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
    const searchByPosition = (e) => {
        const keyword = e.target.value.toLowerCase(); // Trim whitespace and convert to lowercase
        

        const filteredEmployees = events.filter(data =>
            data.name.toLowerCase().includes(keyword)
        );

        if (filteredEmployees.length === 0) {
            // If no matches found, display a message
            console.log('Not found.');
            // Or you can set an empty array to clear the list
            // setEmployees([]);
        } else {
            setEvents(filteredEmployees);
        }
    };

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>List of Events</h1>
            <Row>
                <Col xs={3}>
                    <h3>Sports</h3>
                    <div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="0"
                                id="all-checkbox"
                                onChange={handleDepartmentFilter} // Gọi hàm khi radio button được thay đổi
                                checked={!selectedDepartment}

                            />
                            <label className="form-check-label" htmlFor="all-checkbox">
                                All
                            </label>
                        </div>
                        {sports.map((cha) => (
                            <div key={cha.id} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={cha.id}
                                    id={`product-type-${cha.id}`}
                                    onChange={handleDepartmentFilter} // Gọi hàm khi radio button được thay đổi
                                    checked={selectedDepartment === cha.id}

                                />
                                <label className="form-check-label" htmlFor={`product-type-${cha.id}`}>
                                    {cha.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col xs={9}>
                    <div style={{ marginBottom: "10px" }}>
                        <Link to={`/athletes/add`}>
                            <Button variant='success'>Create a new athletes</Button>
                        </Link>

                    </div>

                    <Link to={`athletes`}>
                        Athletes
                    </Link>
                    <br></br>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control onChange={searchByPosition} type="text" placeholder="search here..." />

                        </Form.Group>
                    </Form>

                    <Table striped hover bordered >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name of Events</th>
                                <th>Description</th>
                                <th>StartDate</th>
                                <th>Sport</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                events.filter(data => !selectedDepartment || data.sport == selectedDepartment).map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>{data.startDate}</td>
                                        <td>
                                            <Link to={`/sport/${data.sport}/athletes`}>
                                                {sports.find((sport) => sport.id == data.sport)?.name}
                                            </Link>
                                        </td>
                                        <th>
                                            <Link to={`/edit/${data.id}/events`}>
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                ))
                            }
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan="3">Not found</td>
                                </tr>
                            )}

                        </tbody>

                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ListofEvent
