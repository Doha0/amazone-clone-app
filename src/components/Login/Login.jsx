import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {

    const [show, setShow] = useState(false);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const pathFrom = location.state?.from?.pathname || '/';

    const handelLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                // redirect path navigate
                navigate(pathFrom, { replace: true });

            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Login to Ama-Zone!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelLogin} className="card-body">
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
                            <input type={show ? "text" : "password"} name='password' className="input input-bordered" required />
                        </div>
                        <label className="label">
                            <p className="label-text-alt" onClick={() => setShow(!show)}  >
                                {
                                    show ? <span>Hide Password</span> : <span>Show Password</span>
                                }</p>
                        </label>
                        <div className="form-control mt-6">
                            <button className="custom-button">Login</button>
                        </div>
                        <label className="label">
                            <Link to='/sign-up' className="label-text-alt link link-hover">New to Ama-Zone? Create An Account</Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;