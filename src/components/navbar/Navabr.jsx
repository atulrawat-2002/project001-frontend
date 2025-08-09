import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss"



const Navbar = () => {
const navigate = useNavigate();

    return <>
        <div className="navbar" >
            <div className="container">
                <h2 onClick={() => navigate('/')} className="banner hover-link ">Social Media</h2>
                <div className="right-side">
                    <div className="profile hover-link " onClick={() => navigate('/profile/hjjhkhjkhj')} >
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    </>
}




export default Navbar;