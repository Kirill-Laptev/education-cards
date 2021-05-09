import { LoginResponseType } from './../../api/loginAPI';

const initialState: LoginResponseType | {} = {}

export const profileReducer = (state = initialState, action: ProfileActionsType) => {
    switch(action.type){

        case 'SET_USER_PROFILE': 
            return {
                ...state, 
                ...action.userData
            }

        default:
            return state
    }
}

export const setUserDataAC = (userData: LoginResponseType) => ({type: 'SET_USER_PROFILE', userData} as const)


// types 
export type SetUserDataActionType = ReturnType<typeof setUserDataAC>

export type ProfileActionsType = 
| SetUserDataActionType