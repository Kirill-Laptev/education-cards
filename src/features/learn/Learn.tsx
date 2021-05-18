import React from 'react'
import s from './Learn.module.css'

const Learn = () => {
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

export default Learn
