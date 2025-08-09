import Post from "../post/Posts";
import "./Profile.scss"
import userImg from "../../assets/user.jpg"
import { useNavigate } from "react-router-dom";

const Profile = () => {

const navigate = useNavigate();

    return <>
        <div className="profile">
            <div className="container">
                <div className="left-part">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img height="200px" width={"200px"} src={userImg} alt="user Image" className="user-img" />
                        <h3 className="user-name" >Ayan Kapoor</h3>
                        <div className="follower-info">
                            <h4>40 Followers</h4>
                            <h4>12 Followings</h4>
                        </div>
                        <button className="follow btn-primary" >Follow</button>
                        <button className="update-profile btn-secondary" onClick={() => navigate('/updateProfile')} >Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default Profile;