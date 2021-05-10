import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";

const initialState: InitialForgotStateType = {
    info: '',
    error: ''
}

export const forgotReducer = (state = initialState, action: ForgotPassActionsType): InitialForgotStateType => {
    switch (action.type) {

        case 'forgot/SET_INFO': 
            return {
                ...state,
                info: action.info
            }

        case 'forgot/SET_ERROR': 
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}


//actions
export const setInfoAC = (info: string) => ({type: 'forgot/SET_INFO',  info} as const)
export const setErrorAC = (error: string) => ({type: 'forgot/SET_ERROR', error} as const)

//thunks
export const forgotPassTC = (email: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const res = await loginAPI.forgotPass(email)
            dispatch(setInfoAC(res.data.info))
        } catch(e){
            dispatch(setErrorAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorAC(''))
        }
    }
}


//types
export type InitialForgotStateType = {
    info: string
    error: string
}
export type ForgotPassActionsType = 
| ReturnType<typeof setInfoAC>
| ReturnType<typeof setErrorAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, ForgotPassActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ForgotPassActionsType>
