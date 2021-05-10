import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../features/login/Login';
import Registration from '../features/registration/Registration'
import Header from '../components/Header/Header';
import ForgotPasswordForm from "../features/forgot-password/ForgotPasswordForm";
import NewPassword from "../features/new-password/NewPassword";


const App = () => {
  return (
   <>
    <Router>
    <Header />
      <div className='container'>     
        <Switch>
          <Route path='/login' render={() => <Login />}/>
          <Route path='/registration' render={() => <Registration />}/>
          <Route path='/profile' render={() => <div>Profile will be here</div>}/>
           <Route path='/forgotpassword' render={() => <div><ForgotPasswordForm/></div>}/>
          <Route path='/newpassword' render={() => <div><NewPassword/></div>}/>
          <Route path='/test' render={() => <div>View custom components will be here</div>}/>      
          <Route path='*' render={() => <div>404 Not Found</div>}/>    
        </Switch>     
      </div>
    </Router>
   </>
  )
}

export default App;
