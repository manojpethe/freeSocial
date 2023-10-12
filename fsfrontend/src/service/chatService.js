import axios from "axios";
import CONST from '../common/constants'; 

const newMessage = async (fromId,toId,message) => {
    fromId = parseInt(fromId);
    toId = parseInt(toId);
    const response = await axios.post(CONST.SERVER_URL+"/chat?queryType=newMessage",{fromid:fromId,toid:toId,message})
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

const getMessages = async (fromId,toId) => {
    const response = await axios.get(CONST.SERVER_URL+"/chat?queryType=getMessages&fromid="+fromId+"&toid="+toId)
    .catch((e)=>{
        console.error("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export { newMessage,getMessages };