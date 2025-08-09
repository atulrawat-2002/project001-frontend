import "./UpdateProfile.scss"
import userImg from "../../assets/user.jpg"


function UpdateProfile () {
    return <>
        <div className="update-profile">
            <div className="container">
                <div className="left-part">
                    <img  src={userImg} alt="" className="user-img" />
                </div>
                <div className="right-part">
                    <form action="">
                        <input type="text" placeholder="Your name" />
                        <input type="text" placeholder="Your bio" />
                        <input type="submit" className="btn-primary" placeholder="Update" />
                    </form>
                    <button className="delete-account btn-primary" >Delete Account</button>
                </div>
            </div>
        </div>
    </>
}

export default UpdateProfile;