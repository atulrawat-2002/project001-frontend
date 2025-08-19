import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navabr";
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigSlice";
import { useDispatch } from "react-redux";


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyInfo())
    }, [])
    
    return <>
    <Navbar />
    <div className="outlet" style={{marginTop: "60px"}} >
         <Outlet />
    </div>
   
    </>
}



export default Home;