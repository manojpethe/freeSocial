import axios from "axios";
import CONST from '../common/constants'; 

const requestConnection = async (fromId,toId) => {
    const response = await axios.post(CONST.SERVER_URL+"/connection?queryType=requestConnection",{fromId,toId})
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const connectionStatus = async (fromId,toId) => {
    const response = await axios.post(CONST.SERVER_URL+"/connection?queryType=connectionStatus",{fromId,toId})
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const getConnections = async (id) => {
    const response = await axios.get(CONST.SERVER_URL+"/connection?queryType=getConnections?id"+id)
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const approveRequest = async (requestid, status) =>{
    const response = await axios.post(CONST.SERVER_URL+"/connection?queryType=approveRequest",{requestid,status})
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export { requestConnection, getConnections, connectionStatus, approveRequest };