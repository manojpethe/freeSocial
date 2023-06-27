// import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';


const Menu = () => {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: ()=> {console.log("Hello World!")}
        },
        {
            label: 'Registration/Login',
            icon: 'pi pi-fw pi-check-square',
            command: ()=> {console.log("Hello World!")}
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question-circle',
            command: ()=> {console.log("Hello World!")}
        },
        {
            label: 'Contact us',
            icon: 'pi pi-fw pi-phone',
            command: ()=> {console.log("Hello World!")}
        }
    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const start = <p className="mr-2">Rishta.com</p>;
    const end = <InputText placeholder="Search" type="text" className="w-full" />;

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end}  />
        </div>
    )
}

export default Menu