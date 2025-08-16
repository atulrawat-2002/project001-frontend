import { useDispatch, useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";
import "./Follower.scss"
import { useEffect, useState } from "react";
import { followAndUnFollow, followUser } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";


function Follower ({data}) {
    const dispatch = useDispatch()
    const feedData = useSelector(state => state?.feedReducer?.feedData);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setIsFollowing(feedData?.curUser?.followings.includes(data))
        
    }, [feedData?.curUser])
    
    const handleFollowUnFollow = () => {
        dispatch(followAndUnFollow({
            toUserId: data._id
        }))

        
    }

    return <>
        <div className="follower follower-in-feed "  >
            <div className="user-info user-in-feed " onClick={ () => navigate(`/profile/${data._id}`)} >  
                <Avatar src={data?.avatar?.url} />
            <h4 className="name name-in-feed">{data?.name}</h4>
            </div>
            <h5 className={isFollowing ? "follow-in-feed hover-link follow-link " : "btn-primary"}  onClick={handleFollowUnFollow} > {isFollowing ? "Unfollow" : "Follow"} </h5>
        </div>
    </>
}


export default Follower;