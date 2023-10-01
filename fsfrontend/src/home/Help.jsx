import { useEffect } from 'react';
import profileService from '../service/profileService';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

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


  return (
    <div>
    <div>This is a Help Page</div>
    <Button onClick={uploadProfile}>Update Profile</Button>
    <p/>
    <FileUpload name="fileUploadClient" url={'http://localhost:3000/fileUpload?email=manoj.pethe@gmail.com'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
    </div>
  )
}

export default Help