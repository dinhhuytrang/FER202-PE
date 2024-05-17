import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

function Home() {
    const [todo, setTodo] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9999/todo${selectedUser ? `?userId=${selectedUser}` : ''}`)
            .then(res => res.json())
            .then(result => {
                setTodo(result);
            })
            .catch(error => console.error('Error fetching todo:', error));

        fetch(`http://localhost:9999/user`)
            .then(res => res.json())
            .then(result => setUsers(result))
            .catch(error => console.error('Error fetching users:', error));
    }, [selectedUser]);

    const sortByTitle = () => {
        const sortedTodo = [...todo].sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        setTodo(sortedTodo);
    };

    const handleUserClick = (userId) => {
        setSelectedUser(userId === selectedUser ? null : userId);
    };

    const handleStatusChange = (itemId) => {
        const updatedTodo = todo.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    completed: item.completed === 'finished' ? 'unfinished' : 'finished'
                };
            }
            return item;
        });
        setTodo(updatedTodo);
    };

    const handleDepartmentFilter = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedDepartment(value === selectedDepartment ? null : value);
        }
    };



    return (
        <Container>
            <h3 style={{ textAlign: "center" }}>Todo List</h3>
            <Row>
                <Col xs={8}>
                    <div style={{ marginBottom: "10px" }}>
                        Sort: <Button onClick={sortByTitle} variant='primary'>Sort by Title</Button>
                    </div>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>User</th>
                                <th>Completed</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo.filter(item => !selectedDepartment || item.completed === selectedDepartment).map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{users.find(user => user.id == item.userId)?.name}</td>
                                    <td style={{ color: item.completed === 'finished' ? 'green' : 'red' }}>
                                        {item.completed ? "finished" : "unfinished"}
                                    </td>
                                    <td>
                                        <Button variant='success' onClick={() => handleStatusChange(item.id)}>Change</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col xs={4}>
                    <div>
                        <h3>User</h3>
                        <div>
                            {users.map(user => (
                                <div key={user.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={user.id}
                                        id={`product-type-${user.id}`}
                                        onClick={() => handleUserClick(user.id)}
                                        checked={selectedUser === user.id}
                                    />
                                    <label className="form-check-label" htmlFor={`product-type-${user.id}`}>
                                        {user.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h3>Completed</h3>
                    <div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="todoStatus"
                                value="finished"
                                onChange={handleDepartmentFilter}
                                checked={selectedDepartment === "finished"}
                            />
                            <label className="form-check-label" htmlFor="finished">
                                Finished
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="todoStatus"
                                value="unfinished"
                                onChange={handleDepartmentFilter}
                                checked={selectedDepartment === "unfinished"}
                            />
                            <label className="form-check-label" htmlFor="unfinished">
                                Unfinished
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="todoStatus"
                                value="all"
                                onChange={handleDepartmentFilter}
                                checked={!selectedDepartment}
                            />
                            <label className="form-check-label" htmlFor="all">
                                All
                            </label>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default Home;
