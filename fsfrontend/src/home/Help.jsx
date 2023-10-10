import { useEffect } from 'react';
import profileService from '../service/profileService';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import CONST from '../common/constants'; 

import axios from 'axios';

const Help = () => {
  const dispatch = useDispatch();

const dummyProfile = {
  "aboutMe": "about me",
  "annualIncome": "1L",
  "birthDate": "1/5/90",
  "career": "my career",
  "caste": "bramhin",
  "education": "education",
  "family": "about family",
  "fullName": "Manoj Pethe",
  "gender": "Male",
  "height": "6",
  "location": "Pune",
  "managedBy": "self",
  "maritalStatus": "Unmarried",
  "motherTongue": "Marathi",
  "religion": ""
}

  // useEffect(() => {
  //   const response = axios.get("http://localhost:3000/users");
  //   response.then((res)=>console.log(res.data));
  // }, [])
  
  const uploadProfile = async () => {
    const result = await profileService('manoj.pethe@gmail.com',dummyProfile);
    console.log(result);
    dispatch(updateData(result));
  }

  const sendMessage = async ()=>{
    const response = await axios.post(CONST.SERVER_URL+"/chat?queryType=newMessage",{fromid:2,toid:4,message:"How are you!"})
    .catch((e)=>{console.error(e)});
    console.log(response);
  }


  return (
    <div>
    <div>This is a Help Page</div>
    <Button onClick={uploadProfile}>Update Profile</Button><p/>
    <Button onClick={sendMessage}> Send Message</Button>
    <p/>
    <FileUpload name="fileUploadClient" url={'http://localhost:3000/fileUpload?email=manoj.pethe@gmail.com'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
    </div>
  )
}

export default Help