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

const searchService = async (id,gender,criteria) => {
    const response = await axios.post(CONST.SERVER_URL+"/suggestions?queryType=search&id="+id+"&gender="+gender,criteria)
    .catch((e)=>{
        console.log("Something went wrong!");
        return false;
    })
    return response.data;
}

export { suggestionsService, searchService };