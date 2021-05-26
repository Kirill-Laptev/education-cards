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
            <h3>Profile component will be here</h3>
        </div>
    )
}

export default Profile
