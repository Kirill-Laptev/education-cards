import { passwordReducer } from './password-reducer/password-reducer';
import { profileReducer, ProfileActionsType } from './profile-reducer/profile-reducer';
import { registrationReducer } from './registration-reducer/registration-reducer';
import { loginReducer, LoginActionsType } from './login-reducer/login-reducer';
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import {ForgotPassActionsType, forgotReducer} from "./forgot-reducer/forgot-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    password: passwordReducer,
    forgot: forgotReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType = 
| LoginActionsType
| ProfileActionsType
| ForgotPassActionsType

// @ts-ignore
window.store = store