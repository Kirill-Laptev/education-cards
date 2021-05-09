import React from 'react'
import enterImg from '../../assets/img/enter.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextError } from '../../helpers/TextError'
import s from './Login.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginTC } from '../../redux/login-reducer/login-reducer'
import { AppRootStateType } from '../../redux/store'
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup'

const InitialValues = {
    email: '',
    password: '',
    rememberMe: false
}

const validationSchema = Yup.object({
    email: Yup.string().required('Username field is required').email('Incorrect email format')
    .max(30, 'Username length should be less than 30 symbols'),
    password: Yup.string().required('Password is required').max(30, 'Password length should be less than 30 symbols')
})

const LoginForm: React.FC = () =>  {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const errorMessage = useSelector<AppRootStateType, string>((state) => state.login.error)

    if(isLoggedIn){
       return <Redirect to='/profile' />
    }


    const onSubmit = (data: {email: string, password: string, rememberMe: boolean}) => {
        dispatch(loginTC(data))
    }
    console.log('login')
        return (
            <>
                 <div className={s.login__form}>
                    <div className={s.form}>
                        <div className={s.form__user}>
                            <div>SIGN IN</div>
                            <img src={enterImg} />
                        </div>
                        <Formik
                        initialValues={InitialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        >
                            {
                                (formik) => {
                                    return (
                                        <Form>
                                        <div className={s.form__username}>
                                            <div><label htmlFor='email'>username</label></div>
                                            <Field type='text' id='email' name='email' />
                                            <ErrorMessage name='email' component={TextError}/>
                                        </div>
                                        <div className={s.form__password}>
                                            <div><label htmlFor='password'>password</label></div>
                                            <Field type='password' id='password' name='password' />
                                            <ErrorMessage name='password' component={TextError}/>
                                        </div>
                                        <div className={s.form__remember}>
                                        <div><label htmlFor='rememberMe'>remember me</label></div>
                                            <Field type='checkbox' id='rememberMe' name='rememberMe'/>
                                        </div>
                                        <div className={s.form__forgot}><NavLink to='/forgotpassword'>Forgot password ?</NavLink></div>
                                        <div className={s.form__registration}><NavLink to='/registration'>Registration here</NavLink></div>
                                        <div className={s.form__submit}>
                                            <button type='submit'>Login</button>
                                        </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                    <ErrorPopup />
                </div>
            </>
        )
    }  


// disabled={formik.isSubmitting || !formik.isValid}


export default LoginForm
