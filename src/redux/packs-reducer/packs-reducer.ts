import { PacksType, NewPackResponseType } from './../../api/loginAPI';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {packsAPI} from "../../api/loginAPI";


const initialState: InitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    error: ''
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialState => {
    switch (action.type) {

        case 'packs/SET_PACKS':
            return {
                ...state,
                cardPacks: action.packs,
                cardPacksTotalCount: action.cardPacksTotalCount
            }

        case 'packs/SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.errorMessage
            }

        default:
            return state
    }
}


//actions
export const setPacksAC = (packs: Array<PacksType>, cardPacksTotalCount: number) => {
    return {type: 'packs/SET_PACKS' as const, packs, cardPacksTotalCount}
} 

const setErrorMessageAC = (errorMessage: string) => ({type: 'packs/SET_ERROR_MESSAGE', errorMessage} as const)

export const setNameAC = (name: string) => ({type: 'packs/SET_NAME_PACK', name} as const)

//thunks
export const getPacksTC = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await packsAPI.getPacks()
            dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount))
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const addNewPackTC = (): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            await packsAPI.addPack()
            dispatch(getPacksTC())
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const deletePackTC = (id: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            await packsAPI.deletePack(id)
            dispatch(getPacksTC())
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const UpdatePackTC = (_id: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            await packsAPI.updatePack(_id)
            dispatch(getPacksTC())
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}



//types
type InitialState = {
    cardPacks: Array<PacksType>
    cardPacksTotalCount: number
    error: string
}

export type PacksActionsType =
| ReturnType<typeof setPacksAC>
| ReturnType<typeof setErrorMessageAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, PacksActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, PacksActionsType>


// type CardsType = {
//     cardsCount: number
//     created: string
//     deckCover: null
//     grade: number
//     more_id: string
//     name: string
//     path: string
//     private: boolean
//     rating: number
//     shots: number
//     type: string
//     updated: string
//     user_id: string
//     user_name: string
// }