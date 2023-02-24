import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const ReactRegisterBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const handleRgister = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        if (!/(?=(.*[A-Z]){2,})/.test(password)) {
            setPasswordError('Please provide at least two uppercase');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password should be 8 characters');
        }
        if (!/(?=.*[!$£%&#@])/.test(password)) {
            setPasswordError('Please provide a special character');
        }
        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(e => {
                console.error('The problem is:', e);
            })
    }

    return (
        <div className='w-50 mx-auto mt-2'>
            <h3 className='text-warning'>Please Register</h3>
            <Form onSubmit={handleRgister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ReactRegisterBootstrap;