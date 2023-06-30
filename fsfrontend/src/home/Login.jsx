// import React from 'react'

import { Button } from "primereact/button"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div>Login/Registration Page</div>
            <div><Button onClick={() => { navigate("/main/feed") }}>Login</Button></div>
        </div>
    )
}

export default Login