import { AppRootStateType } from './../store';
import { PacksType } from '../../api/api';
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {packsAPI} from "../../api/api";


const initialState: InitialState = {
    packs: [],
    packsTotalCount: 0,
    error: '',
    requestParams: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '0updated',
        page: 1,
        pageCount: 10,
        userId: '',
        // token: ''
    }
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialState => {
    switch (action.type) {

        case 'packs/SET_PACKS':
            return {
                ...state,
                packs: action.packs,
                packsTotalCount: action.cardPacksTotalCount
            }

        case 'packs/SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.errorMessage
            }

        case 'packs/UPDATE_PARAMS_REQUEST':
            return {
                ...state,
                requestParams: {...state.requestParams, ...action.newParams}
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

export const updateRequestParamsAC = (newParams: GetPacksRequestType) => ({type: 'packs/UPDATE_PARAMS_REQUEST', newParams} as const)

// export const setNameAC = (name: string) => ({type: 'packs/SET_NAME_PACK', name} as const)

//thunks
export const getPacksTC = (params: GetPacksRequestType): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try {
            dispatch(updateRequestParamsAC(params))
            const newParams = getState().packs.requestParams
            const res = await packsAPI.getPacks(newParams)
            dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount))
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const addNewPackTC = (title: string, params: GetPacksRequestType): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try {
            dispatch(updateRequestParamsAC(params))
            await packsAPI.addPack(title)
            dispatch(getPacksTC(getState().packs.requestParams))
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const deletePackTC = (id: string): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try {
            await packsAPI.deletePack(id)
            dispatch(getPacksTC(getState().packs.requestParams))
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const UpdatePackTC = (_id: string, newTitle: string): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try {
            await packsAPI.updatePack(_id, newTitle)
            dispatch(getPacksTC(getState().packs.requestParams))
        } catch (e) {
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}



//types
type InitialState = {
    packs: Array<PacksType>
    packsTotalCount: number
    error: string
    requestParams: GetPacksRequestType
}

export type PacksActionsType =
| ReturnType<typeof setPacksAC>
| ReturnType<typeof setErrorMessageAC>
| ReturnType<typeof updateRequestParamsAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, PacksActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, PacksActionsType>


export type GetPacksRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string   //0name, 1name, 
    page?: number
    pageCount?: number
    userId?: string
    token?: string
}






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