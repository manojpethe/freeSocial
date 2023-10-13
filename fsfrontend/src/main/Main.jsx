import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import UserMenu from "./UserMenu"
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { useSelector } from 'react-redux'
import axios from 'axios';
import CONST from '../common/constants'; 
import loadUserInfo from '../service/loadUserInfoService';
import { getConnections } from '../service/connectionService';
import { loadConnections } from '../redux/connections';

const Main = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  // const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(()=>{
    handleGetConnections();
    // console.log("Load Profile for the current user");
    axios.get(CONST.SERVER_URL+"/users?queryType=getUser&email="+userInfo.email)
    .then(res=>{
      if(!res.data.user.profile){
        dispatch(updateData(emptyProfile));
      } else {
        dispatch(updateData(res.data.user.profile));
      }
    })
    .catch(e=>{console.log("Something went Wrong!",e)})
  },[]) 


  const handleGetConnections = async ()=> {
    const result = await getConnections(userInfo.id);
    dispatch(loadConnections(result));
  }

  return (
    <div>
      <div style={{"zIndex":"9999"}} ><UserMenu /></div>
      <Outlet/>
    </div>
  )
}

export default Main