import "./Login.scss"


const login = () => {
    return <>
        <div className="login" >
            <div className="login-box" >
                <h2 className="heading">Login</h2>
                <form action="">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" />

                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" className="password" />

                    <input type="submit" value="Submit" className="submit" />
                </form>
            </div>
        </div>
    </>
}


export default login;