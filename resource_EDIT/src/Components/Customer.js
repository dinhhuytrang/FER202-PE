import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function Customer() {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [customers, setCustomers] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Fetch projects data
        fetch(`http://localhost:9999/customers/?department=${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            });

        // Fetch departments data

    }, []);
    return (
        <>
            <Container>
                <Row>
                    <h3 style={{ textAlign: "center" }}>Customer</h3>
                    <Col>
                        <Table striped hover bordered >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Genre</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((data) => (
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

        </>
    )
}

export default Customer
