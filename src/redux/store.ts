import { passwordReducer } from './password-reducer/password-reducer';
import { profileReducer } from './profile-reducer/profile-reducer';
import { registrationReducer } from './registration-reducer/registration-reducer';
import { loginReducer } from './login-reducer/login-reducer';
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    password: passwordReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>