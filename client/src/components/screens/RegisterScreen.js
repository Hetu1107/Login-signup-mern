import React, { useState ,useEffect} from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error,setError] = useState("");
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      navigate("/");
    }
  },[navigate]);
  const registerHandler = async (e)=>{
    e.preventDefault();
    const config = {
        header:{
            "Content-Type" : "application/json"
        }
    }
    if(password !=confirmPassword){
        setPassword("");
        setConfirmPassword("");
        setTimeout(()=>{
            setError("");
        },5000);
        return setError("password donot match")
    }
    try{
        const {data} = await axios.post("/api/auth/register",{username,email,password},config);
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
    <div className="register-screen">
      <form className="register-screen__form" onSubmit={registerHandler}>
        <h3 className="register-screen__title">Register</h3>
        {error && <span>{error}</span>}
        <div className="form-group">
          <label htmlFor="name">UserName :</label>
          <input
            type="text"
            required
            id="name"
            placeholder="enter username .."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            required
            id="email"
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
            id="password"
            placeholder="enter password .."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">confirm Password :</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="confirm password .."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <span className="register-screen__subtext">Already have an account ? <Link to="/login">login</Link></span>
      </form>
    </div>
  );
}

export default RegisterScreen;
