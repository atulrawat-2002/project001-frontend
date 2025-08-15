import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { getMyInfo, setLoading } from "./appConfigSlice";
import { likeAndUnlike } from "./postSlice";

export const getFeeData = createAsyncThunk("user/getFeedData", async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get("/user/getFeedData");

        return response?.data?.result;
    } catch (error) {
        return Promise.reject(error)
    } finally {
        thunkAPI.dispatch(setLoading(false));
    }
})

export const followAndUnFollow = createAsyncThunk("user/followAndUnFollow", async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        await axiosClient.post("/user/follow", body);

        return body;

    } catch (error) {
        return Promise.reject(error)
    } finally {
        // thunkAPI.dispatch(getFeeData());        
        // thunkAPI.dispatch(getMyInfo())
        thunkAPI.dispatch(setLoading(false))
    }
})

const feedSlice = createSlice({
    name: 'feedSlice',
    initialState: {
        feedData: {}
    },
    extraReducers: (builder) => {
        builder.addCase(getFeeData.fulfilled, (state, action) => {
            state.feedData = action.payload;
        }).addCase(likeAndUnlike.fulfilled, (state, action) => {
            const post = action.payload;
            const index = state?.feedData?.posts?.findIndex(p => p._id === post._id);
            if (Array.isArray(state?.feedData?.posts) && index != -1) {
                state.feedData = {
                    ...state.feedData,
                    posts: state?.feedData?.posts.map(p => (p._id === post._id ? post : p))
                }
            }
        }).addCase(followAndUnFollow.fulfilled, (state, action) => {
                                
            const index = state.feedData.suggestions.findIndex(item => item._id === action.payload["toUserId"]);
            if(index != -1) {
                const user = state.feedData.suggestions.splice(index, 1);
                state?.feedData?.curUser?.followings.push(user[0]);

            } else {
                const followIndex = state?.feedData?.curUser?.followings.findIndex(item => item._id === action.payload["toUserId"]);
                
                if(followIndex != -1) {
                    
                    const user = state.feedData.curUser.followings.splice(followIndex, 1);
                    state.feedData.suggestions.push(user[0]);
                }
            }
            
        } )
    }
})


export default feedSlice.reducer;
export const { followUser } = feedSlice.actions