import { useEffect } from 'react'
import { Outlet, Link } from "react-router-dom"
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

  const isMobile = ()=>{
    console.log(navigator.userAgent.indexOf("iPhone"));
    console.log(navigator.userAgent.indexOf("Android"));
    const result = ( navigator.userAgent.indexOf("iPhone") || navigator.userAgent.indexOf("Android"));
    if(result === -1){return false}else{ return true};
  }

  const handleGetConnections = async ()=> {
    const result = await getConnections(userInfo.id);
    dispatch(loadConnections(result));
  }

  return (
    <div>
      <div style={{"zIndex":"9999"}} ><UserMenu /></div>
      <Outlet/>
      <div className='floatBottomMenu z-5'>
      {/* <div style={{width: (isMobile() ? "100%": "400px")}}> */}
        <div style={{display:"flex", justifyContent:"space-around", margin:"10px"}}>
          <div><Link to={"/main/feed"}> <img width="30px" src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-line-1/32/-_Home-House--256.png"/></Link></div>
          <div><Link to={"/main/search"}><img width="30px" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-64.png"/></Link></div>
          <div><Link to={"/main/requests"}><img width="30px" src="https://cdn1.iconfinder.com/data/icons/social-productivity-line-art-4/128/ask-question-4-256.png"/></Link></div>
          <div><Link to={"/main/connections"}> <img width="30px" src="https://cdn1.iconfinder.com/data/icons/modern-universal/32/icon-05-256.png"/></Link></div>
        {/* </div> */}
      </div>
      </div>
    </div>
  )
}

export default Main