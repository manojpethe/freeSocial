import { useEffect,useState } from 'react';
import { getConnections } from '../service/connectionService';
import { useSelector,useDispatch } from 'react-redux';
import { ListBox } from 'primereact/listbox';
import { useNavigate  } from 'react-router-dom';

const Connections = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.data);
  const dispatch = useDispatch();
  const [connections, setConnections] = useState([]);
  // const [selectedConnection, setSelectedConnection] = useState(null);


useEffect(() => {
  handleGetConnections();
}, [])

const handleGetConnections = async ()=> {
  const result = await getConnections(userInfo.id);
  setConnections(result);
}

const handleOpenChat =(item)=>{
  // console.log(item);
  if(Number.isInteger(item.id)){
    navigate("/main/chat/"+item.id);
  }
}

  return (
    <>
    <div className="card flex justify-content-center">  
            <ListBox filter value={""} onChange={(e) => handleOpenChat(e.value)} options={connections} optionLabel="fullName" className="w-full md:w-14rem" />
    </div>
    </>
  )
}

export default Connections