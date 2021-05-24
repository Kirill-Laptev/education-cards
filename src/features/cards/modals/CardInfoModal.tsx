import React from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import {BsX as CloseIcon} from 'react-icons/bs'
import s from './CardInfoModal.module.css'

const CardInfoModal: React.FC<PropsType> = ({show, setShow, question, answer}) => {

    return (
        <>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <div className={s.modal}>
                        <div className={s.modal__header}>
                            <div>Card info</div>
                            <CloseIcon 
                                className={s.header__icon} 
                                size={35}
                                onClick={() => setShow(false)}
                            />
                        </div>
                        <div className={s.modal__question}>
                            <div className={s.question__title}>Question</div>
                            <div className={s.question__text}>{question}</div>
                        </div>
                        <div className={s.modal__answer}>
                            <div className={s.answer__title}>Answer</div>
                            <div className={s.answer__text}>{answer}</div>
                        </div>
                    </div>
                }
            </ModalPopup>
        </>
    )
}

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    question: string
    answer: string
}

export default CardInfoModal
