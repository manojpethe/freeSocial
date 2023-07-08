import { useState } from 'react'
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

let basicInfo = { fullName: "Manoj Pethe", height: "6.4", relgion: "Hindu", motherTongue: "marathi", caste: "Bramhin", annualIncome: "", city: "Pune", state: "Maharashtra", country: "India", profileManager: "Manoj Pethe" };

const ShowBasicInfo = () => {
  return (<div>
    <div><br />
      <div className="grid" style={{ "width": "100%" }}>
        <div className="col-12 lg:col-12 md:col-12">Full Name</div>
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
  return (<div>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }} >Full Name</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
      <div className="col-12 lg:col-4 md:col-4" style={{ "textAlign": "left", "fontFamily": "verdana", }}>Gender</div>
      <div className="col-12 lg:col-8 md:col-8"><InputText style={{ "width": "100%" }} /></div>
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
        <Button onClick={() => { props.setEditBasicInfoToggle(false) }} label='&nbsp;Save&nbsp;' severity='danger' />&nbsp;
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


const EditProfile = () => {
  const [editBasicInfoToggle, setEditBasicInfoToggle] = useState(false);
  const [editCriticalInfoToggle, setEditCriticalInfoToggle] = useState(false);

  return (
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 "></div>
      <div className="col-12 lg:col-6 md:col-6">
        <Panel header="Edit Profile">
          <div style={{ "marginLeft": "20px", "marginBottom": "10px" }}>
            <div><div className='text-pink-600' style={{ "float": "left" }}>Basic Information</div><div style={{ "float": "right" }}>
              <Button onClick={() => { setEditBasicInfoToggle(true) }} label="Edit" severity="danger" text />
            </div>
            </div>
            <br />
            {!editBasicInfoToggle ? <ShowBasicInfo setEditBasicInfoToggle={setEditBasicInfoToggle} /> : <EditBasicInfo setEditBasicInfoToggle={setEditBasicInfoToggle} />}
          </div>
          <div style={{ "marginLeft": "20px", "marginBottom": "10px" }}>
            <div><div className='text-pink-600' style={{ "float": "left" }}>Critical Information</div><div style={{ "float": "right" }}>
              <Button onClick={() => { setEditCriticalInfoToggle(true) }} label="Edit" severity="danger" text />
            </div>
            </div>
            <br />
            {!editCriticalInfoToggle ? <ShowCriticalInfo /> : <EditCriticalInfo toggle={setEditCriticalInfoToggle} />}
          </div>
        </Panel>
        {/* <Panel header="About Me">
          <p className="m-0">
            about me, my family, about education, my career
          </p>
        </Panel>
        <Panel header="Education & Career">
          <p className="m-0">
            School, college, diploma, degree, employment details, organization name
          </p>
        </Panel>
        <Panel header="Family Details">
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