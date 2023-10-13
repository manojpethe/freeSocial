import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loadData } from '../redux/suggestions';

import profileImage from '../assets/img/merlyn.jpg'
import { Link } from "react-router-dom";
import suggestionsService from '../service/suggestionsService';
import CONST from '../common/constants'; 

const Suggestions = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.suggestions.data);
  const userProfile = useSelector((state) => state.userProfile.data);

  // console.log(suggestions);

  useEffect( () => {
    getSuggestions();
    // console.log("doing nothing...");  
  }, [])
  
  const getSuggestions = async () =>{
    const result = await suggestionsService(userProfile.gender);
    // console.log(result);
    dispatch(loadData(result));
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
          <img style={{ marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={CONST.SERVER_URL+"/filestorage/"+JSON.parse(item.album)[0]}/>
          <div style={{width:"100%", textAlign:"center"}}>{JSON.parse(item.profile).fullName},{JSON.parse(item.profile).location}</div>
        </Link>
      </div>
      ))}
    </>
  )
}

export default Suggestions