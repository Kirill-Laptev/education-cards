import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";


const initialState: InitialForgotStateType = {
    info: "",
    requestStatus: 'idle',
    error: ''
}



export const forgotReducer = (state = initialState, action: ForgotPassActionsType): InitialForgotStateType => {
    switch (action.type) {
        case 'SET_REQUEST_STATUS': {
            return {
                ...state,
                requestStatus: action.requestStatus,
                error: action.requestStatus === 'success'
                    ? ''
                    : state.error
            }
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.error,
                info: ''
            }
        }

        case 'SET_INFO': {
            return {
                ...state,
                info: action.info,
                error: ''
            }
        }
        default:
            return state
    }
}


//actions
const setInfoAC = (info: string) => ({type: 'SET_INFO',  info} as const)
const setErrorAC = (error: string) => ({type: 'SET_ERROR', error} as const)
const setRequestStatusAC = (requestStatus: string) => ({type: 'SET_REQUEST_STATUS', requestStatus} as const)

//thunks
export const forgotPassThunk = (email: string): ThunkType => (dispatch: DispatchType) => {
    dispatch(setRequestStatusAC('loading'))
     loginAPI.forgotPass(email)
        .then(response => {
                dispatch(setInfoAC(response.data.info))
                dispatch(setRequestStatusAC('failed'))
            })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            dispatch(setErrorAC(error))
            dispatch(setRequestStatusAC('failed'))
        })
}



//types
export type InitialForgotStateType = {
    info: string
    requestStatus: string
    error: string
}
export type ForgotPassActionsType = ReturnType<typeof setInfoAC>
    | ReturnType<typeof setRequestStatusAC>
    | ReturnType<typeof setErrorAC>


type DispatchType = ThunkDispatch<AppRootStateType, unknown, ForgotPassActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ForgotPassActionsType>
