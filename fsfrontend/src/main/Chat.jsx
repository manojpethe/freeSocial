import { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getMessages, newMessage } from '../service/chatService';

const Chat = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const params = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [conversation,setConversation] = useState([]);
  

  useEffect(() => {
    handleLoadMessages();
    let myInterval = setInterval(()=>{handleLoadMessages()},10000);
    return ()=> clearInterval(myInterval);
  }, [])

  // useEffect( () => () => {console.log("unmount");clearInterval(myInterval) }, [] );
  
  // const startLoadingConvrsation =()=>{
  //   handleLoadMessages();
  //   myInterval = setInterval(()=>{handleLoadMessages()},10000);
  // }

  const handleSendMessage = async ()=>{
    const result = await newMessage(userInfo.id,params.id,message);    
    setMessage('');
    handleLoadMessages();
  }

  const handleLoadMessages = async ()=>{
    const result = await getMessages(userInfo.id,params.id);
    setConversation(result);
    // console.log(Date.now().toLocaleString(),result);
  }

  const messageLine = (item) =>{
    if(item.fromid === userInfo.id){ 
      return (
      <div style={{ display:"flex"}} key={item.id}>
        <div style={{ borderRadius:"2px", marginTop:"2px", padding:"2px", marginLeft: "auto", backgroundColor:"green", color:"white"}}>{item.message}</div>
      </div>)
    } else {
      return (
      <div style={{ display:"flex"}} key={item.id}>
        <div style={{ borderRadius:"2px", marginTop:"2px", padding:"2px", marginRight: "auto", backgroundColor:"gray", color:"white"}}>{item.message}</div>
      </div>)
    }
  }

  return (
    <>
    <div>Chat id: {params.id}</div>
    <div style={{width:"100%",height:"70vh",backgroundColor:"white", overflow:"scroll"}}>
      <br/>
    { conversation.map(item=>{ return messageLine(item);})}
    </div>
    <div style={{display:"flex"}}>
      <div style={{ marginLeft:"5px", width:"80%", alignItems:"center"}}>
        <InputText value={message} onChange={(e)=>setMessage(e.target.value)} style={{width:"100%"}} />
      </div>
      <div style={{ width:"20%", textAlign:"center"}}>
        <Button onClick={()=>{ handleSendMessage() }} label='Send' />
      </div>
    </div>
    </>
  )
}

export default Chat