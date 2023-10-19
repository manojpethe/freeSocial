import { useState } from 'react'
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Badge } from 'primereact/badge';

const UserMenu = () => {
    const UserInfo = useSelector((state) => state.userInfo);
    const connections = useSelector((state) => state.connections.data);
    const requests = useSelector((state) => state.requests.data);
    const navigate = useNavigate();
    // const [unseenMessages, setUnseenMessages] = useState(0);

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

    const totalUnseenMessages = ()=>{
        let total = 0;
        if(connections.length){
            connections.forEach(element => {
                total = total + element.unseen;
            });
        }
        return total;
    }

    const totalUnseenCount = totalUnseenMessages();


    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const start = <div style={{ "cursor": "pointer" }}><p className="mr-2" onClick={() => { navigate("/main/feed") }} >NRI matrimony</p></div>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;
    const end = (
        <div style={{ "display": "flex", "width":"100px", "justifyContent": "space-around" }}>
            <div style={{ "cursor": "pointer", "margin":"auto" }} onClick={()=>{navigate("/main/requests");}}>
                <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem' }} > 
                { requests.length ? <Badge value={requests.length} severity="danger"></Badge>:"" }
                </i>
            </div>
            <div style={{ "cursor": "pointer", "margin":"auto" }} onClick={()=>{navigate("/main/connections");}}>
                <i className="pi pi-comment p-overlay-badge" style={{ fontSize: '1.5rem' }} >
                { totalUnseenCount ? <Badge value={totalUnseenCount} severity="danger"></Badge> : "" }
                </i>
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