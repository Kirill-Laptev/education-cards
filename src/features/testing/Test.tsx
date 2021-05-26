import React from 'react'
import s from './Test.module.css'

const Test = () => {

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

export default Test