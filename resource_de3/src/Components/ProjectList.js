import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Home from './Home';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        // Fetch projects data
        fetch('http://localhost:9999/projects')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProjects(data);
            });
        fetch('http://localhost:9999/departments')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setDepartments(data);
            });
    }, []);

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
    };
    const handleDeleteProject = (projectId) => {
        // Hiển thị hộp thoại cảnh báo
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");

        // Nếu người dùng xác nhận muốn xóa
        if (confirmDelete) {
            // Gửi yêu cầu HTTP DELETE để xóa dự án với ID tương ứng
            fetch(`http://localhost:9999/projects/${projectId}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    // Nếu xóa thành công, cập nhật lại danh sách dự án và làm mới trang
                    if (data.success) {
                        setProjects(projects.filter((project) => project.id !== projectId));
                        console.log('Project deleted successfully!');
                        window.location.reload(); // Reload trang
                    } else {
                        console.error('Failed to delete project');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting project:', error);
                });
        }
    };


    return (
        <Container>
            <br></br>
            <h1 className="d-flex justify-content-center">PROJECT LIST</h1>
            <Row>
                <Link to={`/`}>Homepage</Link>
            </Row>
            <Row>
                <Col xs={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Departments
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {departments.map((data) => (
                                <Dropdown.Item
                                    key={data.id}
                                    onClick={() => handleDepartmentSelect(data)}
                                >
                                    {data.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={10}>
                    <br></br>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>Type</th>
                                <th>Department</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.type}</td>
                                    <td>
                                        <Link to={`#`}>
                                            {departments.find((dep) => dep.id === project.department)
                                                ?.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/project/${project.id}/edit`}>Edit</Link>
                                        {' | '}
                                        <button onClick={() => handleDeleteProject(project.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ProjectList;
