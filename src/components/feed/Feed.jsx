import { useEffect, useState } from "react";
import Follower from "../follower/Follower";
import Post from "../post/Posts";
import "./Feed.scss"
import { useDispatch, useSelector } from "react-redux";
import { getFeeData } from "../../redux/slices/feedSlice";
import PopUp from "../popUp/PopUp";

const Feed = () => {
    const dispatch = useDispatch();
    const feedData = useSelector(state => state?.feedReducer?.feedData);
    const showPopUp = useSelector(state => state?.appConfigReducer?.showPopUp);
    

    useEffect(() => {
        dispatch(getFeeData())
    }, [])

    return <>

    { showPopUp?.value ? <PopUp /> : "" }
        <div className="feed">
            <div className="container">
                <div className="left-part">
                  { feedData?.posts?.map(item => <Post key={item._id} post={item} />) }  
                </div>
                <div className="right-part">
                    <div className="followings">
                        <h3 className="title followings-title">You are following</h3>

                        {
                            feedData?.curUser?.followings.map(item => <Follower key={item._id} data={item} />)
                        }
                    </div>
                    <div className="suggestions">
                        <h3 className="title">Suggested for you</h3>
                        {
                            feedData?.suggestions?.map(item => <Follower key={item._id} data={item} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}



export default Feed;