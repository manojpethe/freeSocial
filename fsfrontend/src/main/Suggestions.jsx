import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loadData } from '../redux/suggestions';
import { loadProfile, } from '../service/profileService';
import { loadConnections } from "../redux/connections";
import { updateData }from "../redux/userProfile";
import { Button } from 'primereact/button';

import profileImage from '../assets/img/merlyn.jpg'
import { Link } from "react-router-dom";
import suggestionsService from '../service/suggestionsService';
import CONST from '../common/constants'; 

const Suggestions = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const suggestions = useSelector((state) => state.suggestions.data);

  useEffect( () => {
    handleLoadProfile();

  }, [])

  const handleLoadProfile = async ()=> {
    const result = await loadProfile(userInfo.email);
    dispatch(updateData(result));
    if(result.gender){
      const result2 = await suggestionsService(result.gender);
      dispatch(loadData(result2));
    }
  }

// CONST.SERVER_UL+"/filestorage/manoj.pethe@gmail.com/manojpethe.jpg"

  return (
    <>
      { suggestions.map(item=>(
      <div key={item.id} 
        style={{ 
        overflow:"hidden",
        // backgroundColor:"lightsalmon",
        justifyItems:"center"
         }} className="col-6 lg:col-2 md:col-3">
        <Link to={"../viewprofile/"+item.id}>
          <div>
          <img style={{ marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={CONST.SERVER_URL_FILESTORAGE+"/"+JSON.parse(item.album)[0]}/>
          <div style={{textAlign:"center"}}><Button severity="secondary" text >{JSON.parse(item.profile).fullName}, {JSON.parse(item.profile).location}</Button></div>
          </div>
        </Link>
      </div>
      ))}
    </>
  )
}

export default Suggestions