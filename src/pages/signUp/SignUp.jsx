import { Link, useNavigate } from "react-router-dom";
import "./signUp.scss"
import { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";



const SignUp = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastNaame] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const result = await axiosClient.post("/auth/signup", {
            email,
            password
        });
        
        navigate("/login")
        } catch(error) {
            console.log(error);
            
        }
    }

    return <>
         <div className="sign" >
            <div className="sign-box" >
                <h2 className="heading">Sign Up</h2>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" className="first-name" value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" className="last-name" value={lastName} onChange={e => setLastNaame(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" className="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <input type="submit" value="Sign Up" className="submit" />
                    <p className="sub-heading" >Already have an account? <Link to={"/login"} >Log In</Link> </p>
                </form>
            </div>
        </div>
    </>
}


export default SignUp; 