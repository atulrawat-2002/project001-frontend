import { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss"
import backgroundDummyImg from "../../assets/nature.jpg"
import { BsCardImage } from "react-icons/bs";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getMyInfo, setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postSlice";

const CreatePost = () => {

    const dispath = useDispatch();
    const [postImg, setPostImg] = useState(null);
    const [caption, setCaption] = useState('')
    const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);

    function handleUserImg (e) {
       const file = e.target.files[0];    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        if(fileReader.readyState === fileReader.DONE) {
            setPostImg(fileReader.result);            
        }
    }
    }

    const handlePostSubmit = async () => {
        try {
            dispath(setLoading(true));

            const response = await axiosClient.post("/posts/", {
            caption,
            postImg
        })
        dispath(getMyInfo())
        // dispath(getUserProfile({
        //     userId: myProfile?.userId
        // }));
        return response;

        } catch (e) {
            return Promise.reject(e)
        } finally{
            dispath(setLoading(false));
            setCaption("");
            setPostImg(null);
        }
    }

    return <>
        <div className="createPost">
            <div className="left-part">
                <Avatar src={myProfile?.avatar?.url} />
            </div>
            <div className="right-part">
                <input type="text" value={caption} className="captionInput" placeholder="What's on your mind?" onChange={e => setCaption(e.target.value)} />
                { postImg && <div className="img-container">
                    <img src={postImg} alt="post-img" className="post-img" />
                </div>}
                <div className="bottom-part">
                    <div className="input-post-img">
                         <label htmlFor="user-img" className="labelImg" >
                            <BsCardImage style={{cursor: "pointer"}} />
                        </label>
                        <input className="input-img" type="file" accept="image/*" name="user-img" id="user-img" onChange={handleUserImg} />
                    </div>
                    <button onClick={handlePostSubmit} className="btn-primary post-btn" >Post</button>
                </div>
            </div>
        </div>
    </>
}


export default CreatePost;