// import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const UserMenu = () => {
    const UserInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();
    const showAlerts = () => {
        console.log("show Alerts in a div");
    }

    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Edit Profile',
                    icon: 'pi pi-fw pi-user-edit',
                    command: () => { navigate("/main/editProfile") }
                },
                {
                    label: 'Partner Preference',
                    icon: 'pi pi-fw pi-users',
                    command: () => { navigate("/main/desiredPartner") }
                },
                {
                    label: 'Blocked/Ignored Profiles',
                    icon: 'pi pi-fw pi-user-minus',
                    command: () => { navigate("/main/blockedIgnored") }
                }
            ]
        },
        {
            label: 'Account',
            icon: 'pi pi-fw pi-id-card',
            items: [
                {
                    label: 'Account & Settings',
                    icon: 'pi pi-fw pi-cog',
                    command: () => { navigate("/main/accountSettings") }
                },
                {
                    label: 'Help & Support',
                    icon: 'pi pi-fw pi-phone',
                    command: () => { navigate("/main/support") }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => { navigate("/main/logout") }
                }
            ]
        }
    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const start = <div style={{ "cursor": "pointer" }}><p className="mr-2" onClick={() => { navigate("/main/feed") }} >friends.com</p></div>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;
    const end = (
        <div style={{ "display": "flex", "width":"100px", "justifyContent": "space-around" }}>
            <div style={{ "cursor": "pointer", "margin":"auto" }} onClick={showAlerts}>
                <i className="pi pi-bell" style={{ fontSize: '1.5rem' }} />
            </div>
            <div style={{ "cursor": "pointer", "margin":"auto" }} onClick={()=>{navigate("/main/connections");}}>
                <i className="pi pi-comment" style={{ fontSize: '1.5rem' }} />
            </div>
            <div>
                <Avatar image={UserInfo?.data?.picture} shape="circle" />
            </div>
        </div>
    );



    return (
        <div className="card sticky">
            <Menubar model={items} start={start} end={end} style={{"zIndex":"2147483647"}} />
        </div>
    )
}

export default UserMenu