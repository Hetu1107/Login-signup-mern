// import React from 'react'
import {Route,Navigate, Routes} from 'react-router-dom';
const PrivateRoute = ({Component})=>{
      return localStorage.getItem("authToken") ? Component : <Navigate to="/login" />
}

export default PrivateRoute