// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userInfo';
import { clearSuggestions } from '../redux/suggestions';
import { clearConnections } from '../redux/connections';
import { clearProfile } from '../redux/userProfile';
import { Button } from "primereact/button"
import { useDispatch } from 'react-redux';
import { googleLogout } from '@react-oauth/google'

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogout = () => {
        googleLogout();
        document.cookie="userInfo=";
        dispatch(logout());
        dispatch(clearConnections());
        dispatch(clearSuggestions());
        dispatch(clearProfile());
        navigate("/");
    }

    return (
        <div className='centerDiv'>
            <center>
                <div style={{ "marginBottom": "10px" }} className='text-2xl'>Please confirm, do you wish to Logout?</div>
                <div>
                    <Button label="Yes" severity='danger' onClick={() => { userLogout() }} />&nbsp;
                    <Button label="No" severity='secondary' onClick={() => { navigate("/main/feed") }} /></div>
            </center>
        </div>
    )
}

export default Logout