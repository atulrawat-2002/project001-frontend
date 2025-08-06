import { Link, Links } from "react-router-dom";
import "./signUp.scss"



const SignUp = () => {
    return <>
         <div className="sign" >
            <div className="sign-box" >
                <h2 className="heading">Sign Up</h2>
                <form action="">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" className="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" className="last-name"/>

                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" />

                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" className="password" />

                    <input type="submit" value="Sign Up" className="submit" />
                    <p className="sub-heading" >Already have an account? <Link to={"/login"} >Log In</Link> </p>
                </form>
            </div>
        </div>
    </>
}


export default SignUp; 