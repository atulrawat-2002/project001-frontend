import { useEffect } from "react";
import "./Home.scss";
import { axiosClient } from "../../utils/axiosClient";


const Home = () => {

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const result = await axiosClient("/posts/all");
    }

    return <>
    <div>
         Home
    </div>
    </>
}



export default Home;