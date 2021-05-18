import { AppRootStateType } from './../store';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { cardsAPI, GetCardsRequestType } from './../../api/api';
import { CardType } from "../../api/api"

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    error: '',
    requestParams: {
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        page: 1,
        pageCount: 9
    }
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType) => {
    switch(action.type){

        case 'cards/SET_CARDS':
            return {
                ...state,
                cards: action.cards,
                cardsTotalCount: action.cardsTotalCount
            }

        case 'cards/UPDATE_REQUEST_PARAMS': 
            return {
                ...state,
                requestParams: {...state.requestParams, ...action.newParams}
            }

        default:
            return state
    }
}

// actions
export const setCardsAC = (cards: Array<CardType>, cardsTotalCount: number) => ({type: 'cards/SET_CARDS', cards, cardsTotalCount} as const)
export const updateRequestParamsAC = (newParams: GetCardsRequestType) => ({type: 'cards/UPDATE_REQUEST_PARAMS', newParams} as const)

// thunks
export const getCardsTC = (params: GetCardsRequestType): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try{
            dispatch(updateRequestParamsAC(params))
            const newParams = getState().cards.requestParams
            const {data} = await cardsAPI.getCards(newParams)
            dispatch(setCardsAC(data.cards, data.cardsTotalCount))
        } catch(e){
            // Уточнить
        }
    }
}

export const deleteCardTC = (cardId: string, cardPackId: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.deleteCard(cardId)
            dispatch(getCardsTC({cardsPack_id: cardPackId, pageCount: 12}))
        } catch(e){
            // Уточнить
        }
    }
}

export const addCardTC = (data: {cardsPack_id: string, answer: string, question: string}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.addCard(data)
            dispatch(getCardsTC({cardsPack_id: data.cardsPack_id, pageCount: 12}))
        } catch(e){
            // Уточнить
        }
    }
}

export const updateCardTC = (data: {_id: string, question?: string, answer?: string, cardsPack_id: string}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.updateCard(data)
            dispatch(getCardsTC({cardsPack_id: data.cardsPack_id, pageCount: 12}))
        } catch(e){
            // Уточнить
        }
    }
}

// types
type InitialStateType = {
    cards: Array<CardType>
    cardsTotalCount: number
    error: string
    requestParams: GetCardsRequestType
}

export type CardsActionsType = 
| ReturnType<typeof setCardsAC>
| ReturnType<typeof updateRequestParamsAC>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, CardsActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, CardsActionsType>