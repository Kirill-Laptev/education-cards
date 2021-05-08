import React, { useState, FocusEvent, useEffect } from 'react'
import enterImg from '../../assets/img/enter.svg'
import s from './Login.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginTC } from '../../redux/login-reducer/login-reducer'
import { AppRootStateType } from '../../redux/store'
import { TextError } from '../../helpers/TextError'
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup'


const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [emailTouched, setEmailTouched] = useState<boolean>(false)
    const [passwordTouched, setPasswordTouched] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('Email field is required')
    const [passwordError, setPasswordError] = useState<string>('Password is required')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    useEffect(() => {
        if(emailError || passwordError){
            setIsFormValid(false)
        } else{
            setIsFormValid(true)
        }
    }, [emailError, passwordError])


    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.login.error)

    if(isLoggedIn) {
        return <Redirect to='/profile' />
    }


    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.currentTarget.value).toLowerCase())){
            setEmailError('Incorrect email format')
            if(!e.currentTarget.value){
                setEmailError('Email field is required')
            }
        } else {
            setEmailError('') 
        }
    }
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        if(e.currentTarget.value.length < 7){
            setPasswordError('Min length 7 symbols')
            if(!e.currentTarget.value){
                setPasswordError('Password is required')
            }
        } else{
            setPasswordError('')
        }
    }
    const remeberMeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }


    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if(e.currentTarget.name === 'email'){
            setEmailTouched(true)
        }
        if(e.currentTarget.name === 'password'){
            setPasswordTouched(true)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(loginTC({email, password, rememberMe}))
    }

    return (
        <>
            <div className={s.login__form}>
                <div className={s.form}>
                    <div className={s.form__user}>
                        <div>SIGN IN</div>
                        <img src={enterImg} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={s.form__username}>
                            <div><label htmlFor='email'>username</label></div>
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
                        <div className={s.form__remember}>
                            <div><label htmlFor='rememberMe'>remember me</label></div>
                            <input 
                            type='checkbox' 
                            id='rememberMe' 
                            name='rememberMe' 
                            checked={rememberMe}
                            onChange={remeberMeChangeHandler}/>
                        </div>
                        <div className={s.form__forgot}><NavLink to='/forgotpassword'>Forgot password ?</NavLink></div>
                        <div className={s.form__registration}><NavLink to='/registaration'>Registration here</NavLink></div>
                        <div className={s.form__submit}>
                            <button type='submit' disabled={!isFormValid}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <ErrorPopup />
        </>
    )
}



export default LoginForm
