import { Outlet } from "react-router-dom";
import "./Home.scss";
import Navbar from "../../components/navbar/Navabr";


const Home = () => {

    return <>
    <Navbar />
    <Outlet />
    </>
}



export default Home;