import axios from "axios"
import { getItem, KEY_ACCESS_TOKEN, setItem, removeItem } from "./localStorageManager"

export const axiosClient = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

axiosClient.interceptors.request.use( (request) => {
    console.log("Request interceptor ran");
    
    const accessToken = getItem(KEY_ACCESS_TOKEN);

    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
} )

axiosClient.interceptors.response.use( async (response) => {
    console.log("Response interceptor ran");
    
    const data = response?.data;
    const error = response?.message;
    const originalRequest = response?.config;
    // console.log("this is response", response, " and response.data ",  data, "response.error", error, "response.originlrequest",originalRequest);
    console.log(data.status);
    
    // If the request was successfull then simply return the resonse
    try {
        if(data.status === "OK"){
            console.log("Ok part ran");
            console.log(response);
        return response;
    }

    // If the response failed due to Refresh Token expiring then logout the user
    if(data.statusCode === 401 && originalRequest.url === "/auth/refresh") {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login', '_self');
        console.log("refresh expire");
        
        return Promise.reject(error);
    }

    if(data.statusCode === 401) {
        const accessToken = await axiosClient("/auth/refresh", { withCredentials: true });

        setItem(KEY_ACCESS_TOKEN, accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        let newResponse = await axiosClient(originalRequest.url, { withCredentials: true });
        console.log("simple 401");
        

        return newResponse;
    }
    } catch (e) {
        console.log(e)
    }
    

    return response;

    
} )