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


  useEffect(() => {
    getProfile(params.id);
  }, [])

  const getProfile =  async (email)=> {
    const response = await userService(email);
    setProfile(response.user.profile);
    setAlbum(response.user.album);
    setProfileId(response.user.id);
  }

  const sendFriendRequest = async ()=> {
    const response = await requestConnection(userInfo.id, profileId);
    console.log("sendFriendRequest",response);
  }

  const checkConnectionStatus = async () =>{
    const response  = await connectionStatus(userInfo.id, profileId);
    console.log(response);
  }
  
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
      <Button onClick={()=>{ sendFriendRequest() }} icon="pi pi-arrow-up" outlined label=" Send Interest"/> 
      &nbsp;<Button icon="pi pi-whatsapp" outlined label="Chat"/>
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
        <Button onClick={()=>{ checkConnectionStatus()}}>Check Status</Button>
      </center>
      </Panel>
      </div>
    </>
  )
}

export default ViewProfile