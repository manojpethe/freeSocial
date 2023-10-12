import { useEffect,useState } from 'react';
import { getConnections } from '../service/connectionService';
import { useSelector,useDispatch } from 'react-redux';
import { loadConnections } from '../redux/connections';
import { ListBox } from 'primereact/listbox';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo.data);
  const connections = useSelector((state) => state.connections.data);
  const dispatch = useDispatch();

useEffect(() => {
  handleGetConnections();
}, [])

const handleGetConnections = async ()=> {
  const result = await getConnections(userInfo.id);
  dispatch(loadConnections(result));
}

const handleOpenChat =(item)=>{
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