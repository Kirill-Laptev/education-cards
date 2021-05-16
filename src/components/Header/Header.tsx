import React from 'react'
import s from './Header.module.css'
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutTC } from '../../redux/login-reducer/login-reducer'
import { AppRootStateType } from '../../redux/store'

const Header = () => {

    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    const login = () => {
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <div className={s.header__block}>
                <div className={s.header__logo}>LOGO</div>
                <div className={s.header__links}>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/registration'>Registration</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink to='/newpassword'>New Password</NavLink>
                    <NavLink to='/forgotpassword'>Forgot Password</NavLink>
                    <NavLink to='/packs'>Packs</NavLink>
                    <NavLink to='/test'>Test</NavLink>
                </div>
                {isLoggedIn
                  ? <div className={s.header__btns}><button onClick={logout}>Log out</button></div>
                  : <div className={s.header__btns}><button onClick={login}>Login</button></div>}
                
            </div>
        </div>
    )
}

export default Header
