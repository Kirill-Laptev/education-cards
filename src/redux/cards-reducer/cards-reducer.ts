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
    },
    isCardActionSuccess: false
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

        case 'cards/SET_ERROR_MESSAGE':
            return {
                ...state,
                error: action.errorMessage
            } 

        case 'cards/SET_CARD_ACTION_STATUS':
            return {
                ...state,
                isCardActionSuccess: action.isSuccess
            }   
            
        case 'cards/REMOVED_PASSED_CARD':
            return {
                ...state,
                cards: state.cards.filter((card) => card._id !== action.cardId)
            }

        case 'cards/SET_CARD_GRADE':
            return {
                ...state, 
                cards: state.cards.map((card) => (card._id === action.cardId ? {...card, grade: action.grade} : card))
            }

        default:
            return state
    }
}

// actions
export const setCardsAC = (cards: Array<CardType>, cardsTotalCount: number) => ({type: 'cards/SET_CARDS', cards, cardsTotalCount} as const)
const updateRequestParamsAC = (newParams: GetCardsRequestType) => ({type: 'cards/UPDATE_REQUEST_PARAMS', newParams} as const)
const setErrorMessageAC = (errorMessage: string) => ({type: 'cards/SET_ERROR_MESSAGE', errorMessage} as const)
export const cardActionStatusAC = (isSuccess: boolean) => ({type: 'cards/SET_CARD_ACTION_STATUS', isSuccess} as const)
export const removePassedCardAC = (cardId: string) => ({type: 'cards/REMOVED_PASSED_CARD', cardId} as const)
export const setCardGradeAC = (cardId: string, grade: number) => ({type: 'cards/SET_CARD_GRADE', cardId, grade} as const)

// thunks
export const getCardsTC = (params: GetCardsRequestType): ThunkType => {
    return async (dispatch: DispatchType, getState: () => AppRootStateType) => {
        try{
            dispatch(updateRequestParamsAC(params))
            const newParams = getState().cards.requestParams
            const {data} = await cardsAPI.getCards(newParams)
            dispatch(setCardsAC(data.cards, data.cardsTotalCount))
        } catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const deleteCardTC = (cardId: string, cardPackId: string): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.deleteCard(cardId)
            dispatch(cardActionStatusAC(true))
            dispatch(getCardsTC({cardsPack_id: cardPackId}))
        } catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const addCardTC = (data: {cardsPack_id: string, answer: string, question: string}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.addCard(data)
            dispatch(cardActionStatusAC(true))
            dispatch(getCardsTC({cardsPack_id: data.cardsPack_id}))
        } catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const updateCardTC = (data: {_id: string, question?: string, answer?: string, cardsPack_id: string}): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{
            await cardsAPI.updateCard(data)
            dispatch(cardActionStatusAC(true))
            dispatch(getCardsTC({cardsPack_id: data.cardsPack_id}))
        } catch(e){
            dispatch(setErrorMessageAC(e.response ? e.response.data.error : e.message))
            dispatch(setErrorMessageAC(''))
        }
    }
}

export const updateGradeTC = (cardId: string, grade: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        try{    
            await cardsAPI.updateCardGrade({card_id: cardId, grade})
            dispatch(setCardGradeAC(cardId, grade))
            // dispatch(removePassedCardAC(cardId))
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
    isCardActionSuccess: boolean
}

export type CardsActionsType = 
| ReturnType<typeof setCardsAC>
| ReturnType<typeof updateRequestParamsAC>
| ReturnType<typeof setErrorMessageAC>
| ReturnType<typeof cardActionStatusAC>
| ReturnType<typeof removePassedCardAC>
| ReturnType<typeof setCardGradeAC>



type DispatchType = ThunkDispatch<AppRootStateType, unknown, CardsActionsType>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, CardsActionsType>