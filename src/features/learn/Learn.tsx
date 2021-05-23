import React, { useEffect, useState, ChangeEvent } from 'react'
import s from './Learn.module.css'
import { getCardsTC, setCardsAC, updateGradeTC, removePassedCardAC } from '../../redux/cards-reducer/cards-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { AppRootStateType } from '../../redux/store'
import { CardType } from '../../api/api'
import { getRandomCard } from '../../helpers/smart-random/smart-random'
import Checkbox from '../../components/Checkbox/Checkbox'
import Switch from '../../components/Switch/Switch'

const grades = [
    {title: 'I know', value: 5}, 
    {title: 'Half right', value: 4}, 
    {title: 'Thought a lot', value: 3}, 
    {title: 'Forgot', value: 2}, 
    {title: "I don't know", value: 1}
]

const Learn = () => {

    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()
    const packId = id

    const [card, setCard] = useState<CardType>({} as CardType)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const [selectedAnswer, setSelectAnswer] = useState<number>(0)

    const cards = useSelector<AppRootStateType, CardType[]>((state) => state.cards.cards)

    useEffect(() => {
        if(cards.length === 0){
            dispatch(getCardsTC({cardsPack_id: packId, pageCount: 30}))
        }
        if(cards.length > 0){
            setCard(getRandomCard(cards))
        }
    }, [cards])

    useEffect(() => {
        return () => {
            dispatch(setCardsAC([], 0))
        }
    }, [])

    // Мой вариант с обучением
    // const onNextCard = () => {
    //     if(selectedAnswer && cards.length > 1){
    //         dispatch(updateGradeTC(card._id, selectedAnswer))
    //     }
    //     if(!selectedAnswer && cards.length > 1){
    //         dispatch(removePassedCardAC(card._id))
    //     }
    //     setShowAnswer(false)
    //     setSelectAnswer(0)
    // }

    const onNextCard = () => {
        if(selectedAnswer && cards.length > 0){
            dispatch(updateGradeTC(card._id, selectedAnswer))
        }
        if(!selectedAnswer && cards.length > 0){
            setCard(getRandomCard(cards))
        }
        setShowAnswer(false)
        setSelectAnswer(0)
    }

    const onGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectAnswer(+e.currentTarget.value)
    }

    return (
        <div>
            <div>LEARN PACK NAME</div>
            <div>{card.question}</div>
            {!showAnswer 
                ? <button onClick={() => setShowAnswer(true)}>SHOW ANSWER</button>
                : <div>{card.answer}</div>
            }
            {grades.map((grade) => (
                <Checkbox 
                    key={grade.value}
                    value={grade.value}
                    title={grade.title}
                    selectedValue={selectedAnswer}
                    onChangeValue={onGradeChange}
                />
            ))}
            <div>
                <button><NavLink to='/packs'>CANCEL</NavLink></button>
                <button onClick={onNextCard}>NEXT</button>
            </div>
        </div>
    )
}

export default Learn



    // const [card, setCard] = useState<CardType>({
    //     _id: 'fake',
    //     cardsPack_id: '',
    //     answer: 'answer fake',
    //     question: 'question fake',
    //     grade: 0,
    //     shots: 0,
    //     type: '',
    //     rating: 0,
    //     user_id: '',
    //     __v: 0,
    //     created: '',
    //     updated: ''
    // })