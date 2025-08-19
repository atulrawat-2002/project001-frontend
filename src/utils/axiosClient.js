import axios from "axios"
import { getItem, KEY_ACCESS_TOKEN, setItem, removeItem } from "./localStorageManager"
import store from "../redux/store";
import { setToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILUR, TOAST_SUCCESS } from "../App";


export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use((request) => {
    
    const accessToken = getItem(KEY_ACCESS_TOKEN);

    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
})

axiosClient.interceptors.response.use(async (response) => {
    
        
    try {
        const data = response?.data;
    const error = response?.data?.message;
    const originalRequest = response?.config;
        if (data.status === "OK") {
            return response;
        }

       store.dispatch(setToast({
                   type: TOAST_FAILUR,
                   message: error || response.message
               }))

        if (data.statusCode === 401 ) {
            const newResponse = await axios.create({
                withCredentials: true
            }).get(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refrsh`)

            if (newResponse?.data?.status === "error") {
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login', '_self');

                return Promise.reject(error);
            }

            setItem(KEY_ACCESS_TOKEN, newResponse?.data?.result?.accessToken);
            

            originalRequest.headers["Authorization"] = `Bearer ${newResponse?.result?.accessToken}`;

            return axios(originalRequest);
        }
    } catch (er) {
        store.dispatch(setToast({
        type: TOAST_FAILUR,
        message: er.message
       }))
    }


})