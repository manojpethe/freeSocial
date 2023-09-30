import axios from "axios";

const profileService = (email,profileData,) => {
    axios.post("http://localhost:3000/users?queryType=updateProfile&email="+email,profileData)
    .then((res)=>{
        console.log(res.data);
        return res.data;
    }
    )
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
}

export default profileService;