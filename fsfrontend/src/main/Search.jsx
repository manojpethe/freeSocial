import React, { useState, useEffect, useRef } from "react";
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
import { searchService } from "../service/suggestionsService";

const Search = () => {
  const toast = useRef(null);
  const userInfo = useSelector((state) => state.userInfo.data);
  const userProfile = useSelector((state) => state.userProfile.data);
  const preferences = useSelector((state) => state.userProfile.preferences);
  const dispatch = useDispatch();
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [religions, setReligions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchResults,setSearchResults] = useState([]);

  useEffect(() => {
    handleLoadPreferences();
  }, [])

  const handleLoadPreferences = async (id) => {
    const result = await loadPreferences(userInfo.id);
    if (result) {
      dispatch(updatePreferencesData(result));
      setAgeRange(result.ageRange);
      let finalCountryList = [];
      const loadCountryList = result.countries;
      loadCountryList.forEach(element => {
        let name = countryFlagList.find((item) => (item.name === element))
        finalCountryList.push(name);
      });
      setCountries(finalCountryList);
      let finalReligionList = [];
      const loadReligionList = result.religions;
      loadReligionList.forEach(element => {
        let name = religionFlagList.find((item) => (item.name === element))
        finalReligionList.push(name);
      });
      setReligions(finalReligionList);
    }
  }

  const showToast = (message) => {
    toast.current.show(message);
  };

  const handleSearch = async (ageRange, religions, countries) => {
    console.log("Search--->",ageRange, religions, countries);
    const transformedReligions = religions.map((item) => (item.name))
    const transformedCountries = countries.map((item) => (item.name));
    const searchCriteria = {
      ageRange,
      religions: transformedReligions,
      countries: transformedCountries
    }

    console.log(searchCriteria);
    const res = await searchService(userInfo.id,userProfile.gender,searchCriteria);
    console.log(res);
    if(res){
      setSearchResults(res);
      showToast({severity:'success', summary: 'Success', detail:'Found records', life: 1000});
    } else {
      showToast({severity:'error', summary: 'Error', detail:'something went wrong...', life: 3000});      
    };
  }

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
              <b>Search</b>
            </div>
            <div className="text-base text-slate-400">
              Hint: Search your partner based on custom criteria. initial criteria is based on your preferences.
              <p />
              <b>Religion</b>
              <SelectReligion religions={religions} setReligions={setReligions} />
              <p />
              <b>Country</b>
              <CountryList countries={countries} setCountries={setCountries} />
              <p />
              <div className="justify-content-center">
                <b>Age Range:</b> Mininum:{ageRange[0]} Maximum:{ageRange[1]}
              </div>
              <p />
            </div>
            <div className="justify-content-center">
              <p />
              <Slider
                className="w-full"
                value={ageRange}
                onChange={(e) => setAgeRange(e.value)}
                range
              />
            </div>
            <p />
            <div style={{ width: "100%" }}>
              <Button className="wd-full" onClick={() => { handleSearch(ageRange, religions, countries) }}>Search</Button>
            </div>
          </div>
        </ScrollPanel>
        <div>results: {searchResults.length}</div>
      </div>
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
    </div>
  );
}

export default Search