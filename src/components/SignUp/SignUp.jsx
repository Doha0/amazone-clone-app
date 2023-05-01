import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('')

    const { createUser } = useContext(AuthContext);

    const handelSignUp = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirm.value;
        // console.log(email, password, confirmPass);

        setError('');
        if (password != confirmPass) {
            setError('Your password did not match');
            return;
        }
        else if (password.length < 6) {
            setError('Please enter at least 6 character');
            return;
        }

        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage);
            });

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Sign Up to Ama-zone</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' className="input input-bordered" required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name='confirm' className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button className="custom-button">Sign UP</button>
                        </div>
                        <label className="label">
                            <Link to='/login' className=" label-text-alt link link-hover">Already have an account? Login</Link>
                        </label>
                        <label className="label">
                            <p className="text-red-700">{error} </p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;