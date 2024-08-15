import React from 'react';
import {Outlet,Navigate} from 'react-router-dom'

const PrivateComponent=()=>{
  let auth = localStorage.getItem("blogToken")
  return auth ? <Outlet /> : <Navigate to="/login"/>
};
export default PrivateComponent;