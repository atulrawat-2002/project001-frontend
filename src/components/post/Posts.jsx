import Avatar from "../avatar/Avatar";
import "./Post.scss"
import { useDispatch } from "react-redux";
import { likeAndUnlike } from "../../redux/slices/postSlice";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { setToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";



function Post ( {post} ) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLike = () => {
        dispatch(setToast({
            type: TOAST_SUCCESS,
            message: 'liked or unliked'
        }))

        dispatch(likeAndUnlike({
            postId: post._id
        }))
    }

    return <>
        <div className="post">
            <div className="heading" onClick={() => navigate(`/profile/${post?.owner?._id}`)} >
                <Avatar src={post?.owner?.avatar?.url} />
                <h4> {post?.owner?.name} </h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="" />
            </div>
            <div className="footer">
               <div className="likes" onClick={handleLike}>
                 {
                    post?.isLiked ? <IoMdHeart style={{color: "#458eff"}} className="icon " />  : <IoIosHeartEmpty className="icon " /> 
                 }
                 <h4> {post?.likesCount} Likes</h4>
                 
               <div className="del-btn" >Delete</div>
               </div>
               <p className="caption" > {post?.caption} </p>
               <h6 className="time-ago" > {post?.timeAgo} </h6>
            </div>
        </div>
    </>
}



export default Post;