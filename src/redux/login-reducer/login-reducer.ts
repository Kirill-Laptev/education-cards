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
                isLoggedIn: true
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
export const setIsLoggedIn = () => ({type: 'SET_USER_DATA'} as const)
export const setErrorMessage = (errorMessage: string) => ({type: 'SET_ERROR_MESSAGE', errorMessage} as const)


// thunks
export const loginTC = (formData: {email: string, password: string, rememberMe: boolean}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const res = await loginAPI.fetchLoginData(formData)
            dispatch(setIsLoggedIn())
        }
        catch(e){
            console.log(e.response)
            dispatch(setErrorMessage(e.response.data.error))
            dispatch(setErrorMessage(''))
        }
    }
}


// types
type InitialStateType = {
    isLoggedIn: boolean,
    error: string
}

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export type LoginActionsType = 
| SetIsLoggedInActionType
| ReturnType<typeof setErrorMessage>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, LoginActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, LoginActionsType>
