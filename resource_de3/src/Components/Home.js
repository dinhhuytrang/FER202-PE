import React from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <Container>
            <h3 className="d-flex justify-content-center" >Drashboard</h3>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Link to={`/projects`}>
                        <Button style={{ marginRight: "10px" }} variant="primary">Projects</Button>{' '}
                    </Link>
                    <Link to={`/project/add`}>
                        <Button style={{ marginRight: "10px" }} variant="warning">Add Project</Button>{' '}
                    </Link>
                    <Link to={`/employees`}>
                        <Button style={{ marginRight: "10px" }} variant="danger">Employees</Button>{' '}
                    </Link>
                    <Link to={`/employees/add`}>
                        <Button style={{ marginRight: "10px" }} variant="success">Add Employee</Button>{' '}
                    </Link>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default Home
