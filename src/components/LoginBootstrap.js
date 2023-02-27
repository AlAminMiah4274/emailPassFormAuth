import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
            })
            .catch(e => {
                console.error(e);
            })
    }

    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email');
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Please check your email box');
            })
            .catch(e => {
                console.error(e);
            })
    }

    return (
        <div className='w-50 mx-auto mt-2'>
            <h3 className='text-success'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='Password' required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
                {success && <p className='text-success'>Successfuly log in to the account</p>}
                <p><small>Forgot password? <button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset password</button></small></p>
            </form>
        </div>
    );
};

export default LoginBootstrap;