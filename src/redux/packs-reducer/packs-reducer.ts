import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store";
import {PacksAPI} from "../../api/loginAPI";

const initialState: InitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    name: '',
    type: 'Cards'

}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialState => {
    switch (action.type) {

        case 'packs/GET_PACKS':
            return {
                ...state,
                cardPacks: action.cardPacks,
                cardPacksTotalCount: action.cardPacksTotalCount
            }

        case 'packs/SET_NAME_PACK':
            return {
                ...state,
                name: action.name
            }

        default:
            return state
    }
}


//actions
export const getCardsAC = (cardPacks: Array<CardsType>, cardPacksTotalCount: number) => ({
    type: 'packs/GET_PACKS',
    cardPacks,
    cardPacksTotalCount
} as const)
export const setNameAC = (name: string) => ({type: 'packs/SET_NAME_PACK', name} as const)

//thunks
export const getPacksTC = (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, userId: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await PacksAPI.getPacks(packName, min, max, sortPacks, page, pageCount, userId)
            dispatch(getCardsAC(res.data.cardPacks, res.data.cardsCount))
        } catch (e) {
            //Уточнить
        }
    }
}

export const addPackTC = (name: string, path: string, grade: number, shots: number, rating: number,
                          deckCover: string, privat?: boolean, type?: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await PacksAPI.addPack(name, path, grade, shots, rating,
                deckCover, privat, type)
            console.log(res.data)
        } catch (e) {
            //Уточнить
        }
    }
}

export const deletePackTC = (id: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await PacksAPI.deletePack(id)
            console.log(res.data)
        } catch (e) {
            //Уточнить
        }
    }
}

export const UpdatePackTC = (id: string, name: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try {
            const res = await PacksAPI.addPack(id, name)
            console.log(res.data)
        } catch (e) {
            //Уточнить
        }
    }
}



//types
type InitialState = {
    cardPacks: Array<CardsType>
    cardPacksTotalCount: number
    name: string
    type: string
}
export type PacksActionsType =
    | ReturnType<typeof getCardsAC>
    | ReturnType<typeof setNameAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, PacksActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, PacksActionsType>


type CardsType = {
    cardsCount: number
    created: string
    deckCover: null
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
}