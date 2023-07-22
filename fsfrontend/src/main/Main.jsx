// import React from 'react'
import { Outlet } from "react-router-dom"
import UserMenu from "./UserMenu"

const Main = () => {
  return (
    <div>
      <div style={{"zIndex":"9999"}} ><UserMenu /></div>
      <Outlet/>
    </div>
  )
}

export default Main