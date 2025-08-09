import Avatar from "../avatar/Avatar";
import "./Follower.scss"


function Follower () {
    return <>
        <div className="follower">
            <div className="user-info">
                <Avatar />
            <h4 className="name">Ayan</h4>
            </div>
            <h5 className="hover-link follow-link ">Follow</h5>
        </div>
    </>
}


export default Follower;