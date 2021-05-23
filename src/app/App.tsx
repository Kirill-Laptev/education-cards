import React, { useEffect } from 'react'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../features/login/Login';
import Registration from '../features/registration/Registration'
import Header from '../components/Header/Header';
import ForgotPasswordForm from "../features/forgot-password/ForgotPasswordForm";
import NewPassword from "../features/new-password/NewPassword";
import Profile from '../features/profile/Profile';
import { AppRootStateType } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { appInicializeTC } from '../redux/app-reducer/app-reducer';
import Preloader from '../components/Preloader/Preloader';
import Packs from '../features/packs/Packs';
import RangeSlider from '../components/RangeSlider/RangeSlider'
import Cards from '../features/cards/Cards';
import Learn from '../features/learn/Learn';
// import { Test } from '../components/ModalPopup/ModalPopup';


const App = () => {

  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
  const isAppInicialized = useSelector<AppRootStateType, boolean>((state) => state.app.isAppInicialized)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appInicializeTC())
  }, [])


  return (
   <>
   <Header />
    {isAppInicialized 
      ? <div className='container'>     
            <Switch>
              <Route path='/login' render={() => <Login />}/>
              <Route path='/registration' render={() => <Registration />}/>
              <Route path='/profile' render={() => <Profile />}/>
              <Route path='/forgotpassword' render={() => <div><ForgotPasswordForm/></div>}/>
              <Route path='/newpassword' render={() => <div><NewPassword/></div>}/>
              <Route path='/packs' render={() => <Packs />}/>      
              <Route path='/cards/:id' render={() => <Cards />}/>  
              <Route path='/learn/:id' render={() => <Learn />}/> 
              {/* <Route path='/test' render={() => <Test />}/>    */}
              <Route path='/' render={() => <Profile />}/> 
              <Route path='*' render={() => <div>404 Not Found</div>}/>    
            </Switch>     
          </div>
    : <Preloader />}
   </>
  )
}

export default App;
