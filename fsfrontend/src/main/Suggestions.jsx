import { useEffect,useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loadData } from '../redux/suggestions';
import { loadProfile, } from '../service/profileService';
import { loadConnections } from "../redux/connections";
import { updateData }from "../redux/userProfile";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import profileImage from '../assets/img/merlyn.jpg'
import { Link } from "react-router-dom";
import suggestionsService from '../service/suggestionsService';
import CONST from '../common/constants'; 

const Suggestions = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const suggestions = useSelector((state) => state.suggestions.data);

  useEffect( () => {
    handleLoadProfile();

  }, [])

  const showToast = (message) => {
    toast.current.show(message);
  };

  const handleLoadProfile = async ()=> {
    const result = await loadProfile(userInfo.email);
    console.log(result);
    if(!result){
      showToast({severity:'error', summary: 'Error', detail:'something went wrong...', life: 3000});      
    } else {
      dispatch(updateData(result));
      if(result.gender){
        const result2 = await suggestionsService(userInfo.id,result.gender);
        if(!result2){
          showToast({severity:'error', summary: 'Error', detail:'something went wrong...', life: 3000});      
          dispatch(loadData([]));
        } else {
          dispatch(loadData(result2));
        }
      }
    }
  }

// CONST.SERVER_UL+"/filestorage/manoj.pethe@gmail.com/manojpethe.jpg"

  return (
    <>
    <Toast ref={toast} />
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
          <div style={{textAlign:"center"}}><Button severity="secondary" text >{JSON.parse(item.profile).fullName}<br/> {JSON.parse(item.profile).country}</Button></div>
          </div>
        </Link>
      </div>
      ))}
    </>
  )
}

export default Suggestions