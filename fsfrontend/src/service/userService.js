import axios from "axios";
import CONST from '../common/constants'; 

const userService = async (id) => {
    const response = await axios.get(CONST.SERVER_URL+"/users?queryType=getUser&id="+id)
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export default userService;