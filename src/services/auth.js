import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HttpError from "../components/httpError";
import api from "../axios/conf";


const login = async({ user, password }) => {
    try {
        const response = await api.post(
            "DEMO/api/v1/login", {
                user,
                password,
            }
        )
        if (response.data !== "undefined") {
            localStorage.setItem("token", response.data.token);
            return response.data;
        } else {
            return new HttpError(error);
        }
    } catch (error) {
        return new HttpError(error);
    }
};

const logout = async() => {
    try {
        // const response = await api.post(
        //     "/logout/"
        // );
        localStorage.removeItem('token');
        // return response.data;
    } catch (error) {
        console.log(error);
        return new HttpError(error);
    }
};

const isAuthenticated = () => {
    // Check if a token is present in localStorage
    const token = localStorage.getItem('token');
    return !!token;
};

const authService = { login, isAuthenticated, logout };

export default authService;