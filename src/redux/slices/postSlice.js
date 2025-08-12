import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk("user/getUserProfile", async(body, thunkAPI) => {
    try {        
        thunkAPI.dispatch(setLoading(true))
        
        const response = await axiosClient.post("/user/getUserProfile", body)
        
        return response.data.result;
        
    } catch (error) {
        return Promise.reject(error)
    } finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

export const likeAndUnlike = createAsyncThunk("posts/like", async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await axiosClient.post("/posts/like", body);

        return response?.data?.result?.post;

    } catch (error) {
        return Promise.reject(error)
    } finally {
        thunkAPI.dispatch(setLoading(false))
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        }).addCase(likeAndUnlike.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state?.userProfile?.posts?.findIndex(p => p._id === post._id);
           if( Array.isArray(state?.userProfile?.posts) && index != -1 ) {
            state.userProfile = {
                ...state.userProfile,
                posts: state?.userProfile?.posts.map(p => (p._id === post._id ? post : p))
            }
           }
            
        })
    }
})



export default postSlice.reducer;