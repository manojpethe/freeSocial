import { useState } from 'react'
import { Panel } from 'primereact/panel';
// import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { useDispatch } from 'react-redux';
import { updateData, clearData } from '../redux/userProfile';
import { useSelector } from 'react-redux'

// let basicInfo = { fullName: "Manoj Pethe", height: "6.4", relgion: "Hindu", motherTongue: "marathi", caste: "Bramhin", annualIncome: "", city: "Pune", state: "Maharashtra", country: "India", profileManager: "Manoj Pethe" };

const ShowBasicInfo = (props) => {
  const userProfile = props.userProfile.data;
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-12 lg:col-12 md:col-12">Full Name<br/>{userProfile?.fullName}</div>
        <div className="col-6 lg:col-6 md:col-6">Height</div>
        <div className="col-6 lg:col-6 md:col-6">Religion</div>
        <div className="col-6 lg:col-6 md:col-6">Mother Tongue</div>
        <div className="col-6 lg:col-6 md:col-6">Annual Income</div>
        <div className="col-6 lg:col-6 md:col-6">Location</div>
        <div className="col-6 lg:col-6 md:col-6">Caste</div>
        <div className="col-6 lg:col-6 md:col-6">Profile Managed by</div>
      </div>
    </div>
  </div>)
}

const EditBasicInfo = (props) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");

  return (<div>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }} >Full Name</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={fullName} onChange={(e)=>{setFullName(e.target.value)}} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Gender</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText value={gender} onChange={(e)=>{setGender(e.target.value)}} style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Height</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Religion</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Mother Tongue</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Caste</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Country</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>City</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Annual Income</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Profile Managed by</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
      <div className="col-12 lg:col-8 md:col-8">
        <Button onClick={() => { dispatch(updateData({fullName,gender}));  props.setEditBasicInfoToggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
        <Button onClick={() => { props.setEditBasicInfoToggle(false) }} label='Cancel' severity='secondary' />
      </div>
    </div>
  </div>
  )
}

const ShowCriticalInfo = () => {
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-6 lg:col-6 md:col-6">Birthdate</div>
        <div className="col-6 lg:col-6 md:col-6">Marital Status</div>
      </div>
    </div>
  </div>)
}


const ShowAboutMe = () => {
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        {/* <div className="col-6 lg:col-6 md:col-6">about me, my family, about education, my career</div> */}
        <div className="col-12 lg:col-6 md:col-6">About Me</div>
        <div className="col-12 lg:col-6 md:col-6">My Family</div>
        <div className="col-12 lg:col-6 md:col-6">Education</div>
        <div className="col-12 lg:col-6 md:col-6">Background</div>
      </div>
    </div>
  </div>)
}

const EditAboutMe = (props) =>{
  const [aboutMe, setAboutMe] = useState("");
  const [aboutFamily, setAboutFamily] = useState("");
  const [education, setEducation] = useState("");
  const [career, setCareer] = useState("");

  return(
    <div>
      <div><br />
        <div className="grid" style={{ "width": "100%" }}>
          <div className="col-12 lg:col-6 md:col-6">About Me</div>
          <div className="col-12 lg:col-6 md:col-6">
          <InputTextarea autoResize value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows={5} cols={30} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">About Family</div>
          <div className="col-12 lg:col-6 md:col-6">
          <InputTextarea autoResize value={aboutFamily} onChange={(e) => setAboutFamily(e.target.value)} rows={2} cols={30} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">Education</div>
          <div className="col-12 lg:col-6 md:col-6">
          <InputTextarea autoResize value={education} onChange={(e) => setEducation(e.target.value)} rows={2} cols={30} />
          </div>
          <div className="col-12 lg:col-6 md:col-6">Career</div>
          <div className="col-12 lg:col-6 md:col-6">
          <InputTextarea autoResize value={career} onChange={(e) => setCareer(e.target.value)} rows={3} cols={30} />
          </div>
          <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
          <div className="col-12 lg:col-8 md:col-8">
            <Button onClick={() => { props.toggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
            <Button onClick={() => { props.toggle(false) }} label='Cancel' severity='secondary' />
          </div>
      </div>
      </div>
    </div>
  )
}

const EditCriticalInfo = (props) => {
  const [martialStatus, setMaritalStatus] = useState('Unmarried');
  const maritalStatusOptions = [
    { name: 'Unmarried', code: 'Unmarried' },
    { name: 'Divorce in progress', code: 'Divorce in progress' },
    { name: 'Divorced', code: 'Divorced' },
  ];

  return (<div>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }} >Birthdate</div>
      <div className="col-12 lg:col-8 md:col-8"><Calendar /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Marital Status</div>
      <div className="col-12 lg:col-8 md:col-8"><div className="card flex justify-content-center">
        <Dropdown value={martialStatus} onChange={(e) => setMaritalStatus(e.value)} options={maritalStatusOptions} optionLabel="name"
          placeholder="Select marital Status" className="w-full" style={{"width":"100%"}} />
      </div>
      </div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "right" }}></div>
      <div className="col-12 lg:col-8 md:col-8">
        <Button onClick={() => { props.toggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
        <Button onClick={() => { props.toggle(false) }} label='Cancel' severity='secondary' />
      </div>
    </div>
  </div>
  )
}

const EditContainer = (props)=>{
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
  const userProfile = useSelector((state) => state.userProfile);
  const [editBasicInfoToggle, setEditBasicInfoToggle] = useState(false);
  const [editCriticalInfoToggle, setEditCriticalInfoToggle] = useState(false);
  const [editAboutMeToggle,setEditAboutMeToggle] = useState(false);

  return (
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 "></div>
      <div className="col-12 lg:col-6 md:col-6">
        <Panel header="Edit Profile">
          <EditContainer toggle={setEditBasicInfoToggle} header="Basic Information">
            {!editBasicInfoToggle ? <ShowBasicInfo userProfile={userProfile} setEditBasicInfoToggle={setEditBasicInfoToggle} /> : <EditBasicInfo setEditBasicInfoToggle={setEditBasicInfoToggle} />}
          </EditContainer>
          <EditContainer toggle={setEditCriticalInfoToggle} header="Critical Information">
            {!editCriticalInfoToggle ? <ShowCriticalInfo /> : <EditCriticalInfo toggle={setEditCriticalInfoToggle} />}
          </EditContainer>
          <EditContainer toggle={setEditAboutMeToggle} header="About me">
            {!editAboutMeToggle ? <ShowAboutMe /> : <EditAboutMe toggle={setEditAboutMeToggle} />}
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