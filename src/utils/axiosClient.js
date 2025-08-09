import axios from "axios"
import { getItem, KEY_ACCESS_TOKEN, setItem, removeItem } from "./localStorageManager"

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use( (request) => {    
    const accessToken = getItem(KEY_ACCESS_TOKEN);

    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
} )

axiosClient.interceptors.response.use( async (response) => {    
    const data = response?.data;
    const error = response?.message;
    const originalRequest = response?.config;
    const method = response?.config?.method;
    
    
    // If the request was successfull then simply return the resonse
    try {
        if(data.status === "OK"){
            console.log("Ok part ran");
        return response;
    }

    // If the response failed due to Refresh Token expiring then logout the user
    if(data.statusCode === 401 && originalRequest.url === "/auth/refresh") {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login', '_self');
         
        return Promise.reject(error);
    }

    if(data.statusCode === 401) {
        const newResponse = await axios.create({
            withCredentials: true
        }).get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refrsh`)

        setItem(KEY_ACCESS_TOKEN, newResponse?.data?.result?.accessToken);

        console.log(newResponse?.data?.result?.accessToken);
        

        originalRequest.headers["Authorization"] = `Bearer ${newResponse?.result?.accessToken}`;

        return axios(originalRequest);
    }
    } catch (e) {
        console.log(e) 
    }
    
    
} )