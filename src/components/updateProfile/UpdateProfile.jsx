import "./UpdateProfile.scss"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";


function UpdateProfile () {
const myProfile = useSelector(state => state?.appConfigReducer?.myProfile);
const dispatch = useDispatch();

const [name, setName] = useState('');
const [bio, setBio] = useState('');
const [userImg, setUserImg] = useState(null)

useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.userImg);
}, [myProfile])

const handleUserImg = async (e) => {
    const file = e.target.files[0];    
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        if(fileReader.readyState === fileReader.DONE) {
            setUserImg(fileReader.result);            
        }
    }
}

const handleDelete = async () => {
   try {
    dispatch(setLoading(true))
     await axiosClient.delete("/user/deleteMyProfile");
     removeItem(KEY_ACCESS_TOKEN);
     window.location.replace('/login')
   } catch (error) {
    console.log(error);
   } finally {
    dispatch(setLoading(false))
   }
}

async function handleSubmit (e) {
    e.preventDefault()
    dispatch(updateMyProfile({
        name,
        bio,
        userImg
    }));
}

    return <>
        <div className="update-profile">
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="user-img" className="labelImg" >
                            <img src={userImg} alt={name} />
                        </label>
                        <input className="input-img" type="file" accept="image/*" name="user-img" id="user-img" onChange={handleUserImg} />
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit} >
                        <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                        <input type="text" placeholder="Your bio" value={bio} onChange={e => setBio(e.target.value)} />
                        <input type="submit" className="btn-primary submit-btn " placeholder="Update" />
                    </form>
                    <button className="delete-account btn-primary" onClick={handleDelete} >Delete Account</button>
                </div>
            </div>
        </div>
    </>
}

export default UpdateProfile;