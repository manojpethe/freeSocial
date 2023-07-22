// import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const UserInfo = useSelector((state) => state.userInfo);
    let location = useLocation();
    // console.log('UserInfo:',UserInfo);

    if(!UserInfo.data.email) {
        return <Navigate to="/home/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;