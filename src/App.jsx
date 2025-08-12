import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import Home from './pages/home/Home'
import RequireUser from './components/RequireUser'
import Feed from './components/feed/Feed'
import Profile from './components/profile/Profile'
import UpdateProfile from './components/updateProfile/UpdateProfile'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import UserNotRequired from './components/userNotRequired'
import toast, { Toaster } from 'react-hot-toast'

export const TOAST_SUCCESS = 'toast_success'
export const TOAST_FAILUR = 'toast_failur'


function App() {
  const loadingRef = useRef(null)
  const isLoading = useSelector(state => state?.appConfigReducer?.isLoading);
  const toastData = useSelector(state => state?.appConfigReducer?.toastData);

  useEffect(() => {
    if(isLoading) {
      loadingRef.current?.continuousStart();
    }else {
      loadingRef.current?.complete();
    }
  }, [isLoading])


  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData?.message);
        break;
    
      case TOAST_FAILUR:
        toast.error(toastData?.message)
        break;
    }
  }, [toastData])

  return (
    <>
      <div>
          <LoadingBar color="#458eff" ref={loadingRef} shadow={true} />
          <div><Toaster /></div>
        <Routes>
          <Route element={<RequireUser />} >
            <Route element={<Home />}>
              <Route path='/' element={<Feed />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/updateProfile' element={<UpdateProfile />} />
            </Route>
          </Route>
          <Route element={<UserNotRequired />} >
            <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
