import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const ReactRegisterBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRgister = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        if (!/(?=(.*[A-Z]){2,})/.test(password)) {
            setPasswordError('Password should be at least two uppercase');
        }
        if (!/(?=.*[!£$%&@#])/.test(password)) {
            setPasswordError('Password should be at least one special character');
        }
        if (password.length > 6) {
            setPasswordError('Password length should be 8 character');
        }
        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
            })
            .catch(e => {
                console.error('The problem is:', e);
                const message = e.message;
                setPasswordError(message);
                setSuccess(false);
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
                {success &&
                    <p className='text-success'>User created successfuly</p>
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ReactRegisterBootstrap;