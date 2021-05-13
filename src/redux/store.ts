import { appReducer, AppActionsType } from './app-reducer/app-reducer';
import { passwordReducer, PasswordActionsType } from './password-reducer/password-reducer';
import { profileReducer, ProfileActionsType } from './profile-reducer/profile-reducer';
import { registrationReducer, RegistrationActionsType } from './registration-reducer/registration-reducer';
import { loginReducer, LoginActionsType } from './login-reducer/login-reducer';
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import {ForgotPassActionsType, forgotReducer} from "./forgot-reducer/forgot-reducer";
import { packsReducer } from './packs-reducer/packs-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    password: passwordReducer,
    forgot: forgotReducer,
    app: appReducer,
    packs: packsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllAppActionsType = 
| LoginActionsType
| ProfileActionsType
| RegistrationActionsType
| ForgotPassActionsType
| PasswordActionsType
| AppActionsType


// @ts-ignore
window.store = store