import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getMessages, newMessage,clearUnseen } from "../service/chatService";
import { Panel } from "primereact/panel";
import { ScrollPanel } from "primereact/scrollpanel";
import moment from "moment";

const Chat = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const connections = useSelector((state) => state.connections.data);
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // console.log(connections);
    handleLoadMessages();
    let myInterval = setInterval(() => {
      handleLoadMessages();
    }, 10000);
    return () => {clearInterval(myInterval); handleClearUnseen(params.id, userInfo.id) ; console.log("unseen badge cleared")}
  }, []);

  const handleClearUnseen = async (fromid,toid) =>{
    const result = await clearUnseen(fromid,toid);
  }

  const handleSendMessage = async () => {
    const result = await newMessage(userInfo.id, params.id, message);
    // console.log(result);
    setConversation([...conversation, result]);
    setMessage("");
    setTimeout(scrollToBottom(), 500);
    // handleLoadMessages();
  };

  const scrollToBottom = () => {
    const bottomDiv = document.getElementById("chatWindowBottom");
    ReactDOM.findDOMNode(bottomDiv).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLoadMessages = async () => {
    const result = await getMessages(userInfo.id, params.id);
    setConversation(result);
    setTimeout(scrollToBottom(), 1000);
  };

  const messageLine = (item) => {
    if (item.fromid === userInfo.id) {
      return (
        <div style={{ display: "flex" }} key={item.id}>
          <div
            style={{
              borderRadius: "3px",
              marginTop: "4px",
              marginRight: "10px",
              padding: "2px",
              marginLeft: "auto",
              backgroundColor: "gray",
              color: "white",
            }}
          >
            {item.message} <sub><span className="text-xs"> {moment(item.createdAt).format('HH:mm')} </span></sub>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }} key={item.id}>
          <div
            style={{
              borderRadius: "3px",
              marginTop: "4px",
              marginLeft: "10px",
              padding: "2px",
              marginRight: "auto",
              backgroundColor: "pink",
              color: "black",
            }}
          >
            {item.message} <sub><span className="text-xs"> {moment(item.createdAt).format('HH:mm')} </span></sub>
          </div>
        </div>
      );
    }
  };

  const getProfileName = (id) => {
    return connections.map((item) => (item.id == id ? item.fullName : ""));
  };

  return (
    <>
      <div className="grid" style={{ width: "100%" }}>
        <div className="col-12 lg:col-3 md:col-3 "></div>
        <div className="col-12 lg:col-6 md:col-6" style={{marginLeft:"5px"}}>
          <ScrollPanel header={getProfileName(params.id)}>
            <div className="text-base" style={{"textAlign":"center"}} ><b>{getProfileName(params.id)}</b></div>
            <div
              style={{
                padding: "1px",
                width: "100%",
                height: "66vh",
                backgroundColor: "white",
                overflow: "scroll",
              }}
            >
              <br />
              {conversation.map((item) => {
                return messageLine(item);
              })}
              <div style={{ height: "100px" }} id="chatWindowBottom">
                &nbsp;
              </div>
            </div>
            <div style={{ display: "flex", padding: "2px" }}>
              <div
                style={{
                  marginLeft: "5px",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <InputText
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ width: "20%", textAlign: "center" }}>
                <Button
                  width="100%"
                  onClick={() => {
                    handleSendMessage();
                  }}
                  label="Send"
                />
                {/* <button style={{width:"100%", borderBlockColor:"green", backgroundColor:"green"}} className='p-button'><center>Send</center></button> */}
              </div>
            </div>
          </ScrollPanel>
          {/* <div className="col-12 lg:col-3 md:col-3 "></div> */}
        </div>
      </div>
    </>
  );
};

export default Chat;
