import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {loginAPI} from "../../api/api";


const initialState: InitialSetNewPassType = {
    info: '',
    error: ''
}


export const passwordReducer = (state = initialState, action: PasswordActionsType): InitialSetNewPassType => {
    switch (action.type) {

        case 'password/SET_INFO': 
            return {
                ...state,
                info: action.info
            }

        case 'password/SET_ERROR': 
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}


//actions
const setInfoAC = (info: string) => ({type: 'password/SET_INFO', info} as const)
const setErrorAC = (error: string) => ({type: 'password/SET_ERROR', error} as const)

//thunks
export const newPasswordTC = (password: string, resetPasswordToken: string | undefined): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            const res = await loginAPI.setNewPassword({password, resetPasswordToken})
            dispatch(setInfoAC(res.data.info))
        } catch(e){
            dispatch(setErrorAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorAC(''))
        }
    }
}


//types
export type InitialSetNewPassType = {
    info: string
    error: string
}
export type PasswordActionsType = 
| ReturnType<typeof setInfoAC>
| ReturnType<typeof setErrorAC>


type DispatchType = ThunkDispatch<AppRootStateType, unknown, PasswordActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, PasswordActionsType>
