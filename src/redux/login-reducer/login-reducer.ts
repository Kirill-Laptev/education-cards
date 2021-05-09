import { setUserDataAC, SetUserDataActionType } from './../profile-reducer/profile-reducer';
import { AppRootStateType } from './../store';
import { loginAPI } from './../../api/loginAPI';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

const initialState: InitialStateType = {
    isLoggedIn: false,
    error: ''
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType) => {
    switch(action.type){

        case 'SET_USER_DATA':
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
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'SET_USER_DATA', isLoggedIn} as const)
export const setErrorMessage = (errorMessage: string) => ({type: 'SET_ERROR_MESSAGE', errorMessage} as const)


// thunks
export const loginTC = (formData: {email: string, password: string, rememberMe: boolean}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const {data} = await loginAPI.fetchLoginData(formData)
            dispatch(setUserDataAC(data))
            dispatch(setIsLoggedIn(true))
        }
        catch(e){
            dispatch(setErrorMessage(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessage(''))
        }
    }
}


// types
type InitialStateType = {
    isLoggedIn: boolean,
    error: string
}

export type LoginActionsType = 
| ReturnType<typeof setIsLoggedIn>
| ReturnType<typeof setErrorMessage>
| SetUserDataActionType

type DispatchType = ThunkDispatch<AppRootStateType, unknown, LoginActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, LoginActionsType>
