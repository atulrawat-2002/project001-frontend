import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import Home from './pages/home/Home'
import RequireUser from './components/RequireUser'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route element={<RequireUser />} >
          <Route path='/' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </>
  )
}

export default App
