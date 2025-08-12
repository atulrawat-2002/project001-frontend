import Post from "../post/Posts";
import "./Profile.scss"
import userImg from "../../assets/user.jpg"
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  getUserProfile } from "../../redux/slices/postSlice";
import { followAndUnFollow } from "../../redux/slices/feedSlice";

const Profile = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const params = useParams();
const [isMyProfile, setIsMyProfile] = useState(false);
const [isFollowing, setIsFollowing] = useState(false);


const userProfile = useSelector(state => state?.postsReducer?.userProfile);
const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);
const feedData = useSelector(state => state?.feedReducer?.feedData);

useEffect(() => {
    
    dispatch(getUserProfile({
        userId: params.userId
    }))    
    
    setIsFollowing(myProfile?.followings?.includes(params.userId));

    setIsMyProfile(myProfile._id === params.userId);
}, [myProfile, feedData, params.userId])


const handleFollowUnFollow = () => {
        dispatch(followAndUnFollow({
            toUserId: params.userId
        }))
        
        navigate(`/profile/${params.userId}`)
    }

    return <>
        <div className="profile">
            <div className="container">
                <div className="left-part">
                   {
                    isMyProfile &&  <CreatePost />
                   }
                    {userProfile?.posts &&  userProfile?.posts.map(post => <Post key={post._id} post={post} />) }
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img height="200px" width={"200px"} src={userProfile?.user?.avatar?.url} alt="user Image" className="user-img" />
                        <h3 className="user-name" > {userProfile?.user?.name} </h3>
                        <p className="bio" > {userProfile?.user?.bio} </p>
                        <div className="follower-info">
                            <h4> {userProfile?.user?.followers.length} Followers</h4>
                            <h4> {userProfile?.user?.followings.length} Followings </h4>
                        </div>
                        
                        { isMyProfile ? <button className="update-profile btn-secondary" onClick={() => navigate('/updateProfile')} >Update Profile</button> : ( isFollowing ?  <button onClick={handleFollowUnFollow} className="follow btn-secondary" >UnFollow</button> : <button onClick={handleFollowUnFollow} className="follow btn-primary" >Follow</button> ) }
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Profile;