import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <div className={s.header__block}>
                <div className={s.header__logo}>LOGO</div>
                <div className={s.header__links}>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/registration'>Registration</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink to='/newpassword'>New Password</NavLink>
                    <NavLink to='/test'>Test</NavLink>
                </div>
                <div className={s.header__logout}><button>Log out</button></div>
            </div>
        </div>
    )
}

export default Header
