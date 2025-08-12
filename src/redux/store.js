import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice.js"
import postsReducer from "./slices/postSlice.js"
import feedReducer from "./slices/feedSlice.js"

export default configureStore({
    reducer: {
        appConfigReducer,
        postsReducer,
        feedReducer
    }
})