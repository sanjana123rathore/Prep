
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import { AuthStore } from "../context/AuthContext";

const ProtectedRoutes = () => {

  const {user}=useContext(AuthStore);
  const navigate=useNavigate();

  if(user==null){
    return  navigate('/login');
  }
  
  return <Outlet/>
}

export default ProtectedRoutes;