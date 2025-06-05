import React, { useContext, useEffect, useState } from 'react'
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';

const Auth = () => {
    const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) setAuth(true);
  }, []);
  return (
    <>
    <AuthProvider>
    {auth ? <Admin/> : <Login/>}
    </AuthProvider>
    </>
  )
}

export default Auth
