import { loginAPI } from './../../api/loginAPI';
import { AppRootStateType } from './../store';
import { ThunkDispatch, ThunkAction } from "redux-thunk"

const initialState: InitialStateType = {
    isRegisterSuccess: false,
    error: ''
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType) => {
    switch(action.type){
        case 'SET_IS_REGISTER_SUCCESS':
            return {
                ...state,
                isRegisterSuccess: action.isRegister
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
export const setIsRegisterSuccessAC = (isRegister: boolean) => ({type: 'SET_IS_REGISTER_SUCCESS', isRegister} as const)
export const setErrorMessageAC = (errorMessage: string) => ({type: 'SET_ERROR_MESSAGE', errorMessage} as const)

// thunks
export const registrationTC = (data: {email: string, password: string}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await loginAPI.registration(data)
            dispatch(setIsRegisterSuccessAC(true))
        } catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}


// types
type InitialStateType = {
    isRegisterSuccess: boolean,
    error: string
}

export type RegistrationActionsType = 
| ReturnType<typeof setIsRegisterSuccessAC>
| ReturnType<typeof setErrorMessageAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, RegistrationActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, RegistrationActionsType>
