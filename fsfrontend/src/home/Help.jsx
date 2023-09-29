import { useEffect } from 'react';
import axios from "axios";

const Help = () => {

  useEffect(() => {
    const response = axios.get("http://localhost:3000/users");
    response.then((res)=>console.log(res.data));
  }, [])
  


  return (
    <div>This is a Help Page</div>
  )
}

export default Help