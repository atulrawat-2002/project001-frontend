import { Outlet } from "react-router-dom";
import "./Home.scss";
import Navbar from "../../components/navbar/Navabr";


const Home = () => {
    
    return <>
    <Navbar />
    <div className="outlet" style={{marginTop: "60px"}} >
         <Outlet />
    </div>
   
    </>
}



export default Home;