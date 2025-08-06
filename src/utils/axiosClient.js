import axios from "axios"
import { getItem, KEY_ACCESS_TOKEN, setItem, removeItem } from "./localStorageManager"

export const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

axiosClient.interceptors.request.use( (request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);

    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
} )

axiosClient.interceptors.response.use( (response) => {
    const data = response.data;
    if(data.status === "Ok"){
        return response;
    }
    
} )