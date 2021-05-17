import { GetPacksRequestType } from '../redux/packs-reducer/packs-reducer';
import axios from 'axios'

const settings = {
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
}

const instance = axios.create(settings)

export const loginAPI = {
    authMe: () => {
        return instance.post<AuthResponseType>('auth/me')
    },
    registration: (data: { email: string, password: string }) => {
        return instance.post<RegistrationResponseType>('auth/register', data)
    },
    logout: () => {
        return instance.delete<MultiResponseType>('auth/me')
    },
    fetchLoginData: (data: { email: string, password: string, rememberMe: boolean }) => {
        return instance.post<AuthResponseType>('auth/login', data)
    },
    forgotPass: (email: string) => {
        return instance.post<MultiResponseType>('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
                 password recovery link:
                <a href='http://localhost:3000/#/set-new-password/$token$'>
                 Reset Password</a></div>`
        })
    },
    setNewPassword: (newPassData: NewPassDataType) => {
        return instance.post<MultiResponseType>('auth/set-new-password', newPassData)
    }
}


export const packsAPI = {
    getPacks: (paramsRequest: GetPacksRequestType) => {
        return instance.get<PacksResponseType>('cards/pack', {params: paramsRequest})
    },
    // getPacks: (paramsRequest: GetPacksRequestType) => {
    //     const {packName, min, max, sortPacks, page, pageCount, userId, token} = paramsRequest
    //     return instance.get<PacksResponseType>(`cards/pack?packName=${packName}&sortPacks=${sortPacks}&min=${min}&max=${max}&page=${page}&pageCount=${pageCount}&user_id=${userId}`)
    // },
    addPack: (title: string) => {
        return instance.post<OnPackActionResponseType>(`cards/pack`, {cardsPack: {name: title} })
    },
    deletePack: (id: string) => {
        return instance.delete<OnPackActionResponseType>(`cards/pack?id=${id}`)
    },
    updatePack: (_id: string, name: string) => {
        return instance.put<PacksResponseType>('cards/pack', {cardsPack: {_id, name}})
    }
}

// export const cardsAPI = {
//     getCards: (cardPackId: string, cardQuestion: string, cardAnswer: string, min?: number, max?: number, sortCards?: string,
//                page?: number, pageCount?: number) => {
//         return instance.get(`cards/card?pageCount=10&cardsPack_id=${cardPackId}
//         &cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}&min=${min}&max=${max}&sortPacks=${sortCards}&page=${page}&pageCount=${pageCount}`)
//     },
//     addCards: (data: CardsType) => {
//         return instance.post(`cards/pack`, data)
//     },
//     updateCard: (card: UpdateCardType) => {
//         return instance.put(`cards/card`, {card})
//     },
//     deleteCard: (id: string) => {
//         return instance.delete(`cards/card?id=${id}`)
//     },
// }

// export const profileAPI = {
//     updateProfile: (data: {name: string, avatar: string}) => {
//         return instance.put('auth/me', data)
//     },
// }

// types

export type RegistrationResponseType = {
    addedUser: Object
    error?: string
}

export type AuthResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; 
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; 	
    rememberMe: boolean;
    error?: string;
    token: string
    tokenDeathTime: number
}

export type MultiResponseType = {
    info: string,
    error?: string
}

export type UpdateProfileResponseType = {
    updatedUser: Object,    // Поправить, посмотреть что прилетает с бэка
    error?: string
}

export type NewPassDataType = {
    password: string
    resetPasswordToken: string | undefined
}

export type PacksResponseType = {
    cardPacks: Array<PacksType>					
    cardPacksTotalCount: number		
    maxCardsCount: number			
    minCardsCount: number			
    page: number			
    pageCount: number	
    token: string
    tokenDeathTime: number	
}

export type PacksType = {
    _id: string		
    user_id: string			
    name: string			
    path: string				
    cardsCount: 25			
    grade: number		
    shots: number
    rating: number
    type: string	
    created: string				
    updated: string			
    __v: number			
}

export type OnPackActionResponseType = {
    newCardsPack: {
        cardsCount: number                         
        created: string
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
        __v: number 
        _id: string
    }   
    token: string
    tokenDeathTime: number 
}

// export type CardsType = {
//     cardsPack_id: string,
//     question?: string,
//     answer?: string,
//     grade?: number,
//     shots?: number,
//     rating?: number,
//     answerImg?: string,
//     questionImg?: string,
//     questionVideo?: string,
//     answerVideo?: string,
//     type?: string
// }

// export type UpdateCardType = {
//     _id: string
//     question: string
//     comments: string
// }