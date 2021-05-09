import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../features/login/Login';
import Registration from '../features/registration/Registration'

const App = () => {
  return (
   <div>
     <Router>
       <Switch>
         <Route path='/login' render={() => <Login />}/>
         <Route path='/registration' render={() => <Registration />}/>
         <Route path='/profile' render={() => <div>Profile will be here</div>}/>
         <Route path='/forgotpassword' render={() => <div>Password recovery will be here</div>}/>
         <Route path='/newpassword' render={() => <div>Change password will be here</div>}/>      
         <Route path='/test' render={() => <div>View custom components will be here</div>}/>      
         <Route path='*' render={() => <div>404 Not Found</div>}/>    
       </Switch>
     </Router>
   </div>
  )
}

export default App;
