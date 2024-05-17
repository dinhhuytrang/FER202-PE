import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

function AddtoCard() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi component được render
        const data = JSON.parse(localStorage.getItem('ath')) || [];
        setCartItems(data);
    }, []);

    const handleClearCart = () => {
        // Xóa tất cả sản phẩm trong giỏ hàng
        localStorage.removeItem('ath');
        setCartItems([]);
    };

    return (
        <Container>
            <Button onClick={handleClearCart} variant="danger" style={{ marginBottom: '10px' }}>
                Clear All Cart
            </Button>
            <Table striped hover bordered >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Dob</th>
                        <th>Gender</th>
                        <th>Club</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.dob}</td>
                            <td>{item.gender}</td>
                            <td>{item.club}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AddtoCard;
