// import React from 'react'
import { useGoogleLogin} from '@react-oauth/google'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userInfo';


import { Button } from "primereact/button"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleLogin = useGoogleLogin({
      onSuccess: async tokenResponse => {
        // console.log(tokenResponse);
        // fetching userinfo can be done on the client or the server
        const userInfo = await axios
          .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then(res => res.data);
  
        console.log(userInfo);
        dispatch(login(userInfo));
        navigate("/main/feed")
      },
      onError: async(error)=>{
        console.log(error);
      }
    })

    return (
        <div>
            <div>Login/Registration Page</div>
            <div><Button onClick={() => { googleLogin() }}>Login</Button></div>

        </div>
    )
}

export default Login