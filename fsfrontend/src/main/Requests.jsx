import { useEffect, useState } from "react";
import { getRequests,approveRequest } from "../service/connectionService";
import { useSelector, useDispatch } from "react-redux";
import { loadRequests } from "../redux/requests";
import { ListBox } from "primereact/listbox";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Requests = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.data);
  const requests = useSelector((state) => state.requests.data);
  const [selectedConnection, setSelectedConnection] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetRequests();
  }, []);

  const handleGetRequests = async () => {
    const result = await getRequests(userInfo.id);
    dispatch(loadRequests(result));
  };

  const handleOpenProfile = (id) => {
    navigate("/main/viewprofile/" + id);
  };

  const handleApproveRequest = (requestid, status)=>{
    if( requestid === undefined|| status == undefined ){
      console.error("Error: profile Id or status can not be undefined");
      return false;
    }
    // console.log("approve Request!....", requestid,status);
    const result = approveRequest(requestid,status)
    .then(()=>{
        handleGetRequests()
    }
    ).catch((e)=> {console.error(e)});
    // console.log(result);
  }


  const personTemplate = (option) => {
    console.log(option);
    const id = option.id;
    const fullName = option.fullName;
    const requestid = option.requestid;
    const status = option.status;
    return (
      <div style={{ height: "2rem" }} className="flex align-items-center">
        <div style={{ width: "80%" }}>{fullName}</div>
        <i
          onClick={() => {
            handleOpenProfile(id);
          }}
          className="pi pi-user"
          style={{ fontSize: "1.5rem", marginRight:"10px" }}
        />
        <Button
          onClick={()=>{handleApproveRequest(requestid, status)}}
          label="Approve&nbsp;&nbsp;&nbsp;&nbsp;_"
          severity="success"
          size="small"
          raised
        />
        &nbsp;&nbsp;
        <Button
          label="Reject&nbsp;&nbsp;&nbsp;&nbsp;_"
          severity="danger"
          size="small"
          raised
        />
      </div>
    );
  };

  return (
    <>
      &nbsp;
      <div className="card flex justify-content-center">
        <ListBox
          value={selectedConnection}
          onChange={(e) => {
            setSelectedConnection(e.value);
            console.log("do nothing");
          }}
          options={requests}
          itemTemplate={personTemplate}
          className="w-full sm:w-15rem md:w-30rem "
        />
      </div>
    </>
  );
};

export default Requests;
