// import { useDispatch } from 'react-redux';
// import { updateData } from '../redux/suggestions';
import { useSelector } from 'react-redux';
import profileImage from '../assets/img/merlyn.jpg'
import { Link } from "react-router-dom";

const Suggestions = () => {
  const suggestions = useSelector((state) => state.suggestions.data);
  

  return (
    <>
      { suggestions.map(item=>(
      <div key={item.profileId} 
        style={{ 
        overflow:"hidden",
        // backgroundColor:"lightsalmon",
        justifyItems:"center"
         }} className="col-6 lg:col-3 md:col-6">
        <Link to={"../viewprofile/"+item.profileId}>
          <img style={{marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={profileImage}/>
          <div style={{width:"100%", textAlign:"center"}}>{item.profileId} {item.location}</div>
        </Link>
      </div>
      ))}
    </>
  )
}

export default Suggestions