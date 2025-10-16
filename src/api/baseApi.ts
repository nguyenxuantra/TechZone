import type { AxiosInstance } from "axios";
import axios from "axios";

export interface  DataResponse<T>{
    code?: number;
    messge?:string;
    result:T;
}

export interface Query{
    search?: string;
    page_no: number;
    page_size: number;
}

export const baseApi: AxiosInstance = axios.create({
    baseURL:  "http://localhost:8080",
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
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            console.log("token het han")
        }
        return Promise.reject(error);
    }
)

