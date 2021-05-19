import React, { SyntheticEvent } from 'react'
import s from './ModalPopup.module.css'

const ModalPopup: React.FC<ModalPopupPropsType > = ({show, setShow, children}) => {
    
    return (
        <div 
        className={`${s.modal__wrapper} + ${show ? s.open : s.close}`}
        onClick={() => setShow(false)}>
            <div 
            className={s.modal__inner}
            onClick={(e: SyntheticEvent) => e.stopPropagation()}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalPopup

type ModalPopupPropsType = {
    show: boolean
    setShow: (value: boolean) => void
}