import { passwordReducer } from './password-reducer/password-reducer';
import { profileReducer } from './profile-reducer/profile-reducer';
import { registrationReducer } from './registration-reducer/registration-reducer';
import { loginReducer, LoginActionsType } from './login-reducer/login-reducer';
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    password: passwordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType = 
| LoginActionsType