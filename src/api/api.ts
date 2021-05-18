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

export const cardsAPI = {
    getCards: (requestParams: GetCardsRequestType) => {
        return instance.get<GetCardsResponseType>('cards/card', {params: requestParams})
    },
    addCard: (data: {cardsPack_id: string, answer: string, question: string}) => {
        return instance.post<AddCardResponseType>('cards/card', {card: data})
    },
    deleteCard: (id: string) => {
        return instance.delete<DeleteCardResponseType>(`cards/card?id=${id}`)
    },
    updateCard: (data: {_id: string, question?: string, answer?: string, cardsPack_id: string}) => {
        return instance.put<UpdatedCardResponseType>('cards/card', {card: data})
    }
}

// export const profileAPI = {
//     updateProfile: (data: {name: string, avatar: string}) => {
//         return instance.put('auth/me', data)
//     },
// }

// types

// login
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

export type NewPassDataType = {
    password: string
    resetPasswordToken: string | undefined
}

// profile ?
export type UpdateProfileResponseType = {
    updatedUser: Object,    // Поправить, посмотреть что прилетает с бэка
    error?: string
}

// packs
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



// cards
export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type AddCardResponseType = {
    newCard: Array<CardType>
    token: string
    tokenDeathTime: number
}

export type DeleteCardResponseType = {
    deleteCard: Array<CardType>
    token: string
    tokenDeathTime: number
}

export type UpdatedCardResponseType = {
    updatedCard: Array<CardType> & {
        answerImg: string
        answerVideo: string
        questionVideo: string
    }
    token: string
    tokenDeathTime: number
}




export type GetCardsRequestType = {
    cardAnswer?: string
    cardQuestion?: string	
    cardsPack_id: string  
    min?: number
    max?: number
    sortCards?: string	
    page?: number
    pageCount?: number
}

export type PostCardsRequestType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string	
    questionVideo?: string	
    answerVideo?: string
    type?: string
}

// export type UpdateCardRequestType = {     // card: {...}
//     _id: string	
//     question?: string		
//     comments?: string	
// }
