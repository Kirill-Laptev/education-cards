import React, { useState, useEffect, ChangeEvent } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addCardTC, cardActionStatusAC } from '../../../redux/cards-reducer/cards-reducer'
import { AppRootStateType } from '../../../redux/store'

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

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <>
                        <div><input onChange={questionEditHandler} value={question}/></div>
                        <div><input onChange={answerEditHandler} value={answer}/></div>
                        <div><button onClick={onAddNewCard}>ADD</button></div>
                    </>
                }
            </ModalPopup>
        </div>
    )
}

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    cardPackId: string
}

export default CardAddModal
