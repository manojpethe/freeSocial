import { useEffect, useState } from "react";
import { getConnections } from "../service/connectionService";
import { useSelector, useDispatch } from "react-redux";
import { loadConnections } from "../redux/connections";
import { ListBox } from "primereact/listbox";
import { useNavigate } from "react-router-dom";
import { Badge } from "primereact/badge";

const Connections = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.data);
  const connections = useSelector((state) => state.connections.data);
  const [selectedConnection, setSelectedConnection] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetConnections();
  }, []);

  const handleGetConnections = async () => {
    const result = await getConnections(userInfo.id);
    dispatch(loadConnections(result));
  };

  const handleOpenChat = (id) => {
    navigate("/main/chat/" + id);
  };

  const handleOpenProfile = (id) => {
    navigate("/main/viewprofile/" + id);
  };

  const personTemplate = (option) => {
    // console.log(option);
    const id = option.id;
    const fullName = option.fullName;
    return (
      <div style={{ height: "2rem" }} className="flex align-items-center">
        <div style={{ width: "80%" }}>{fullName}</div>
        <i
          onClick={() => {
            handleOpenProfile(id);
          }}
          className="pi pi-user"
          style={{ fontSize: "1.5rem" }}
        ></i>
        &nbsp;&nbsp;
        <i
          onClick={() => {
            handleOpenChat(id);
          }}
          className="pi pi-comment p-overlay-badge"
          style={{ fontSize: "1.5rem" }}
        >
          {option.unseen ? (
            <Badge
              size={"small"}
              value={option.unseen}
              severity="danger"
            ></Badge>
          ) : (
            ""
          )}
        </i>
      </div>
    );
  };

  const handleSelectIem = (item) => {
    handleOpenProfile(item.id);
  };

  return (
    <>
      &nbsp;
      <div className="card flex justify-content-center">
        <ListBox
          filter
          value={selectedConnection}
          onChange={(e) => {
            setSelectedConnection(e.value);
            console.log("do nothing");
          }}
          optionLabel="fullName"
          options={connections}
          itemTemplate={personTemplate}
          className="w-full sm:w-15rem md:w-30rem "
        />
      </div>
    </>
  );
};

export default Connections;
