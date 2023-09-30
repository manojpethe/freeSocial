import { useEffect, useState } from 'react'
import { Panel } from 'primereact/panel';
// import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/userProfile';
import { useSelector } from 'react-redux'
import axios from 'axios';
import profileService from '../service/profileService';

// let basicInfo = { fullName: "Manoj Pethe", height: "6.4", relgion: "Hindu", motherTongue: "marathi", caste: "Bramhin", annualIncome: "", city: "Pune", state: "Maharashtra", country: "India", profileManager: "Manoj Pethe" };

const emptyProfile = {
  fullName: "",
  gender:"",
  religion:"",
  motherTongue:"",
  height:"",
  annualIncome:"",
  location:"",
  caste:"",
  managedBy:"",
  criticalInfo:{
    maritalStatus: "",
    birthDate: ""
  },
  aboutMe:"",
  family:"",
  education:"",
  career:""
};


const getDatemmddyyyy =(inputdate)=> {
  return (inputdate.getMonth()+1)+"/"+inputdate.getDate()+"/"+inputdate.getYear() ;
}

const GenderOptions = (props) => {
  const gender = props.gender;
  const setGender = props.setGender;
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="flex align-items-center">
          <RadioButton inputId="gender1" name="gender" value="Femle" onChange={(e) => { setGender(e.value); console.log(e); }} checked={gender === 'Femle'} />
          <label htmlFor="gender1" className="ml-2">Female</label>
        </div>
        <div className="flex align-items-center">
          <RadioButton inputId="gender2" name="gender" value="Male" onChange={(e) => { setGender(e.value); console.log(e); }} checked={gender === 'Male'} />
          <label htmlFor="gender2" className="ml-2">Male</label>
        </div>
      </div>
    </>)

}


const ShowBasicInfo = (props) => {
  const userProfile = props.userProfile.data;
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-12 lg:col-12 md:col-12">Full Name<br />{userProfile?.fullName}</div>
        <div className="col-6 lg:col-6 md:col-6">Height <br />{userProfile?.height}</div>
        <div className="col-6 lg:col-6 md:col-6">Religion<br />{userProfile?.religion}</div>
        <div className="col-6 lg:col-6 md:col-6">Mother Tongue<br />{userProfile?.motherTongue}</div>
        <div className="col-6 lg:col-6 md:col-6">Annual Income<br />{userProfile?.annualIncome}</div>
        <div className="col-6 lg:col-6 md:col-6">Location <br />{userProfile?.location}</div>
        <div className="col-6 lg:col-6 md:col-6">Caste<br />{userProfile?.caste}</div>
        <div className="col-6 lg:col-6 md:col-6">Profile Managed by<br />{userProfile?.managedBy}</div>
      </div>
    </div>
  </div>)
}

