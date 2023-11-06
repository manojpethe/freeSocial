import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { ScrollPanel } from "primereact/scrollpanel";
import CountryList from "./CountryList";
import SelectReligion from "./SelectReligion";
import { Button } from "primereact/button";

const Search = () => {
  const [ageRange, setAgeRange] = useState([20, 36]);
  const [religion, setReligion] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearch = () => {
    const criteria = {
      ageRange,
      religion,
      countries
    }
    console.log(criteria);
  }

  return (
    <div className="grid" style={{ width: "100%" }}>
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
            <p className="text-base text-slate-400">
              Hint: Customize your partner search criteria.
              <p>
                <b>Religion</b> <br/>
                <SelectReligion religion={religion} setReligion={setReligion} />
              </p>

            </p>
            <b>Country</b><br/>
            <CountryList countries={countries} setCountries={setCountries} />
            <p />

            <div className="justify-content-center">
              Age Range: Mininum:{ageRange[0]} Maximum:{ageRange[1]}
            </div>
            <p/>
            <div className="justify-content-center">
                <Slider
                  className="w-full"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.value)}
                  range
                />
            </div>
            <p/>
            <div style={{width:"100%"}}>
              <Button className="wd-full" onClick={()=>{ handleSearch() }}>Search</Button>
            </div>
          </div>
        </ScrollPanel>
      </div>
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
    </div>
  );
}

export default Search