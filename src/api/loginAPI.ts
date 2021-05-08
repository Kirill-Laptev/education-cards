import axios from 'axios'

const settings = {
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
}

const instance = axios.create(settings)

export const loginAPI = {
    fetchLoginData: (data: {email: string, password: string, rememberMe: boolean}) => {
        return instance.post<LoginResponseType>('auth/login', data)
    }
}

// types

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