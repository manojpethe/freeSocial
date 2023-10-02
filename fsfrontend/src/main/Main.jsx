import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import UserMenu from "./UserMenu"
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { useSelector } from 'react-redux'
import axios from 'axios';

const Main = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  // const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("Load Profile for the current user");
    axios.get("http://localhost:3000/users?getUser="+userInfo.email)
    .then(res=>{
      if(!res.data.user.profile){
        dispatch(updateData(emptyProfile));
      } else {
        dispatch(updateData(res.data.user.profile));
      }
    })
    .catch(e=>{console.log("Something went Wrong!",e)})

  },[]) 

  return (
    <div>
      <div style={{"zIndex":"9999"}} ><UserMenu /></div>
      <Outlet/>
    </div>
  )
}

export default Main