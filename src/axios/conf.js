import axios from "axios";
import { backendURL } from "../config";

const api = axios.create({
    baseURL: `${backendURL}`,
})


api.interceptors.request.use(
    function(config) {
        // auth using token in "headers"
        const token = localStorage.getItem("token");
        const trimToken = token ? token.replaceAll('"', '') : token;
        if (trimToken && trimToken !== "null") {
            config.headers.Authorization = `Token ${trimToken}`;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api;