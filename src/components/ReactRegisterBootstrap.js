import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const ReactRegisterBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    // handling the form
    const handleRgister = event => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // validating password
        if (!/(?=(.*[A-Z]){2,})/.test(password)) {
            setPasswordError('Password should be at least two uppercase');
            return;
        }
        if (!/(?=.*[!£$%&@#])/.test(password)) {
            setPasswordError('Password should be at least one special character');
            return;
        }
        if (password.length > 6) {
            setPasswordError('Password length should be 8 character');
            return;
        }
        setPasswordError('');

        // creating user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                updateUserName(name);
                verifyEmail();
            })
            .catch(e => {
                console.error('The problem is:', e);
                const eMessage = e.message;
                setPasswordError(eMessage);
                setSuccess(false);
            })
    }

    // verifing user email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify.');
            })
    }

    // updating user name
    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    return (
        <div className='w-50 mx-auto mt-2'>
            <h3 className='text-primary'>Register</h3>
            <Form onSubmit={handleRgister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Email" required />
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
                <p><small>Already have an account? Please <Link to='/login'>Log in</Link></small></p>
            </Form>
        </div>
    );
};

export default ReactRegisterBootstrap;