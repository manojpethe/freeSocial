import axios from "axios";

const profileService = async (email,profileData,) => {
    const response = await axios.post("http://localhost:3000/users?queryType=updateProfile&email="+email,profileData)
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export default profileService;