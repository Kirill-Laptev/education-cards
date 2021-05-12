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


export const PacksAPI = {
    getPacks: (packName?: string, min?: number, max?: number, sortPacks?: string,
               page?: number, pageCount?: number, userId?: string) => {
        return instance.get(`cards/pack?packName=${packName}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&userId=${userId}`)
    },
    addPack: (name?: string, path?: string, grade?: number, shots?: number, rating?: number,
              deckCover?: string, privat?: boolean, type?: string) => {
        return instance.post(`cards/pack`, {name, path, grade, shots, rating, deckCover, privat, type})
    },
    deletePack: (id: string) => {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack: (id: string, name: string) => {
        return instance.put(`cards/pack`, {cardsPack: {id, name}})
    }
}

export const CardsAPI = {
    getCards: (cardPackId: string, cardQuestion: string, cardAnswer: string, min?: number, max?: number, sortCards?: string,
               page?: number, pageCount?: number) => {
        return instance.get(`cards/card?pageCount=10&cardsPack_id=${cardPackId}
        &cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}&min=${min}&max=${max}&sortPacks=${sortCards}&page=${page}&pageCount=${pageCount}`)
    },
    addCards: (data: CardsType) => {
        return instance.post(`cards/pack`, data)
    },
    updateCard: (card: UpdateCardType) => {
        return instance.put(`cards/card`, {card})
    },
    deleteCard: (id: string) => {
        return instance.delete(`cards/card?id=${id}`)
    },
}

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
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту	
    rememberMe: boolean;
    error?: string;
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

export type CardsType = {
    cardsPack_id: string,
    question?: string,
    answer?: string,
    grade?: number,
    shots?: number,
    rating?: number,
    answerImg?: string,
    questionImg?: string,
    questionVideo?: string,
    answerVideo?: string,
    type?: string
}

export type UpdateCardType = {
    _id: string
    question: string
    comments: string
}