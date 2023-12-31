import { useState, useEffect} from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Toast } from 'primereact/toast';
import { Galleria } from 'primereact/galleria';
// import profileImage from '../assets/img/merlyn.jpg'
import userService from '../service/userService';
import { requestConnection, connectionStatus, approveRequest } from '../service/connectionService';
import CONST from '../common/constants'; 
import { useSelector } from 'react-redux';
import moment from 'moment';

const ViewProfile = (props) => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const params = useParams();
  const navigate = useNavigate();
  const[profile, setProfile] = useState({});
  const[album, setAlbum] = useState([]);
  const[profileId, setProfileId] = useState(0);
  const[isConnected,setIsConnected] = useState(0);
  const[connRecord,setConnRecord] = useState({});
  // null is not connected = show "send Interest" // default hook value is 0
  // 1 is request pending = show "request pending"
  // 2 is request accepted = enable Chat button

  const getProfile =  async (email)=> {
    userService(email).then((response)=>{
      setProfile(response.user.profile);
      setAlbum(response.user.album);
      setProfileId(response.user.id);
      setConnectionStatus(userInfo.id, response.user.id);
    });
  }

  const sendFriendRequest = async ()=> {
    const response = await requestConnection(userInfo.id, profileId);
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
      setConnRecord(response[0]);
      // console.log("Debug approve button:",response[0], profileId,userInfo.id);
    }
  }

  const handleApproveRequest = (requestid, status)=>{
    if( requestid === undefined|| status == undefined ){
      console.error("Error: profile Id or status can not be undefined");
      return false;
    }
    const result = approveRequest(requestid,status)
    .then(()=>{
      setConnectionStatus(userInfo.id,profileId);
    }
    ).catch((e)=> {console.error(e)});
  }
  
  useEffect(() => {
    getProfile(params.id);
  }, [])

  return (
  <>
  <div className="grid" style={{ "width": "100%" }}>
  <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
  <div className="col-12 lg:col-6 md:col-6 sm:col-12">
    <ScrollPanel style={{ width: "100%", height: "vh80", marginLeft:"10px" }}>
      <div style={{textAlign:"start"}}>
      {/* { album[0] !== undefined ?
      <img style={{marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={CONST.SERVER_URL_FILESTORAGE+"/"+album[0]}/>
      : ""} */}
      <PhotoAlbum listOfImages={album} />
      <br/>
      <center>
      { isConnected === 0 ?
      <Button onClick={()=>{ sendFriendRequest() }} icon="pi pi-arrow-up" outlined label=" Send Interest"/>: ""}
      { isConnected === 1 && connRecord.userid === userInfo.id && connRecord.friendid === profileId ?
      <Button severity="danger" icon="pi pi-arrow-up" outlined label=" Request Pending" disabled/> : ""}
      { isConnected === 1 && connRecord.userid === profileId && connRecord.friendid ===  userInfo.id ?
      <Button onClick={()=>{ handleApproveRequest(connRecord.id, connRecord.status) }} icon="pi pi-check" outlined label=" Approve Request" /> : ""}
      &nbsp;
      { isConnected === 2 ? 
      <Button severity="success" onClick={()=>{ navigate("/main/chat/"+profileId); }} icon="pi pi-whatsapp" outlined label="Chat" /> : 
      <Button icon="pi pi-whatsapp" outlined label="Chat" disabled />}
      { isConnected === 3 ? 
      <Button severity="secondary" outlined icon="pi pi-whatsapp" label="Declined" /> : ""}
      </center>
      <br/>
      <div>Name:{profile.fullName} Height: {profile.height}</div>
      <div>Age: { moment(Date.now()).format('YYYY')-moment(profile.birthDate).format('YYYY')}</div>
      <div>Location/City:{profile.location} 
      <br/>Country:{profile.country}
      </div>
      <div><br/>Status:{profile.maritalStatus}</div>
      <div>Mother Tongue:{profile.motherTongue}</div>
      <div>Caste:{profile.caste} Religion:{profile.religion}</div>
      <p/>
      <div>About Me:<br/>{profile.aboutMe}</div><br/>
      <div>Education:<br/>{profile.education}</div><br/>
      <div>Career:<br/>{profile.career}</div><br/>
      <div>Family:<br/>{profile.family}</div><br/>
      <br/>
      </div>
        
      {/* <center>
        <Button severity="secondary" text raised onClick={()=>{ navigate(-1)}}>....back</Button>
      </center> */}
      </ScrollPanel>
      </div>
      </div>
    </>
  )
}


const PhotoAlbum = (props) => {

  let images = [];
  const size = props.listOfImages.length;

  for(let i = 0 ; i < size ; i++ ){
    images.push({
      itemImageSrc: CONST.SERVER_URL_FILESTORAGE+"/"+props.listOfImages[i],
      thumbnailImageSrc: '',
      alt: 'alt text',
      title: 'title text'
    });
  }

  // console.log(images);

  const itemTemplate = (item) => {
      return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  }

  const thumbnailTemplate = (item) => {
      return <img src={item.itemImageSrc} alt={item.alt} style={{ width:'25%', display: 'block' }} />;
  }

  return (
  <>
    <Galleria value={images} thumbnail={thumbnailTemplate} item={itemTemplate} circular style={{ maxWidth: '640px' }} showItemNavigators showThumbnails={false} />
  </>
  )

}

export default ViewProfile