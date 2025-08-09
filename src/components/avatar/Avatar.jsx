import "./Avatar.scss"
import userImg from "../../assets/user.png"

const Avatar = ( {src} ) => {
    return <>
        <div className="avatar">
            <img src={src ? src : userImg} alt="" />
        </div>
    </>
}



export default Avatar;