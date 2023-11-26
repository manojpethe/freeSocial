import axios from "axios";
import CONST from '../common/constants'; 

const suggestionsService = async (id,gender) => {
    const response = await axios.get(CONST.SERVER_URL+"/suggestions?id="+id+"&gender="+gender)
    .catch((e)=>{
        console.log("Something went wrong!");
        return [];
    })
    return response.data;
}

export default suggestionsService;