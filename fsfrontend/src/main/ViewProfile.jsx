import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useNavigate  } from 'react-router-dom'
import { Button } from 'primereact/button';
import profileImage from '../assets/img/merlyn.jpg'

const ViewProfile = (props) => {
  const suggestions = useSelector((state) => state.suggestions.data);
  const userProfile = useSelector((state) => state.userProfile.data);
  const params = useParams();
  const navigate = useNavigate();
  return (
  <>
    <center>
      <div>viewProfile component </div>
      <div>ProfileId: {params.id}</div>
      <img style={{marginLeft:"auto", marginRight:"auto", display:"block"}} height="200px" src={profileImage}/>
      <br/>
      <Button onClick={()=>{ navigate(-1)}}>....more suggestions</Button>
    </center>
    </>
  )
}

export default ViewProfile