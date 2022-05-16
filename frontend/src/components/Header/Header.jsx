import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import classes from "./Header.module.css";
import {FaSignOutAlt} from "react-icons/fa";
import { logout,reset } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }

  return (
    <header className={classes.Header}>
        <div className={classes.Logo}>
            <Link to="/">Goals APP</Link>
        </div>
        <ul>
            {
                user ? (
                    <li onClick={onLogout}>
                        <Link to='#' className='d-flex align-items-center'><FaSignOutAlt className='mr-1'/>Logout</Link>
                    </li>
                    ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )

            }
            
            
        </ul>
    </header>
  )
}

export default Header;