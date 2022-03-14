import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");

  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      navigate("/");
    }
  },[navigate]);



  const loginHandler = async (e)=>{
    e.preventDefault();
    const config = {
        header:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const {data} = await axios.post("/api/auth/login",{email,password},config);
        localStorage.setItem("authToken",data.token);
        navigate("/");
    }catch(e){
        setError(e.response.data.error);
        setTimeout(()=>{
            setError("");
        },5000)
    }
  }
  return (
    <div className="login-screen">
      <form className="login-screen__form" onSubmit={loginHandler}>
        <h3 className="login-screen__title">Login</h3>
        {error && <span>{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            required
            // id="email"
            placeholder="enter email .."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password :</label>
          <input
            type="password"
            required
            // id="password"
            placeholder="enter password .."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default LoginScreen;
