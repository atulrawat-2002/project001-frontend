import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getMyInfo = createAsyncThunk("user/getMyInfo", async(body, thunkAPI) =>{
    try {
        
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient("/user/getMyInfo");
        
        return response?.data?.result;
        
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(false));
    }
} )


export const updateMyProfile = createAsyncThunk("user/updateMyProfile", async(body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.put("/user/updateMyProfile", body)
        
        return response.data.result;

    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState: {
        isLoading: false,
        myProfile: {},
        toastData: {}
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToast: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload?.user;
        }).addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload?.user;
        })
    }
})


export default appConfigSlice.reducer;
export const { setLoading, setToast } = appConfigSlice.actions;
