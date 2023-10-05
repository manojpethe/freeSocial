import axios from "axios";
import CONST from '../common/constants'; 

const loadUserInfo = async (email) => {
    const response = await axios.get(CONST.SERVER_URL+"/users?getUser="+email)
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    console.log(response.data);
    return response.data;
}

export default loadUserInfo;