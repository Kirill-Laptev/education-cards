import { setIsLoggedInAC, SetIsLoggedInActionType } from './../login-reducer/login-reducer';
import { SetUserDataActionType } from './../profile-reducer/profile-reducer';
import { loginAPI } from './../../api/loginAPI';
import { AppRootStateType } from './../store';
import { ThunkDispatch, ThunkAction } from "redux-thunk"
import { setUserDataAC } from '../profile-reducer/profile-reducer';

const initialState: InitialStateType = {
    isAppInicialized: false,
    error: ''
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
    switch(action.type){
        case 'app/SET_APP_INICIALIZED': 
            return {
                ...state,
                isAppInicialized: action.isInicialized
            }
        
        case 'app/SET_ERROR_MESSAGE': {
            return {
                ...state,
                error: action.errorMessage
            }
        }

        default:
            return state
    }
}

// actions
export const setAppInicializedAC = (isInicialized: boolean) => ({type: 'app/SET_APP_INICIALIZED', isInicialized} as const)
export const setErrorMessageAC = (errorMessage: string) => ({type: 'app/SET_ERROR_MESSAGE', errorMessage} as const)

// thunks
export const appInicializeTC = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const res = await loginAPI.authMe()
            dispatch(setUserDataAC(res.data))
            dispatch(setIsLoggedInAC(true))
        } catch(e){
            dispatch(setErrorMessageAC('АВТОРИЗУЙТЕСЬ!'))  // Исправить !
        } finally{
            dispatch(setAppInicializedAC(true))
        }
    }
}

// types
type InitialStateType = {
    isAppInicialized: boolean
    error: string
}

export type AppActionsType = 
| ReturnType<typeof setAppInicializedAC>
| ReturnType<typeof setErrorMessageAC>
| SetUserDataActionType
| SetIsLoggedInActionType


type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>