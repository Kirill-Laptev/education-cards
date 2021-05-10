import React, {FocusEvent, useEffect, useState} from 'react'
import s from './NewPassword.module.css'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'
import {TextError} from '../../helpers/TextError'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import {passwordThunk} from "../../redux/password-reducer/password-reducer";
import resetImg from './../../../src/assets/img/rotation-lock.svg'

const NewPassword: React.FC = () => {


    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [passwordTouched, setPasswordTouched] = useState<boolean>(false)
    const [passwordConfirmTouched, setPasswordConfirmTouched] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<string>('Password is required')
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>('Password is required')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const {token} = useParams<{ token?: string }>()

    useEffect(() => {
        if (passwordError || passwordConfirmError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [passwordError, passwordConfirmError])


    const dispatch = useDispatch()
    const history = useHistory()

    const isRegisterSuccess = useSelector<AppRootStateType, boolean>((state) => state.registration.isRegisterSuccess)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.registration.error)

    useEffect(() => {
        if (isRegisterSuccess) {
            setTimeout(() => {
                history.push('/login')
            }, 3000)
        }
    }, [isRegisterSuccess])


    const passwordValidation = (password: string, setState: Function, setError: Function) => {
        setState(password)
        if (password.length < 7) {
            setError('Min length 7 symbols')
            if (!password) {
                setError('Password is required')
            }
        } else {
            setError('')
        }
    }

    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'password') {
            passwordValidation(e.currentTarget.value, setPassword, setPasswordError)
        }
        if (e.currentTarget.name === 'passwordConfirm') {
            passwordValidation(e.currentTarget.value, setPasswordConfirm, setPasswordConfirmError)
        }
    }


    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {

        if (e.currentTarget.name === 'password') {
            setPasswordTouched(true)
        }
        if (e.currentTarget.name === 'passwordConfirm') {
            setPasswordConfirmTouched(true)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            setPasswordConfirmError('Different passwords')
        } else {
            dispatch(passwordThunk(password, token))
        }
    }


    return (
        <>
            <div className={s.newPass__form}>
                <div className={s.form}>
                    <div className={s.form__header}>
                        <div>Set New Password</div>
                        <img src={resetImg}/>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                            {(passwordConfirmError && passwordConfirmTouched) &&
                            <TextError>{passwordConfirmError}</TextError>}
                        </div>
                        <div className={s.form__submit}>
                            <button type='submit' disabled={!isFormValid}>Set New Password</button>
                        </div>
                    </form>
                </div>
            </div>
            <AlertPopup message={serverErrorMessage} isRegisterSuccess={isRegisterSuccess}/>
        </>
    )
}


export default NewPassword

