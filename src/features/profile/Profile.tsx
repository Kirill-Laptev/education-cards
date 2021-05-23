import React from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { Redirect } from 'react-router-dom'
import s from './Profile.module.css'

const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }

    return (
        <div className={s.shamcards__header}>
            <div className={s.shamcard__outer}><div>Card</div></div>
            <div className={s.shamcard__outer}><div>Card</div></div>
            <div className={s.shamcard__outer}><div>Card</div></div>
            <div className={s.shamcard__outer}><div>Card</div></div>
            <div className={s.shamcard__outer}><div>Card</div></div>
        </div>
    )
}

export default Profile
