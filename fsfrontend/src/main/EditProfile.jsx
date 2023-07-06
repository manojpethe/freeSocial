// import React from 'react'
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const EditProfile = () => {
  return (
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 "></div>
      <div className="col-12 lg:col-6 md:col-6">
        <h4>Edit Profile</h4>
        <Panel header="Basic Information">
          <p className="m-0">
            Full Name, Height, Religion, Mother Tongue, Annual Income, Location, Caste, Profile Managed by
          </p>
        </Panel>
        <Panel header="Critical Information">
          <p className="m-0">
            birthdate & Marital Status
          </p>
        </Panel>
        <Panel header="About Me">
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
        </Panel>
      </div>
      <div className="col-12 lg:col-3 md:col-3"></div>
    </div>
  )
}

export default EditProfile