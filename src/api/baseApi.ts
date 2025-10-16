import type { AxiosInstance } from "axios";
import axios from "axios";

export interface  DataResponse<T>{
    code?: number;
    messge?:string;
    result:T;
}

export const baseApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers:{
        "Content-Type": "application/json"
    }
});

baseApi.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

baseApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if(error.response?.status === 401){
            console.log("token het han")
        }
        return Promise.reject(error);
    }
) 