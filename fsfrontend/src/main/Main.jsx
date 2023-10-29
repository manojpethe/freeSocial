import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import UserMenu from "./UserMenu"
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { useSelector } from 'react-redux'
import axios from 'axios';
import CONST from '../common/constants'; 
// import loadUserInfo from '../service/loadUserInfoService';
import { getConnections } from '../service/connectionService';
import { loadConnections } from '../redux/connections';
// import { loadProfile } from '../service/profileService';

const Main = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  // const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(()=>{
    handleGetConnections();
  },[]) 

  // const handleLoadProfile = async ()=> {
  //   const result = await loadProfile(userInfo.email);
  //   dispatch(loadConnections(result));
  // }

  const handleGetConnections = async ()=> {
    const result = await getConnections(userInfo.id);
    dispatch(updateData(result));
  }

  return (
    <div>
      <div style={{"zIndex":"9999"}} ><UserMenu /></div>
      <Outlet/>
    </div>
  )
}

export default Main