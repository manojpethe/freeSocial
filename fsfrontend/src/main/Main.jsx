// import React from 'react'
import { Outlet } from "react-router-dom"
import UserMenu from "./UserMenu"

const Main = () => {
  return (
    <div>
      <UserMenu />
      <Outlet/>
    </div>
  )
}

export default Main