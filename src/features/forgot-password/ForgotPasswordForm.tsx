import React, {FocusEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from 'react-router-dom';
import {forgotPassTC, setInfoAC} from '../../redux/forgot-reducer/forgot-reducer';
import {AppRootStateType} from "../../redux/store";
import s from "../forgot-password/ForgotPassword.module.css";
import {TextError} from "../../helpers/TextError";
import forgot from "../../assets/img/key.svg";
import AlertPopup from '../../components/AlertPopup/AlertPopup';
import { validateEmail } from '../../helpers/validators/validators';


const ForgotPasswordForm = () => {

    const [email, setEmail] = useState<string>('')
    const [emailTouched, setEmailTouched] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('Email field is required')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)

    const sendMessageSuccess = useSelector<AppRootStateType, string>((state) => state.forgot.info)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.forgot.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (emailError) {
            setIsFormValid(false)
        } else{
            setIsFormValid(true)
        }
    }, [emailError])

    useEffect(() => {
        if(sendMessageSuccess){
            setTimeout(() => {
                history.push('/login')
                dispatch(setInfoAC(''))
            }, 3000)
        }    
    }, [sendMessageSuccess])

    
    if(isLoggedIn){
        return <Redirect to='/profile'/>
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(forgotPassTC(email))
    }

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        
        const isValidEmail = validateEmail(e.currentTarget.value)
        if (isValidEmail) {
            setEmailError('Incorrect email format')
            if (!e.currentTarget.value) {
                setEmailError('Email field is required')
            }
        } else {
            setEmailError('')
        }
    }

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'email') {
            setEmailTouched(true)
        }
    }
    

    return (
        <>
            <div className={s.forgot__form}>
                <div className={s.form}>
                    <div className={s.form__header}>
                        <div>Forgot Password</div>
                        <img src={forgot}/>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={s.form__email}>
                            <div><label htmlFor='email'>Enter valid email</label></div>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                value={email}
                                onChange={emailChangeHandler}
                                onBlur={blurHandler}/>
                            {(emailError && emailTouched) && <TextError>{emailError}</TextError>}
                        </div>
                        <div className={s.form__submit}>
                            <button type='submit' disabled={!isFormValid}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
            <AlertPopup message={serverErrorMessage} serverRequestSuccess={sendMessageSuccess}/>
            {/* Email address not found /ᐠ-ꞈ-ᐟ\\ */}
            {/* sent —ฅ/ᐠ.̫ .ᐟ\\ฅ— */}
        </>

    )
}


export default ForgotPasswordForm

