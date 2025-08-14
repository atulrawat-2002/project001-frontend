import { useDispatch, useSelector } from "react-redux";
import "./FollowersList.scss"
import { showFollwersList } from "../../redux/slices/postSlice";
import Avatar from "../avatar/Avatar";
import { RxCross2 } from "react-icons/rx";


const FollowersList = () => {

    const listData = useSelector(state => state?.postsReducer?.followersList?.listData);
    const dispatch = useDispatch();
    

    return <>
        <div className="followers-list-container">
            <div className="list-header">
            
            <div className="hide-icon">
                <RxCross2 size={"30px"} color="black" onClick={() => dispatch(showFollwersList({
                showList: false
            }))} />
            </div>
        <h2 className="list-heading" >Followers</h2>

            </div>
            {
                listData?.map( (item) => {
                    return <div className="list-items">
                        <div className="list-left-part">
                            <Avatar src={item?.avata?.url} />
                            <h4 className="list-item-name" > {item?.name} </h4>
                        </div>
                        <div className="list-right-part">
                            <button className="btn-primary" > Unfollow </button>
                        </div>
                    </div>
                } )
            }
            
            
        </div>
    </>
}


export default FollowersList;