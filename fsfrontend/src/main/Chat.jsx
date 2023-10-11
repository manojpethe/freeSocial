import React from 'react'
import { useParams,useNavigate  } from 'react-router-dom'


const Chat = () => {
    // const userInfo = useSelector((state) => state.userInfo.data);
    const params = useParams();
    const navigate = useNavigate();
  return (
    <div>Chat id: {params.id}</div>
  )
}

export default Chat