import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { followAndUnFollow } from "./feedSlice";


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
        toastData: {},
        showPopUp: {
            value: false,
            userId: null,
            postId: null
        },
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToast: (state, action) => {
            state.toastData = action.payload;
        },
        setShowPopUp : (state, action) => {
            state.showPopUp.value = state.showPopUp.value === true ? false : true;
            state.showPopUp.userId = action.payload?.userId || state.showPopUp.userId;
            state.showPopUp.postId = action.payload?.postId || state.showPopUp.postId;
        },
        deletePost: (state, action) => {
            state.myProfile = {
                ...state.myProfile,
                posts: state?.myProfile?.posts.filter(post => post != action.payload)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload?.user;
        }).addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload?.user;
        }).addCase(followAndUnFollow.fulfilled, (state, action) => {
            const index = state?.myProfile?.followings?.indexOf(action.payload["toUserId"]);
            
            if(index != -1) {
                const user = state?.myProfile?.followings?.splice(index, 1);
            } else {
                state?.myProfile?.followings?.push(action.payload["toUserId"]);    
            }
        })
    }
})


export default appConfigSlice.reducer;
export const { setLoading, setToast, setShowPopUp, deletePost } = appConfigSlice.actions;
