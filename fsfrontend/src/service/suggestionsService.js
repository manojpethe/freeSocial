import axios from "axios";

const suggestionsService = async (gender) => {
    const response = await axios.get("http://localhost:3000/suggestions?gender="+gender)
    .catch((e)=>{
        console.log("Something went wrong!");
        return [];
    })
    return response.data;
}

export default suggestionsService;