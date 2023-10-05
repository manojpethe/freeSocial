import axios from "axios";
import CONST from '../common/constants'; 

const profileService = async (email,profileData,) => {
    const response = await axios.post(CONST.SERVER_URL+"/users?queryType=updateProfile&email="+email,profileData)
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export default profileService;