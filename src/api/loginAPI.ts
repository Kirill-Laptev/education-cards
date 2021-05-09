import axios from 'axios'

const settings = {
    baseURL: "http://localhost:7542/2.0/",
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true
}

const instance = axios.create(settings)

export const loginAPI = {
    registration: (data: {email: string, password: string}) => {
        return instance.post<RegistrationResponseType>('auth/register', data)
    },
    logout: () => {
        return instance.delete<MultiResponseType>('auth/me')
    },
    fetchLoginData: (data: {email: string, password: string, rememberMe: boolean}) => {
        return instance.post<LoginResponseType>('auth/login', data)
    },
    recoveryPassword: (data: {email: string, from: string, message: string}) => {
        return instance.post('auth/forgot', data)
    },
    setNewPassword: (data: {password: string, resetPasswordToken: string}) => {
        return instance.post<MultiResponseType>('auth/set-new-password', data)
    }
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

export type LoginResponseType = {
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

