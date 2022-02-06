import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AutContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const {user,dispatch}= useContext(AutContext)
   
    const navigate=  useNavigate();

    const handleLogin = () => {

        const action={
            type:types.logout,
        }

        dispatch(action);

        navigate('/login',{
            replace:true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/dc"
                    >
                        DC
                    </NavLink>
                   <NavLink 
                        activeclassname="active"
                        className="nav-item nav-link" 
                        exact="true"
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">{ user.name }</span>

                    <button 
                        className="nav-item nav-link btn" 
                        onClick={ handleLogin}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}