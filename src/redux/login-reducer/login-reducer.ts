import { setUserDataAC, SetUserDataActionType } from './../profile-reducer/profile-reducer';
import { AppRootStateType } from './../store';
import { loginAPI } from '../../api/api';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

const initialState: InitialStateType = {
    isLoggedIn: false,
    error: ''
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType) => {
    switch(action.type){

        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }

        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.errorMessage
            }

        default:
            return state
    }
}


// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'SET_IS_LOGGED_IN', isLoggedIn} as const)
export const setErrorMessageAC = (errorMessage: string) => ({type: 'SET_ERROR_MESSAGE', errorMessage} as const)


// thunks
export const loginTC = (formData: {email: string, password: string, rememberMe: boolean}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const {data} = await loginAPI.fetchLoginData(formData)
            dispatch(setUserDataAC(data))
            dispatch(setIsLoggedInAC(true))
        }
        catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const logoutTC = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await loginAPI.logout()
            dispatch(setIsLoggedInAC(false))
        }
        catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}


// types
type InitialStateType = {
    isLoggedIn: boolean,
    error: string
}

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

export type LoginActionsType = 
| SetIsLoggedInActionType
| ReturnType<typeof setErrorMessageAC>
| SetUserDataActionType

type DispatchType = ThunkDispatch<AppRootStateType, unknown, LoginActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, LoginActionsType>
