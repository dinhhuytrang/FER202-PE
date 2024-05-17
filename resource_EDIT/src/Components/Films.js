import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';



function Films() {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    useEffect(() => {
        // Fetch projects data
        fetch('http://localhost:9999/films')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFilms(data);
            });

        // Fetch departments data
        fetch('http://localhost:9999/genres')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGenres(data);
            });

    }, []);

    // Hàm để xử lý sự kiện khi radio button được chọn
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
    return (
        <Container>
            <Row>
                <Col>
                    <h2 style={{ textAlign: "center" }}> List of Films</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <h5>Genres</h5>

                    <div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="0"
                                id="all-checkbox"
                                onChange={handleDepartmentFilter} // Gọi hàm khi radio button được thay đổi
                                checked={!selectedDepartment} // 

                            />
                            <label className="form-check-label" htmlFor="all-checkbox">
                                All
                            </label>
                        </div>
                        {genres.map((cha) => (
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

                    <Table striped hover bordered >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Films name</th>
                                <th>Descriptions</th>
                                <th>Start date</th>
                                <th>Type</th>
                                <th>Genres</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                films.filter(films => !selectedDepartment || films.department == selectedDepartment).map((film) => (
                                    <tr key={film.id}>
                                        <td>{film.id}</td>
                                        <td>{film.name}</td>
                                        <td>{film.description}</td>
                                        <td>{film.startDate}</td>
                                        <td>{film.type}</td>
                                        <td>
                                            <Link to={`/departments/${film.department}/customers`}>
                                                {genres.find((genre) => genre.id == film.department)?.name}
                                            </Link>


                                        </td>
                                        <td>
                                            <Link to={`/projects/edit/${film.id}`}>Edit</Link>

                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Films
