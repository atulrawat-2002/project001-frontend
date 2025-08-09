import Avatar from "../avatar/Avatar";
import "./Post.scss"
import backgroundImg from "../../assets/nature.jpg"
import { CiHeart } from "react-icons/ci";



function Post ( {post} ) {
    return <>
        <div className="post">
            <div className="heading">
                <Avatar />
                <h4>Narsimha Dev</h4>
            </div>
            <div className="content">
                <img src={backgroundImg} alt="" />
            </div>
            <div className="footer">
               <div className="likes">
                 <CiHeart className="icon  " />
                 <h4>4 Likes</h4>
               </div>
               <p className="caption" > This is Hot Air balloon </p>
               <h6 className="time-ago" >6 hrs Ago</h6>
            </div>
        </div>
    </>
}



export default Post;