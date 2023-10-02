import axios from "axios";

const requestConnection = async (id) => {
    const response = await axios.post("http://localhost:3000/connection?queryType=requestConnection",{id:id})
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const getConnections = async (id) => {
    const response = await axios.get("http://localhost:3000/connection?queryType=getConnections")
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export { requestConnection, getConnections };