import Follower from "../follower/Follower";
import Post from "../post/Posts";
import "./Feed.scss"

const Feed = () => {
    return <>
        <div className="feed">
            <div className="container">
                <div className="left-part">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-part">
                    <div className="followings">
                        <h3 className="title">You are following</h3>

                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                    <div className="suggestions">
                        <h3 className="title">Suggested for you</h3>

                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                </div>
            </div>
        </div>
    </>
}



export default Feed;