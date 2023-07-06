// import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import profileImage from '../assets/img/merlyn.jpg'

const LeftPane = () => {
    const navigate = useNavigate();

    return (
        <div style={{ "width": "75%", "padding": "10px", "marginLeft": "25%", "margin": "20px", "paddingLeft": "10%" }}>
            <Card>
                <div style={{ "height": "150px", "width": "100%", "cursor":"pointer", "color":"blue" }} onClick={()=>{ navigate("/main/editProfile"); }} >
                <Avatar image={profileImage} size="xlarge" shape="circle" /><br/>
                Merlyin Monroe <br/>
                Edit Profile <br/>
                </div>
                <Button onClick={() => { navigate("/main/feed"); }} icon="pi pi-link" label="Suggestions" severity="secondary" text /><br />
                <Button onClick={() => { navigate("/main/feed"); }} icon="pi pi-sort-alpha-down" label="Activity" severity="secondary" text /><br />
                <Button onClick={() => { navigate("/main/search"); }} icon="pi pi-search" label="Search" severity="secondary" text /><br />
                <Button onClick={() => { navigate("/main/messenger"); }} icon="pi pi-send" label="Messenger" severity="secondary" text /><br />
            </Card>
        </div>

    )
}

export default LeftPane