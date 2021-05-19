import React, { useState, useEffect, ChangeEvent } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCardTC, updateCardTC, cardActionStatusAC } from '../../../redux/cards-reducer/cards-reducer'
import { AppRootStateType } from '../../../redux/store'

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

    const answerEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardAnswer(e.currentTarget.value)
    }

    const onUpdateCardInfo = () => {
        dispatch(updateCardTC({_id: cardId, question: cardQuestion, answer: cardAnswer, cardsPack_id: cardPackId}))
    }

    const onCardDelete = () => {
        dispatch(deleteCardTC(cardId, cardPackId))
    }

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <>
                        <div><input onChange={questionEditHandler} value={cardQuestion}/></div>
                        <div><input onChange={answerEditHandler} value={cardAnswer}/></div>
                        <div><button onClick={onUpdateCardInfo}>UPDATE</button></div>
                        <div><button onClick={onCardDelete}>DELETE</button></div>
                    </>
                }
            </ModalPopup>
        </div>
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