// import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';


const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: ()=> {navigate("/")}
        },
        {
            label: 'Registration/Login',
            icon: 'pi pi-fw pi-check-square',
            command: ()=> {navigate("/home/login")}
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question-circle',
            command: ()=> {navigate("/home/help")}
        },
        {
            label: 'Contact us',
            icon: 'pi pi-fw pi-phone',
            command: ()=> {navigate("/home/contact")}
        }
    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const start = <p className="mr-2">friends.com</p>;
    // const end = <InputText placeholder="Search" type="text" className="w-full" />;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;

    return (
        <div className="card sticky" style={{"zIndex":"100"}}>
            <Menubar model={items} start={start} end={end}  />
        </div>
    )
}

export default Menu