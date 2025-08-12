import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss"
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";



const Navbar = () => {

    const dispatch = useDispatch();
    const navigat = useNavigate()
const navigate = useNavigate();
const myProfile = useSelector(state => state.appConfigReducer?.myProfile);

const handleLogOut = async () => {
    try {
        dispatch(setLoading(true));
    await axiosClient.post("/auth/logout");
    removeItem(KEY_ACCESS_TOKEN)
    navigat("/login");
    dispatch(setLoading(false))
    } catch (error) {
        console.log(error);   
    }
}

    return <>
        <div className="navbar" >
            
            <div className="container">
                <h2 onClick={() => navigate('/')} className="banner hover-link ">Social Media</h2>
                <div className="right-side">
                    <div className=" hover-link " onClick={() => navigate(`/profile/${myProfile?._id}`)} >
                        <Avatar src={myProfile?.avatar?.url} />
                    </div>
                    <div className="logout hover-link" onClick={handleLogOut} >
                        <RiLogoutBoxLine />
                    </div>
                </div>
            </div>
        </div>
    </>
}




export default Navbar;