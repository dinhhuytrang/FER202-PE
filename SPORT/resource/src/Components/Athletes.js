import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

function Athletes() {
    const [athletes, setAthletes] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        // Fetch projects data
        fetch(`http://localhost:9999/athletes`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAthletes(data);
            });

        

    }, []);

    const handleAddToCart = (athletesId) => {
        // Lấy dữ liệu từ localStorage
        const cartItems = JSON.parse(localStorage.getItem('ath')) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = cartItems.findIndex(item => item.id === athletesId);

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng lên 1
            cartItems[existingProductIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng với số lượng là 1
            const productToAdd = athletes.find(p => p.id === athletesId);
            if (productToAdd) {
                productToAdd.quantity = 1;
                cartItems.push(productToAdd);
            }
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('ath', JSON.stringify(cartItems));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Table striped hover bordered >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Dob</th>
                                <th>Gender</th>
                                <th>Club</th>

                                <th>addtocart</th>
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

                                        <th>
                                            <Link to={`/add/cart`}>
                                                <Button onClick={() => handleAddToCart(data.id)}>Addtocart</Button>
                                            </Link>
                                        </th>
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

export default Athletes
