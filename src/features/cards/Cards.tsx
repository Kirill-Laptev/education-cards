import React, { useEffect, useState, ChangeEvent } from 'react'
import s from './Cards.module.css'
import ideaGif from '../../assets/img/idea.gif'
import { useSelector, useDispatch } from 'react-redux'
import { CardType } from '../../api/api'
import { AppRootStateType } from '../../redux/store'
import { getCardsTC, addCardTC, updateCardTC } from '../../redux/cards-reducer/cards-reducer'
import { deleteCardTC } from '../../redux/cards-reducer/cards-reducer'
import { IoTrashOutline as DeleteIcon} from 'react-icons/io5'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Paginator from '../../components/Paginator/Paginator'
import Select from '../../components/Select/Select'
import ModalPopup from '../../components/ModalPopup/ModalPopup'

const Cards = () => {
    
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()
    const cardPackId = id
    
    type ModalDataType = {
        question: string
        answer: string
    } 

    const [foundQuestion, setFoundQuestion] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ModalDataType>({} as ModalDataType)

    const cards = useSelector<AppRootStateType, CardType[]>((state) => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>((state) => state.cards.cardsTotalCount)
    const itemsOnPage = useSelector<AppRootStateType, number>((state) => state.cards.requestParams.pageCount!)


    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardPackId}))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [itemsOnPage])

    const onCardDelete = (cardId: string) => {
        dispatch(deleteCardTC(cardId, cardPackId))
    }

    const sliceAnswer = (string: string) => {
        if(string.length > 70) return string.slice(0, 70) + '...'
        return string
    }

    const sliceQuestion = (string: string) => {
        if(string.length > 48) return string.slice(0, 48) + '...'
        return string
    }

    const checkOnNotInteger = (value: number) => {
        if(value % 1 !== 0) return value.toFixed(2)
        return value
    }


    const searchByQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFoundQuestion(e.currentTarget.value)
    }

    const onSearchClick = () => {
        dispatch(getCardsTC({cardsPack_id: cardPackId, cardQuestion: foundQuestion}))
    }

    const onAddNewCard = () => {
        dispatch(addCardTC({cardsPack_id: cardPackId, question: 'New question', answer: 'Answer on question will be here'}))
    }

    const onUpdateCardInfo = (cardId: string) => {
        dispatch(updateCardTC({_id: cardId, question: 'Update question', answer: 'Update answer',cardsPack_id: cardPackId}))
    }

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(getCardsTC({cardsPack_id: cardPackId, page: pageNumber}))
    }

    const onItemsCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC({cardsPack_id: cardPackId, pageCount: +e.currentTarget.value}))
    }

    const onOpenModal = (cardId: string, question: string, answer: string) => {
        setIsShow(true)
        setModalData({question, answer})
    }

    return (
        <div>
            <div className={s.header}>
                <div className={s.search__title}><span>Search card</span></div>
                <div className={s.search__field}>
                    <input 
                    type='text'
                    placeholder='Search by name' 
                    onChange={searchByQuestionHandler}
                    value={foundQuestion}/>
                </div>
                <div className={s.search__btn}>
                    <button onClick={onSearchClick}>Search</button>
                </div>
                <div className={s.add}>
                    <button onClick={onAddNewCard}><AddIcon size='25'/><span>Add new card</span></button>
                </div>
            </div>
            <div className={s.cards}>
                {cards.map((card) => (
                    <div key={card._id} className={s.card__outer}>
                        <div className={s.card__inner}>
                            <div className={s.card__img}><img  src={ideaGif}/></div>
                            <div className={s.card__title}>{sliceQuestion(card.question)}</div>
                            <div className={s.card__subtitle}>{sliceAnswer(card.answer)}</div>
                            <div className={s.card__rate}>Your rate</div>
                            <div className={s.card__stars}>{checkOnNotInteger(card.grade)}</div>
                            <div className={s.card__buttons}>
                                <button className={s.card__edit_btn} onClick={() => onOpenModal(card._id, card.question, card.answer)}>Click for info</button>
                                <div><DeleteIcon className={s.card__delete_btn} onClick={() => onCardDelete(card._id)} size='30'/></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={s.cards__footer}>
                <Paginator 
                totalItemsCount={cardsTotalCount}
                itemsOnPage={itemsOnPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                />
                <div className={s.footer__select}><Select onSelectValue={onItemsCountChange}/></div>
            </div>
            <ModalPopup show={isShow} setShow={setIsShow}>
                {
                    <>
                    <div>{modalData.question}</div>
                    <div>{modalData.answer}</div>
                    </>
                }
            </ModalPopup>
        </div>
    )
}

export default Cards
