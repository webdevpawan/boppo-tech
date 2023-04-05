import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from 'axios';
function Register() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        const res = axios.post("http://localhost:5000/api/admin/register", { username: user.username, password: user.password, email: user.email });
        console.log(res);
    }

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    };

    return (
        <Container className="w-50 mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={handleInput} />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" onChange={handleInput} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" onChange={handleInput} />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">Register</Button>
            </Form>
        </Container>
    );
}

export default Register;
