import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams,useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getMessages, newMessage } from '../service/chatService';
import {Panel} from 'primereact/panel';

const Chat = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const connections = useSelector((state) => state.connections.data);
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [conversation,setConversation] = useState([]);
  

  useEffect(() => {
    console.log(connections);
    handleLoadMessages();
    let myInterval = setInterval(()=>{handleLoadMessages()},10000);
    return ()=> clearInterval(myInterval);
  }, [])

  const handleSendMessage = async ()=>{
    const result = await newMessage(userInfo.id,params.id,message);
    console.log(result);
    setConversation([...conversation,result])
    setMessage('');
    setTimeout(scrollToBottom(),500);
    // handleLoadMessages();
  }
  
  const scrollToBottom = ()=>{
    const bottomDiv = document.getElementById("chatWindowBottom");
    ReactDOM.findDOMNode(bottomDiv).scrollIntoView({behavior: "smooth", block: "start"});
  }

  const handleLoadMessages = async ()=>{
    const result = await getMessages(userInfo.id,params.id);
    setConversation(result);
    setTimeout(scrollToBottom(),1000);
  }

  const messageLine = (item) =>{
    if(item.fromid === userInfo.id){ 
      return (
      <div style={{ display:"flex"}} key={item.id}>
        <div style={{ borderRadius:"2px", marginTop:"2px", marginRight:"10px", padding:"2px", marginLeft: "auto", backgroundColor:"#1b662d", color:"white"}}>{item.message}</div>
      </div>)
    } else {
      return (
      <div style={{ display:"flex"}} key={item.id}>
        <div style={{ borderRadius:"2px", marginTop:"2px", marginLeft:"10px",padding:"2px", marginRight: "auto", backgroundColor:"gray", color:"white"}}>{item.message}</div>
      </div>)
    }
  }

  const getProfileName = (id)=>{
    return connections.map((item)=>( item.id == id ? item.fullName :"" ))
  }

  return (
    <>
    <div className="grid" style={{ "width": "100%" }}>
      <div className="col-12 lg:col-3 md:col-3 "></div>
      <div className="col-12 lg:col-6 md:col-6" style={{marginTop:"5px"}}>
        <Panel header={getProfileName(params.id)}>
        <div style={{ padding:"1px" , width:"100%",height:"70vh",backgroundColor:"#323633", overflow:"scroll"}}>
          <br/>
        { conversation.map(item=>{ return messageLine(item);})}
        <div style={{height:"100px"}} id="chatWindowBottom">&nbsp;</div>
        </div>
        <div style={{display:"flex", padding:"2px"}}>
          <div style={{ marginLeft:"5px", width:"80%", alignItems:"center"}}>
            <InputText value={message} onChange={(e)=>setMessage(e.target.value)} style={{width:"100%"}} />
          </div>
          <div style={{ width:"20%", textAlign:"center"}}>
            <Button width="100%" onClick={()=>{ handleSendMessage() }} label='Send' />
            {/* <button style={{width:"100%", borderBlockColor:"green", backgroundColor:"green"}} className='p-button'><center>Send</center></button> */}
          </div>
        </div>
        </Panel>
    {/* <div className="col-12 lg:col-3 md:col-3 "></div> */}
    </div>
    </div>

    </>
  )
  }

export default Chat