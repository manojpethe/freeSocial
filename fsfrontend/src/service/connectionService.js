import axios from "axios";
import CONST from '../common/constants'; 

const requestConnection = async (fromId,toId) => {
    const response = await axios.post(CONST.SERVER_URL+"/connection?queryType=requestConnection",{fromId,toId})
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const getConnections = async (id) => {
    const response = await axios.get(CONST.SERVER_URL+"/connection?queryType=getConnections")
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export { requestConnection, getConnections };