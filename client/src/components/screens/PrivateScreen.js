import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function PrivateScreen({history}) {
  const [error,setError] = useState("");
  const [privateData,setPrivateData] = useState("");
  let navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
        navigate("/login");
    }
    const fetchData = async ()=>{
      const config = {
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    try{
      const {data} = await axios.get("/api/private",config);
      console.log(data);
      setPrivateData(data.data);
    }catch(e){
      localStorage.removeItem("authToken");
      setError("you r not authorised please login");
    }
    }
    fetchData();
  },[navigate]);
  const logoutHandler = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    error ? <span className='error-message'>{error}</span> : <>
    <div>{privateData.username}</div>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default PrivateScreen