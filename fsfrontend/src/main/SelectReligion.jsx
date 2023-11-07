import { useState } from "react";
// import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { religionFlagList } from "../common/multiPurposeLists";

const EditReligion = (props) => {
    const religion = props.religions;
    const setReligion = props.setReligions;
    const [selectedReligion, setSelectedReligion] = useState({ name: (religion || 'undefined'), code: (religion || 'undefined') });
    // const [selectedReligions, setSelectedReligions] = useState([]);
  
    const handleReligion = (selectReligion) => {
      setReligion(selectReligion.code);
      setSelectedReligion(selectReligion);
    }

    // const itemTemplate = (option) => {
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
  
  
    const relgionTemplate = (option) => {
      return (
          <div className="flex align-items-center">
              <div><span style={{ fontSize: "2rem" }}>{option.emoji}</span>&nbsp;&nbsp;{option.name}</div>
          </div>
      );
    };

    const panelFooterTemplate = () => {
      const length = selectedReligion ? selectedReligion.length : 0;
  
      return (
          <div className="py-2 px-3">
              <b>{length}</b> item{length > 1 ? 's' : ''} selected.
          </div>
      );
    };
    
  
    return (
      <>
        {/* <Dropdown value={selectedReligion} onChange={(e) => handleReligion(e.value)} options={religionOptions} optionLabel="name"
          placeholder="Select Religion" className="w-full" style={{ "width": "100%" }} /> */}
      {/* <p /> */}
      <MultiSelect
        filter
        value={religion}
        options={religionFlagList}
        onChange={(e) => setReligion(e.value)}
        optionLabel="name"
        placeholder="Select Religions"
        itemTemplate={relgionTemplate}
        panelFooterTemplate={panelFooterTemplate}
        className="w-full md:w-20rem"
        display="chip"
      />
      
      </>
    )
  }

  export default EditReligion