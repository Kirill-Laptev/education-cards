import React, { useState, FocusEvent, useEffect } from 'react'
import noteImg from '../../assets/img/note.svg'
import s from './Registration.module.css'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { TextError } from '../../helpers/TextError'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import { registrationTC, setIsRegisterSuccessAC } from '../../redux/registration-reducer/registration-reducer'
import { validateEmail } from '../../helpers/validators/validators'


const Registration: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [emailTouched, setEmailTouched] = useState<boolean>(false)
    const [passwordTouched, setPasswordTouched] = useState<boolean>(false)
    const [passwordConfirmTouched, setPasswordConfirmTouched] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('Email field is required')
    const [passwordError, setPasswordError] = useState<string>('Password is required')
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('Password is required')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    useEffect(() => {
        if(emailError || passwordError || passwordConfirmError){
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [emailError, passwordError, passwordConfirmError])


    const dispatch = useDispatch()
    const history = useHistory()

    const isRegisterSuccess = useSelector<AppRootStateType, boolean>((state) => state.registration.isRegisterSuccess)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.registration.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

    useEffect(() => {
        if(isRegisterSuccess) {
            setTimeout(() => {
                history.push('/login')
                dispatch(setIsRegisterSuccessAC(false))
            }, 3000)
        }    
    }, [isRegisterSuccess])


    if(isLoggedIn){
        return <Redirect to='/profile'/>
    }


    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)

        const isValidEmail = validateEmail(e.currentTarget.value)
        if (isValidEmail) {
            setEmailError('Incorrect email format')
            if(!e.currentTarget.value){
                setEmailError('Email field is required')
            }
        } else {
            setEmailError('')  
        }
    }

    const passwordValidation = (password: string, setState: Function, setError: Function) => {
        setState(password)
        if(password.length < 7){
            setError('Min length 7 symbols')
            if(!password){
                setError('Password is required')
            }
        } else{
            setError('')
        }
    }

    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.name === 'password'){
            passwordValidation(e.currentTarget.value, setPassword, setPasswordError)
        }
        if(e.currentTarget.name === 'passwordConfirm'){
            passwordValidation(e.currentTarget.value, setPasswordConfirm, setPasswordConfirmError)
        }
    }
 

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if(e.currentTarget.name === 'email'){
            setEmailTouched(true)
        }
        if(e.currentTarget.name === 'password'){
            setPasswordTouched(true)
        }
        if(e.currentTarget.name === 'passwordConfirm'){
            setPasswordConfirmTouched(true)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(password !== passwordConfirm){
            setPasswordConfirmError('Different passwords')
        } else {
            dispatch(registrationTC({email, password}))
        }
    }

    return (
        <>
            <div className={s.login__form}>
                <div className={s.form}>
                    <div className={s.form__header}>
                        <div>REGISTRATION</div>
                        <img src={noteImg}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={s.form__email}>
                            <div><label htmlFor='email'>email</label></div>
                            <input 
                            type='text' 
                            id='email' 
                            name='email' 
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={blurHandler}/>
                            {(emailError && emailTouched) && <TextError>{emailError}</TextError>}
                        </div>
                        <div className={s.form__password}>
                            <div><label htmlFor='password'>password</label></div>
                            <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            value={password}
                            onChange={passwordChangeHandler}
                            onBlur={blurHandler}/>
                            {(passwordError && passwordTouched) && <TextError>{passwordError}</TextError>}
                        </div>
                        <div className={s.form__password}>
                            <div><label htmlFor='passwordConfirm'>confirm password</label></div>
                            <input 
                            type='password' 
                            id='passwordConfirm' 
                            name='passwordConfirm' 
                            value={passwordConfirm}
                            onChange={passwordChangeHandler}
                            onBlur={blurHandler}/>
                            {(passwordConfirmError && passwordConfirmTouched) && <TextError>{passwordConfirmError}</TextError>}
                        </div>
                        <div className={s.form__submit}>
                            <button type='submit' disabled={!isFormValid}>Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
            <AlertPopup message={serverErrorMessage} serverRequestSuccess={isRegisterSuccess}/>
        </>
    )
}



export default Registration

