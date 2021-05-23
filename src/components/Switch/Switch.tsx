import React from 'react'
import s from './Switch.module.css'

const Switch: React.FC<PropsType> = ({isOn, handleToggle, color}) => {
    return (
        <>
            <input
                className={s.switch__checkbox}
                id='react-switch-new'
                type='checkbox'
                checked={isOn}
                onChange={handleToggle} />
            <label
                className={s.switch__label}
                htmlFor='react-switch-new'
                style={{background: isOn ? color : 'grey'}}>
                <span className={s.switch__button} />
            </label>
        </>
    )
}

export default Switch

type PropsType = {
    isOn: boolean
    handleToggle: () => void
    color: string
}