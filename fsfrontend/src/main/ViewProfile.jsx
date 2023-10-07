import { useState, useEffect} from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
// import profileImage from '../assets/img/merlyn.jpg'
import userService from '../service/userService';
import { requestConnection, connectionStatus } from '../service/connectionService';
import CONST from '../common/constants'; 
import { useSelector } from 'react-redux';

const ViewProfile = (props) => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const params = useParams();
  const navigate = useNavigate();
  const[profile, setProfile] = useState({});
  const[album, setAlbum] = useState([]);
  const[profileId, setProfileId] = useState(0);
  const[isConnected,setIsConnected] = useState(0);
  // null is not connected = show "send Interest" // default hook value is 0
  // 1 is request pending = show "request pending"
  // 2 is request accepted = enable Chat button

  const getProfile =  async (email)=> {
    userService(email).then((response)=>{
      console.log(response);
      setProfile(response.user.profile);
      setAlbum(response.user.album);
      setProfileId(response.user.id);
      setConnectionStatus(userInfo.id, response.user.id);
    });
  }

  const sendFriendRequest = async ()=> {
    const response = await requestConnection(userInfo.id, profileId);
    console.log("sendFriendRequest",response);
    setConnectionStatus(userInfo.id,profileId);
  }

  const setConnectionStatus = async (fromId,toId) =>{
    if(fromId == 0 || toId === 0 || fromId == undefined || toId === undefined){
      console.error("Error: profile Id can not be 0 or undefined");
      return false;
    }
    const response  = await connectionStatus(fromId,toId);
    if (response.length > 0 ){
      setIsConnected(response[0].status);
    }
  }
  
  useEffect(() => {
    getProfile(params.id);
  }, [])

  return (
  <>
    <div className="col-12 lg:col-6 md:col-6">
    <Panel>
      <div style={{textAlign:"start"}}>
      { album[0] !== undefined ?
      <img style={{marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={CONST.SERVER_URL+"/filestorage/"+album[0]}/>
      : ""}
      <br/>
      <center>
      { isConnected === 0 ?
      <Button onClick={()=>{ sendFriendRequest() }} icon="pi pi-arrow-up" outlined label=" Send Interest"/>: ""}
      { isConnected === 1 ?
      <Button icon="pi pi-arrow-up" outlined label=" Request Pending" disabled/> : ""}
      &nbsp;
      { isConnected === 2 ? <Button icon="pi pi-whatsapp" outlined label="Chat" /> : 
      <Button icon="pi pi-whatsapp" outlined label="Chat" disabled />}
      </center>
      <br/>
      <div>Name:{profile.fullName} Height: {profile.height}</div>
      <div>Location:{profile.location} Age: {profile.birthDate}</div><br/>
      <div>Status:{profile.maritalStatus}</div>
      <div>Mother Tongue:{profile.motherTongue}</div>
      <div>Caste:{profile.caste} Religion:{profile.religion}</div>
      <p/>
      <div>About Me:<br/>{profile.aboutMe}</div><br/>
      <div>Education:<br/>{profile.education}</div><br/>
      <div>Career:<br/>{profile.career}</div><br/>
      <div>Family:<br/>{profile.family}</div><br/>
      <br/>
      </div>
      <center>
        <Button severity="secondary" text raised onClick={()=>{ navigate(-1)}}>....back</Button>
        {/* <Button onClick={()=>{ setConnectionStatus()}}>Check Status</Button> */}
      </center>
      </Panel>
      </div>
    </>
  )
}

export default ViewProfile