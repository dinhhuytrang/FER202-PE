import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

function ListAthletes() {
    const [athletes, setAthletes] = useState([]);
    const [sports, setSports] = useState([]);
    // const [selectedDepartment, setSelectedDepartment] = useState(null); // Giá trị của phòng ban đã chọn
    const { id } = useParams();
    useEffect(() => {
        // Fetch projects data
        fetch(`http://localhost:9999/athletes/?sport=${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAthletes(data);
            });

        // Fetch departments data
        fetch('http://localhost:9999/sports')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSports(data);
            });

    }, []);
    const sport= sports.find(sport => sport.id==id);
    return (
        <div>
            <Container>
                <h1 style={{ textAlign: "center" }}>List of Athletes</h1>
                <Link to={`/`}>Homepage</Link>
                <h3>Sports: {sport?.name} </h3>
                <Table striped hover bordered >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Dob</th>
                            <th>Gender</th>
                            <th>Club</th>
                            <th>Nationality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            athletes.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.dob}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.club}</td>
                                    <td>{data.nationality}</td>
                                </tr>
                            ))
                        }


                    </tbody>

                </Table>



            </Container>
        </div>
    )
}

export default ListAthletes
