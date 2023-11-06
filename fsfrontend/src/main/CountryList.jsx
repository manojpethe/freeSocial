import React, { useState } from "react";
import data from "../common/countryflaglist";
import { ListBox } from "primereact/listbox";
import { MultiSelect } from "primereact/multiselect";

const CountryList = (props) => {
  // const [selectedCountry, setSelectedCountry] = useState("");
  // const [selectedCountries, setSelectedCountries] = useState([]);

  // const countryTemplate = (option) => {
  //   const id = option.id;
  //   const name = option.name;
  //   return (
  //     <div style={{ height: "2rem" }} className="flex align-items-center">
  //       <div style={{ width: "80%" }}>{name}</div>
  //       &nbsp;&nbsp;
  //       <span style={{ fontSize: "2rem" }}>{option.emoji}</span>
  //     </div>
  //   );
  // };


  const countryTemplate1 = (option) => {
    return (
        <div className="flex align-items-center">
            {/* <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
            <div><span style={{ fontSize: "2rem" }}>{option.emoji}</span>&nbsp;&nbsp;{option.name}</div>
        </div>
    );
};

const panelFooterTemplate = () => {
    const length = props.countries ? props.countries.length : 0;

    return (
        <div className="py-2 px-3">
            <b>{length}</b> item{length > 1 ? 's' : ''} selected.
        </div>
    );
};

  return (
    <>
    {/* <div style={{ fontSize: "3rem" }}>{ selectedCountry ? "You have selected:"+ selectedCountry.emoji +selectedCountry.name : "" }</div>
    <div style={{ fontSize: "3rem" }}>{ selectedCountry ? <img width="100px" src={selectedCountry.image} /> : "" }</div> */}
      {/* <ListBox
        filter
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.value)}
        options={data}
        optionLabel="name"
        className="w-full md:w-14rem"
        listStyle={{ maxHeight: "250px" }}
        itemTemplate={countryTemplate}
      /> */}
    {/* <br/> */}
      <MultiSelect
        filter
        value={props.countries}
        options={data}
        onChange={(e) => props.setCountries(e.value)}
        optionLabel="name"
        placeholder="Select Countries"
        itemTemplate={countryTemplate1}
        panelFooterTemplate={panelFooterTemplate}
        className="w-full md:w-20rem"
        display="chip"
      />
    </>
  );
};

export default CountryList;
