import axios from "axios";
import CONST from "../common/constants";

const profileService = async (email, profileData) => {
  const response = await axios
    .post(
      CONST.SERVER_URL + "/users?queryType=updateProfile&email=" + email,
      profileData
    )
    .catch((e) => {
      console.log("Something went wrong!:", e);
      return false;
    });
  return response.data;
};

const loadProfile = async (email) => {
    const response = await axios
    .get(CONST.SERVER_URL + "/users?queryType=getUser&email=" + email)
    .catch((e) => {
      console.log("Something went Wrong!", e);
      return false;
    });
    
    return response.data.user.profile;
        
};

const loadPreferences = async (id) => {
  const response = await axios
  .get(CONST.SERVER_URL + "/users?queryType=getUser&id=" + id)
  .catch((e) => {
    console.log("Something went Wrong!", e);
    return false;
  });
  
  return response.data.user.preferences;
      
};

const updatePreferences = async (id, preferences) => {
  const response = await axios
    .post(
      CONST.SERVER_URL + "/users?queryType=updatePreferences&id=" + id,
      preferences
    )
    .catch((e) => {
      console.log("Something went wrong!:", e);
      return false;
    });
  return response.data;
};

export { profileService, loadProfile, updatePreferences, loadPreferences };