const EditBasicInfo = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.data);
  const [fullName, setFullName] = useState(userProfile.fullName || "");
  const [gender, setGender] = useState(userProfile.gender || "");
  const [religion, setReligion] = useState(userProfile.religion || "");
  const [motherTongue, setMotherTongue] = useState(userProfile.motherTongue || "");
  const [height, setHeight] = useState(userProfile.height || "");
  const [annualIncome, setAnnualIncome] = useState(userProfile.annualIncome || "");
  const [location, setLocation] = useState(userProfile.location || "");
  const [caste, setCaste] = useState(userProfile.caste|| "");
  const [managedBy, setManagedBy] = useState(userProfile.managedBy|| "");

  return (<div>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }} >Full Name</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={fullName} onChange={(e) => { setFullName(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Gender</div>
      <div className="col-12 lg:col-8 md:col-8"><GenderOptions gender={gender} setGender={setGender} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Height</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={height} onChange={(e) => { setHeight(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Religion</div>
      <div className="col-12 lg:col-8 md:col-8"><EditReligion religion={religion} setReligion={setReligion} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Mother Tongue</div>
      <div className="col-12 lg:col-8 md:col-8"><EditMotherTongue motherTongue={motherTongue} setMotherTongue={setMotherTongue} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Caste</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={caste} onChange={(e) => { setCaste(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Location</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={location} onChange={(e) => { setLocation(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Annual Income</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={annualIncome} onChange={(e) => { setAnnualIncome(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Profile Managed by</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={managedBy} onChange={(e) => { setManagedBy(e.target.value) }} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
      <div className="col-12 lg:col-8 md:col-8">
        <Button onClick={() => { dispatch(updateData({ fullName, gender, height, religion, motherTongue, caste, location, annualIncome,managedBy })); props.setEditBasicInfoToggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
        <Button onClick={() => { props.setEditBasicInfoToggle(false) }} label='Cancel' severity='secondary' />
      </div>
    </div>
  </div>
  )
}

const ShowCriticalInfo = (props) => {
  // console.log(props?.userProfile.data.criticalInfo);
  const criticalInfo = props?.userProfile.data.criticalInfo;

  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-6 lg:col-6 md:col-6">Birthdate</div>
        <div className="col-6 lg:col-6 md:col-6">{criticalInfo.birthDate}</div>
        <div className="col-6 lg:col-6 md:col-6">Marital Status</div>
        <div className="col-6 lg:col-6 md:col-6">{criticalInfo.maritalStatus}</div>
      </div>
    </div>
  </div>)
}


const ShowAboutMe = (props) => {
  const userProfile = props.userProfile.data;
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-12 lg:col-6 md:col-6">About Me<br/>{userProfile.aboutMe}</div>
        <div className="col-12 lg:col-6 md:col-6">My Family<br/>{userProfile.family}</div>
        <div className="col-12 lg:col-6 md:col-6">Education<br/>{userProfile.education}</div>
        <div className="col-12 lg:col-6 md:col-6">Career<br/>{userProfile.career}</div>
      </div>
    </div>
  </div>)
}

const EditAboutMe = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const [aboutMe, setAboutMe] = useState(userProfile.aboutMe || "");
  const [family, setfamily] = useState(userProfile.family || "");
  const [education, setEducation] = useState(userProfile.education || "");
  const [career, setCareer] = useState(userProfile.career || "");

  return (
    <div>
      <div><br />
        <div className="grid" style={{ "width": "100%" }}>
          <div className="col-12 lg:col-6 md:col-6">About Me</div>
          <div className="col-12 lg:col-6 md:col-6">
            <InputTextarea autoResize value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={2} cols={20} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">About Family</div>
          <div className="col-12 lg:col-6 md:col-6">
            <InputTextarea autoResize value={family} onChange={(e) => setfamily(e.target.value)} rows={2} cols={20} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">Education</div>
          <div className="col-12 lg:col-6 md:col-6">
            <InputTextarea autoResize value={education} onChange={(e) => setEducation(e.target.value)} rows={2} cols={20} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">Career</div>
          <div className="col-12 lg:col-6 md:col-6">
            <InputTextarea autoResize value={career} onChange={(e) => setCareer(e.target.value)} rows={2} cols={20} />
          </div>
          <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
          <div className="col-12 lg:col-8 md:col-8">
            <Button onClick={() => { dispatch(updateData(profileService(userInfo.email,{ ...userProfile, aboutMe,family,education,career }))); props.toggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
            <Button onClick={() => { props.toggle(false) }} label='Cancel' severity='secondary' />
          </div>
        </div>
      </div>
    </div>
  )
}

const EditReligion = (props) => {
  const religion = props.religion;
  const setReligion = props.setReligion;
  const [selectedReligion, setSelectedReligion] = useState({ name: (religion || 'Hindu'), code: (religion || 'Hindu') });
  const religionOptions = [
    { name: 'Hindu', code: 'Hindu' },
    { name: 'Sikh', code: 'Sikh' },
    { name: 'Jain', code: 'Jain' },
    { name: 'Parsi', code: 'Parsi' },
    { name: 'Christian', code: 'Christian' },
    { name: 'Islam', code: 'Islam' },
    { name: 'Judaism', code: 'Judaism' },
    { name: 'No Religion', code: 'No Religion' },
  ];

  const handleReligion = (selectReligion) => {
    setReligion(selectReligion.code);
    setSelectedReligion(selectReligion);
  }

  return (
    <>
      <Dropdown value={selectedReligion} onChange={(e) => handleReligion(e.value)} options={religionOptions} optionLabel="name"
        placeholder="Select Religion" className="w-full" style={{ "width": "100%" }} />
    </>
  )
}


const EditMotherTongue = (props) => {
  const motherTongue = props.motherTongue;
  const setMotherTongue = props.setMotherTongue;
  const [selectedLanguage, setSelectedLanguage] = useState({ name: (motherTongue || 'Hindi'), code: (motherTongue || 'English') });
  const languageOptions = [
    { name: 'English', code: 'English' },
    { name: 'Sindhi', code: 'Sindhi' },
    { name: 'Pahadi', code: 'Pahadi' },
    { name: 'Hindi', code: 'Hindi' },
    { name: 'Marathi', code: 'Marathi' },
    { name: 'Bangali', code: 'Bangali' },
    { name: 'Gujarati', code: 'Gujarati' },
    { name: 'Kannada', code: 'Kannada' },
    { name: 'Telugu', code: 'Telugu' },
    { name: 'Tulu', code: 'Tulu' },
    { name: 'Malyali', code: 'Malyali' },
    { name: 'Tamil', code: 'Tamil' },
  ];


  const handleLanguage = (selectLanguage) => {
    setMotherTongue(selectLanguage.code);
    setSelectedLanguage(selectLanguage);
  }

  return (
    <>
      <Dropdown value={selectedLanguage} onChange={(e) => handleLanguage(e.value)} options={languageOptions} optionLabel="name"
        placeholder="Select Language" className="w-full" style={{ "width": "100%" }} />
    </>
  )
}

const EditCriticalInfo = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const [birthDate, setBirthDate] = useState( new Date(userProfile.data.criticalInfo?.birthDate) || new Date());
  const [maritalStatus, setMaritalStatus] = useState({ name: (userProfile.data.criticalInfo?.maritalStatus|| 'Unmarried' ), code: (userProfile.data.criticalInfo?.maritalStatus|| 'Unmarried' )});
  const maritalStatusOptions = [
    { name: 'Unmarried', code: 'Unmarried' },
    { name: 'Divorce in progress', code: 'Divorce in progress' },
    { name: 'Divorced', code: 'Divorced' },
  ];

  const submitData =()=>{
    const item = {criticalInfo:{maritalStatus: maritalStatus.name, birthDate: getDatemmddyyyy(birthDate)}};
    dispatch(updateData(item));
  }

  return (<div>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }} >Birthdate (MM-DD-YYYY)</div>
      <div className="col-12 lg:col-8 md:col-8"><Calendar value={birthDate} onChange={ (e)=>{ setBirthDate(e.value) } } showIcon /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Marital Status</div>
      <div className="col-12 lg:col-8 md:col-8"><div className="card flex justify-content-center">
        <Dropdown value={maritalStatus} onChange={(e) => { setMaritalStatus(e.value)}} options={maritalStatusOptions} optionLabel="name"
          placeholder="Select marital Status" className="w-full" style={{ "width": "100%" }} />
      </div>
      </div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
      <div className="col-12 lg:col-8 md:col-8">
        <Button onClick={() => { submitData(); props.toggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
        <Button onClick={() => { props.toggle(false) }} label='Cancel' severity='secondary' />
      </div>
    </div>
  </div>
  )
}

const EditContainer = (props) => {
  return (
    <div style={{ "marginLeft": "20px", "marginBottom": "10px" }}>
      <div><div className='text-pink-600' style={{ "float": "left" }}>{props.header}</div>
        <div style={{ "float": "right" }}>
          <Button onClick={() => { props.toggle(true) }} label="Edit" severity="danger" text />
        </div>
      </div>
      <br />
      {props.children}
    </div>
  )
}

const EditProfile = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const [editBasicInfoToggle, setEditBasicInfoToggle] = useState(false);
  const [editCriticalInfoToggle, setEditCriticalInfoToggle] = useState(false);
  const [editAboutMeToggle, setEditAboutMeToggle] = useState(false);

  useEffect(()=>{
    console.log("Load Profile for the current user");
    axios.get("http://localhost:3000/users?getUser="+userInfo.email)
    .then(res=>{
      console.log("Profile",res.data.user.profile);
      if(!res.data.user.profile){
        dispatch(updateData(emptyProfile));
      } else {
        dispatch(updateData(res.data.user.profile));
      }
    })
    .catch(e=>{console.log("Something went Wrong!",e)})

  },[]) 

  return (
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 "></div>
      <div className="col-12 lg:col-6 md:col-6">
        <Panel header="Edit Profile">
          <EditContainer toggle={setEditBasicInfoToggle} header="Basic Information">
            {!editBasicInfoToggle ? <ShowBasicInfo userProfile={userProfile} setEditBasicInfoToggle={setEditBasicInfoToggle} /> : <EditBasicInfo setEditBasicInfoToggle={setEditBasicInfoToggle} />}
          </EditContainer>
          <EditContainer toggle={setEditCriticalInfoToggle} header="Critical Information">
            {!editCriticalInfoToggle ? <ShowCriticalInfo userProfile={userProfile} /> : <EditCriticalInfo toggle={setEditCriticalInfoToggle} />}
          </EditContainer>
          <EditContainer toggle={setEditAboutMeToggle} header="About me">
            {!editAboutMeToggle ? <ShowAboutMe userProfile={userProfile} /> : <EditAboutMe userProfile={userProfile} toggle={setEditAboutMeToggle} />}
          </EditContainer>
        </Panel>
        {/* <Panel header="Education & Career">
          <p className="m-0">
            School, college, diploma, degree, employment details, organization name
          </p>
        </Panel> */}
        {/* <Panel header="Family Details">
          <p className="m-0">
            Mothers occupation, Fathers occupation, sister, brother
            Family Income
          </p>
        </Panel>
        <Panel header="Lifestyle">
          <p className="m-0">
            Habbits, Assets, Languages spoken, Special cases
          </p>
        </Panel>
        <Panel header="Personal choices">
          <p className="m-0">
            Art liking, Hobbies, Music, cloathing, movie, sports, cooking, travelled places
          </p>
        </Panel> */}
      </div>
      <div className="col-12 lg:col-3 md:col-3"></div>
    </div>
  )
}

export default EditProfile