import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <nav className="container mx-auto navbar">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost normal-case text-xl">Ama-zone </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><img src={logo} alt="" /></li> */}
                        <li><Link to='/' >Shop</Link></li>
                        <li><Link to='/orders' >Orders</Link></li>
                        <li><Link to='/inventory' >Inventory</Link></li>
                        <li><Link to='/login' >Login</Link></li>
                        <li><Link to='/sign-up' >SignUp</Link></li>

                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;