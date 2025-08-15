import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"
import { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";


const login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axiosClient.post("/auth/login", {
                email,
                password
            })

            if(response?.data?.result?.accessToken){
            const accessToken = response?.data?.result?.accessToken;
            
            setItem(KEY_ACCESS_TOKEN, accessToken);
            }
            navigate("/")
        } catch (error) {
            console.log(error);

        }

    }

    return <>
        <div className="login" >
            <div className="login-box" >
                <h2 className="heading">Login</h2>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" placeholder="example@gmail.com" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" className="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <input type="submit" value="Log In" className="submit" />
                    <p className="sub-heading" >Don't have an account? <Link to={"/signup"} >Sign Up</Link> </p>
                </form>
            </div>
        </div>
    </>
}


export default login;