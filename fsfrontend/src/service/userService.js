import axios from "axios";

const userService = async (email) => {
    const response = await axios.get("http://localhost:3000/users?getUser="+email)
    .catch((e)=>{
        console.log("Something went wrong!:",e);
        return false;
    })
    return response.data;
}

export default userService;