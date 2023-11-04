import React, { useState } from "react";
import { Slider } from "primereact/slider";
import { ScrollPanel } from "primereact/scrollpanel";
import CountryList from "./CountryList";
import SelectReligion from "./SelectReligion";

const DesiredPartner = () => {
  const [ageRange, setAgeRange] = useState([20,60]);
  const [religion, setReligion] = useState("");

  return (
    <div className="grid" style={{ width: "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
      <div className="col-12 lg:col-6 md:col-6 sm:col-12">
        <ScrollPanel
          // style={{ width: "100%", height: "200px" }}
          className="custombar1"
        >
          <div
            width="100%"
            height="100%"
            className="z-0"
            style={{ marginLeft:"20px" }}
          >
            <CountryList />
            <p />
            <div className="card flex justify-content-center">
            <Slider value={ageRange} onChange={(e) => setAgeRange(e.value)} className="w-14rem" range />
            </div>
            <p />
            <div>
              Age Range: min:{ ageRange[0] } max:{ ageRange[1] }
            </div>
            <p />
            <div>
              <SelectReligion religion={religion} setReligion={setReligion} />
            </div>
          </div>
        </ScrollPanel>
      </div>
      <div className="col-12 lg:col-3 md:col-3 sm:col-0"></div>
    </div>
  );
};

export default DesiredPartner;
