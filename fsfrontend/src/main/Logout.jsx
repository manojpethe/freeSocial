// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userInfo';
import { Button } from "primereact/button"
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google'

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogout = () => {
        googleLogout();
        dispatch(logout());
        navigate("/");
    }

    return (
        <div>
            <div>Please confirmm do you wish to Logout?</div>
            <div><Button onClick={() => { userLogout() }}>Yes</Button></div>

        </div>
    )
}

export default Logout