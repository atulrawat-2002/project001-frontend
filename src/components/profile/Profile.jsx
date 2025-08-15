import Post from "../post/Posts";
import "./Profile.scss"
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  getUserProfile, showFollwersList } from "../../redux/slices/postSlice";
import { followAndUnFollow } from "../../redux/slices/feedSlice";
import PopUp from "../popUp/PopUp";
import FollowersList from "../followersList/FollowersLists";
import userImg from "../../assets/user.png"

const Profile = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const params = useParams();
const [isMyProfile, setIsMyProfile] = useState(false);
const [isFollowing, setIsFollowing] = useState(false);


const userProfile = useSelector(state => state?.postsReducer?.userProfile);
const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);
const feedData = useSelector(state => state?.feedReducer?.feedData);
const showPopUp = useSelector(state => state?.appConfigReducer?.showPopUp);
const { showList, listData} = useSelector(state => state?.postsReducer?.followersList);

useEffect(() => {
    
    dispatch(getUserProfile({
        userId: params.userId
    }))    
    
    setIsFollowing(myProfile?.followings?.includes(params.userId));

    setIsMyProfile(myProfile._id === params.userId); 
}, [myProfile, feedData?.suggestions?.length, feedData?.curUser?.followings?.length, params?.userId]) 


const handleFollowUnFollow = () => {
        dispatch(followAndUnFollow({
            toUserId: params.userId
        }))
        
        navigate(`/profile/${params.userId}`)
    }
    

    return <>

    { ( showList && listData?.length !== 0 ) && <FollowersList /> }

    { showPopUp?.value ? <PopUp /> : "" }
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
                        <img height="200px" width={"200px"} src={ userProfile?.user?.avatar?.url ? userProfile?.user?.avatar?.url : userImg } alt="user Image" className="user-img" />
                        <h3 className="user-name" > {userProfile?.user?.name} </h3>
                        <p className="bio" > {userProfile?.user?.bio} </p>
                        <div className="follower-info">
                            <h4 onClick={() => dispatch(showFollwersList({
                                showList: true,
                                listData: userProfile?.user?.followings,
                                relation: "Following"
                            }))} className="followers-list-link hover-link" > {userProfile?.user?.followings.length} Followings </h4>
                            <h4 onClick={() => dispatch(showFollwersList({
                                showList: true,
                                listData: userProfile?.user?.followers,
                                relation: "Followers"
                            }))} className=" followers-list-link hover-link" > {userProfile?.user?.followers.length} Followers</h4>
                        </div>
                        
                        { isMyProfile ? <button className="update-profile btn-secondary" onClick={() => navigate('/updateProfile')} >Update Profile</button> : ( isFollowing ?  <button onClick={handleFollowUnFollow} className="follow btn-secondary" >UnFollow</button> : <button onClick={handleFollowUnFollow} className="follow btn-primary" >Follow</button> ) }
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Profile;