import React, { useState, useEffect, ChangeEvent } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addCardTC, cardActionStatusAC } from '../../../redux/cards-reducer/cards-reducer'
import { AppRootStateType } from '../../../redux/store'
import {BsX as CloseIcon} from 'react-icons/bs'
import s from './AddCardModal.module.css'

const CardAddModal: React.FC<PropsType> = ({show, setShow, cardPackId}) => {

    const dispatch = useDispatch()

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const isAddCardSuccess = useSelector<AppRootStateType, boolean>((state) => state.cards.isCardActionSuccess)

    useEffect(() => {
        setShow(false)
        dispatch(cardActionStatusAC(false))
        setQuestion('')
        setAnswer('')
    }, [isAddCardSuccess])
   

    const questionEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const answerEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onAddNewCard = () => {
        dispatch(addCardTC({cardsPack_id: cardPackId, question, answer}))
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
                                <div>Add new card</div>
                                <CloseIcon 
                                    className={s.header__icon} 
                                    size={35}
                                    onClick={closeModal}
                                />
                            </div>
                            <div className={s.modal__input}>
                                <div className={s.input__title}>Question</div>
                                <input onChange={questionEditHandler} value={question} placeholder='Write your question here'/>
                            </div>
                            <div className={s.modal__input}>
                                <div className={s.input__title}>Answer</div>
                                <input onChange={answerEditHandler} value={answer} placeholder='Write your answer here'/>
                            </div>
                            <div className={s.modal__buttons}>
                                <button className={s.buttons__cancel} onClick={closeModal}>Cancel</button>
                                <button className={s.buttons__save} onClick={onAddNewCard}>Save</button>
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
    cardPackId: string
}

export default CardAddModal
