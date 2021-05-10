import React, {FocusEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {forgotPassThunk, InitialForgotStateType} from '../../redux/forgot-reducer/forgot-reducer';
import {AppRootStateType} from "../../redux/store";
import s from "../forgot-password/ForgotPassword.module.css";
import {TextError} from "../../helpers/TextError";
import forgot from "../../assets/img/key.svg";


const ForgotPasswordForm = () => {

    const [email, setEmail] = useState<string>('')
    const [emailTouched, setEmailTouched] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('Email field is required')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const {requestStatus, info} = useSelector<AppRootStateType, InitialForgotStateType>((state) => state.forgot)

    const dispatch = useDispatch()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(forgotPassThunk(email))
    }

    const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.currentTarget.value).toLowerCase())) {
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

    useEffect(() => {
        if (emailError) {
            setIsFormValid(false)
        }
        setIsFormValid(true)
    }, [emailError])

    if (requestStatus && info) {
        return <Redirect to='/profile'/>
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
            {/*<AlertPopup message={serverErrorMessage} isRegisterSuccess={isRegisterSuccess}/>*/}
        </>

    )
}


export default ForgotPasswordForm

