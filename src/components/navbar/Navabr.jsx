import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss"
import { RiLogoutBoxLine } from "react-icons/ri";
import LoadingBar from "react-top-loading-bar";
import { useRef, useState } from "react";



const Navbar = () => {

const loadingRef = useRef()
const [loading, setLoading] = useState(false);

function toggleLoading () {
    if(loading) {
        setLoading(false);
        loadingRef.current.complete();
    } else {
        setLoading(true);
        loadingRef.current.continuousStart(); 
    }
}

const navigate = useNavigate();

    return <>
        <div className="navbar" >
            <LoadingBar height={6} color="#458eff" ref={loadingRef} shadow={true} />
            <div className="container">
                <h2 onClick={() => navigate('/')} className="banner hover-link ">Social Media</h2>
                <div className="right-side">
                    <div className=" hover-link " onClick={() => navigate('/profile')} >
                        <Avatar />
                    </div>
                    <div className="logout hover-link" onClick={toggleLoading} >
                        <RiLogoutBoxLine />
                    </div>
                </div>
            </div>
        </div>
    </>
}




export default Navbar;