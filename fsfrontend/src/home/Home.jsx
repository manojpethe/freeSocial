// import React from 'react'
import { Outlet } from "react-router-dom"
import Menu from "./menu/menu"

const Home = () => {
  return (
    <div>
        <Menu/>
        <Outlet/>
    </div>
  )
}

export default Home