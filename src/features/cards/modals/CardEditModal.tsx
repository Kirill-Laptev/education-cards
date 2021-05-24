import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCardTC, updateCardTC, cardActionStatusAC } from '../../../redux/cards-reducer/cards-reducer'
import { AppRootStateType } from '../../../redux/store'
import {BsX as CloseIcon} from 'react-icons/bs'
import s from './CardEditModal.module.css'

const CardEditModal: React.FC<PropsType> = (props) => {

    const {
        show,
        setShow,
        cardPackId,
        cardId,
        question,
        answer
    } = props

    const dispatch = useDispatch()

    const successDelete = useSelector<AppRootStateType, boolean>((state) => state.cards.isCardActionSuccess)
    const successUpdate = useSelector<AppRootStateType, boolean>((state) => state.cards.isCardActionSuccess)

    const [cardQuestion, setCardQuestion] = useState<string>('')
    const [cardAnswer, setCardAnswer] = useState<string>('')

    useEffect(() => {
        setCardQuestion(question)
    }, [question])

    useEffect(() => {
        setCardAnswer(answer)
    }, [answer])

    useEffect(() => {
        setShow(false)
        dispatch(cardActionStatusAC(false))
    }, [successDelete])

    useEffect(() => {
        setShow(false)
        dispatch(cardActionStatusAC(false))
    }, [successUpdate])


    const questionEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value)
    }

    const answerEditHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCardAnswer(e.currentTarget.value)
    }

    const onUpdateCardInfo = () => {
        dispatch(updateCardTC({_id: cardId, question: cardQuestion, answer: cardAnswer, cardsPack_id: cardPackId}))
    }

    const onCardDelete = () => {
        dispatch(deleteCardTC(cardId, cardPackId))
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <div className={s.modal}>
                        <div className={s.modal__header}>
                            <div>Edit card</div>
                            <CloseIcon 
                                className={s.header__icon} 
                                size={35}
                                onClick={closeModal}
                            />
                        </div>
                        <div className={s.modal__input}>
                            <div className={s.input__title}>Question</div>
                            <input type='text' onChange={questionEditHandler} value={cardQuestion} placeholder='Write your question here'/>
                        </div>
                        <div className={s.modal__textarea}>
                            <div className={s.textarea__title}>Answer</div>
                            <textarea onChange={answerEditHandler} value={cardAnswer} placeholder='Write your answer here'/>
                        </div>
                        <div className={s.modal__buttons}>
                            <button className={s.buttons__delete} onClick={onCardDelete}>Delete</button>
                            <button className={s.buttons__save} onClick={onUpdateCardInfo}>Save</button>
                        </div>
                    </div>
                }
            </ModalPopup>
        </>
    )
}

export default CardEditModal

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void 
    cardPackId: string
    cardId: string
    question: string
    answer: string
}