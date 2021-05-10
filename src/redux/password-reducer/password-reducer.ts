import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";


const initialState: InitialSetNewPassType = {
    info: "",
    requestStatus: 'idle',
    error: ''
}


export const passwordReducer = (state = initialState, action: passwordActionsThunk): InitialSetNewPassType => {
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
const setInfoAC = (info: string) => ({type: 'SET_INFO', info} as const)
const setErrorAC = (error: string) => ({type: 'SET_ERROR', error} as const)
const setRequestStatusAC = (requestStatus: string) => ({type: 'SET_REQUEST_STATUS', requestStatus} as const)

//thunks
export const passwordThunk = (password: string, resetPasswordToken: string | undefined): ThunkType => (dispatch: DispatchType) => {
    dispatch(setRequestStatusAC('loading'))
    loginAPI.setNewPassword({password, resetPasswordToken})
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
export type InitialSetNewPassType = {
    info: string
    requestStatus: string
    error: string
}
export type passwordActionsThunk = ReturnType<typeof setInfoAC>
    | ReturnType<typeof setRequestStatusAC>
    | ReturnType<typeof setErrorAC>


type DispatchType = ThunkDispatch<AppRootStateType, unknown, passwordActionsThunk>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, passwordActionsThunk>
