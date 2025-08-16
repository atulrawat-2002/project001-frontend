import { useDispatch, useSelector } from "react-redux";
import "./FollowersList.scss"
import { showFollwersList } from "../../redux/slices/postSlice";
import Avatar from "../avatar/Avatar";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { followAndUnFollow } from "../../redux/slices/feedSlice";


const FollowersList = () => {

    const { listData, relation } = useSelector(state => state?.postsReducer?.followersList);
    const myFollowings = useSelector(state => state?.appConfigReducer?.myProfile?.followings);
    const curUser = useSelector(state => state?.appConfigReducer?.myProfile);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    function handleFollow(toUserId) {
        dispatch(followAndUnFollow({
            toUserId: toUserId
        }))
        dispatch(showFollwersList({
            showList: false
        }))
    }


    return <>
        <div className="followers-list-container " >
            <div className="list-header">

                <div className="hide-icon">
                    <RxCross2 size={"30px"} color="black" onClick={() => dispatch(showFollwersList({
                        showList: false
                    }))} />
                </div>
                <h2 className="list-heading" > {relation} </h2>

            </div>
            <div className="list-content">

                {
                    listData?.map((item) => {
                        if (curUser._id !== item._id) {
                            return <div key={item?._id} className="list-items">
                                <div className="list-left-part hover-link " onClick={() => {
                                    navigate(`/profile/${item?._id}`)
                                    dispatch(showFollwersList({
                                        showList: false
                                    }))
                                }} >
                                    <Avatar src={item?.avatar?.url} />
                                    <h4 className="list-item-name" > {item?.name} </h4>
                                </div>
                                <div className="list-right-part">

                                    {
                                        myFollowings?.includes(item?._id) ? <button className="unfollow-action-btn  " onClick={() => handleFollow(item?._id)} > Unfollow </button> : <button className="follow-action-btn  " onClick={() => handleFollow(item?._id)} > Follow </button>

                                    }

                                </div>
                            </div>
                        }
                    })
                }



            </div>
        </div>
    </>
}


export default FollowersList;