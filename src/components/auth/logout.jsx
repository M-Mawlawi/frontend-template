import React,{ useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/auth";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        authService.logout();
        navigate("/signin");
    })
    
    return (
        <>
        </>
    )
}

export default Logout;