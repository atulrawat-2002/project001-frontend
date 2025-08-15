import { useDispatch, useSelector } from "react-redux";
import "./PopUp.scss"
import { deletePost, setShowPopUp } from "../../redux/slices/appConfigSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { followAndUnFollow } from "../../redux/slices/feedSlice";
import { deleteFeedPost } from "../../redux/slices/postSlice";


const PopUp = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const params = useParams()
const [isMyProfile, setIsMyProfile] = useState(false);
const curUser = useSelector(state => state?.appConfigReducer?.myProfile);
const showPopUp = useSelector(state => state?.appConfigReducer?.showPopUp);

useEffect(() => {
    setIsMyProfile(curUser._id === params.userId)
    
}, [])

const handleDeletePost = async () => {
    
    try {
        const response = await axiosClient.delete("/posts/delete", {
        data: { postId: showPopUp?.postId }
    })
    
    dispatch(deletePost(showPopUp?.postId));
    dispatch(deleteFeedPost(showPopUp?.postId));

    } catch (error) {
        console.log(error);
        
    }   
}

const handleFollow = () => {
    dispatch(followAndUnFollow({
        toUserId: showPopUp?.userId
    }))

    // navigate(`/profile/${showPopUp?.userId}`)
}


    return <>
        <div className="action-list-container"  >
            <ul className="list-container" onClick={() => dispatch(setShowPopUp())} >
                { isMyProfile && <li className="list-item list-item-delete " onClick={() => handleDeletePost()} >Delete Post</li> }
                { isMyProfile && <li className="list-item">Edit Post</li> }
                { isMyProfile || <li className="list-item" onClick={() => navigate(`/profile/${showPopUp?.userId}`)} >View Profile</li> }
                {/* { isMyProfile || <li className="list-item list-item-delete " onClick={handleFollow} >Unfollow User</li> } */}
                   {
                    ( !(isMyProfile) && !(curUser?.followings?.includes(showPopUp?.userId)) )  && <li className="list-item follow-action " onClick={handleFollow} >Follow User</li>
                   } 
                   {
                    ( !(isMyProfile) && (curUser?.followings?.includes(showPopUp?.userId)) ) && <li className="list-item unfollow-action " onClick={handleFollow} >Unollow User</li>
                   }
                <li className="list-item">Cancel</li>
            </ul>
        </div>
    </>
}


export default PopUp;