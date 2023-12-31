import React, { useState, useEffect,useRef } from "react";
import { Slider } from "primereact/slider";
import { ScrollPanel } from "primereact/scrollpanel";
import CountryList from "./CountryList";
import SelectReligion from "./SelectReligion";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferencesData } from '../redux/userProfile';
import { updatePreferences, loadPreferences } from '../service/profileService';
import { countryFlagList, religionFlagList } from "../common/multiPurposeLists";

const DesiredPartner = () => {
  const toast = useRef(null);
  const userInfo = useSelector((state) => state.userInfo.data);
  const preferences = useSelector((state) => state.userProfile.preferences);
  const dispatch = useDispatch();
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [religions, setReligions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    handleLoadPreferences();
  }, [])

  const handleLoadPreferences = async (id)=> {
    const result = await loadPreferences(userInfo.id);
    if(result){
      dispatch(updatePreferencesData(result));
      setAgeRange(result.ageRange);
      let finalCountryList = [];
      const loadCountryList = result.countries;
      loadCountryList.forEach(element => {
        let name = countryFlagList.find((item)=>(item.name === element))
        finalCountryList.push(name);
      });
      setCountries(finalCountryList);
      let finalReligionList = [];
      const loadReligionList = result.religions;
      loadReligionList.forEach(element =>{
        let name = religionFlagList.find((item)=> (item.name === element))
         finalReligionList.push(name);
      });
      setReligions(finalReligionList);
    } 
    // else {
    //   showToast({severity:'error', summary: 'Error', detail:'Communication Error', life: 3000});  
    // }
  }

  const handleSave = async (ageRange,religions,countries) => {
    const transformedReligions = religions.map((item)=>(item.name))
    const transformedCountries = countries.map((item)=>(item.name));
    const preferences = {
      ageRange,
      religions: transformedReligions,
      countries: transformedCountries
    }
    const res = await updatePreferences(userInfo.id,preferences);
    if(res){
      showToast({severity:'success', summary: 'Success', detail:'Preferences Saved..', life: 1000});
    } else {
      showToast({severity:'error', summary: 'Error', detail:'something went wrong...', life: 3000});      
    };
  }

  const showToast = (message) => {
    toast.current.show(message);
  };

  return (
    <div className="grid" style={{ width: "100%" }}>
    <Toast ref={toast} />
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
      <div className="col-12 lg:col-6 md:col-6 sm:col-12">
        <ScrollPanel
          style={{ width: "100%", minHeight: "50%" }}
          className="custombar1"
        >
          <div
            className="z-0"
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
              alignContent: "space-around",
              height: "600px",
            }}
          >
            <div className="text-lg">
              <b>Partner Preferences</b>
            </div>
            <div className="text-base text-slate-400">
              Hint: Choose country, religions, age of your desired partner.
              <p/>
                <b>Religion</b>
                <SelectReligion religions={religions} setReligions={setReligions} />
                <p/>
                <b>Country</b>
                <CountryList countries={countries} setCountries={setCountries} />
                <p/>
            <div className="justify-content-center">
              <b>Age Range:</b> Mininum:{ageRange[0]} Maximum:{ageRange[1]}
            </div>
                <p/>
            </div>
            <div className="justify-content-center">
              <p/>
                <Slider
                  className="w-full"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.value)}
                  range
                />
            </div>
            <p/>
              <Button outlined icon="pi pi-save" label="Save Preferences" style={{width:"100%"}} className="wd-full" onClick={()=>{ handleSave(ageRange,religions,countries) }}/>
          </div>
        </ScrollPanel>
      </div>
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
    </div>
  );
};

export default DesiredPartner;
