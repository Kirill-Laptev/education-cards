import React, { useEffect, useState, ChangeEvent } from 'react'
import s from './Cards.module.css'
import ideaGif from '../../assets/img/idea.gif'
import { useSelector, useDispatch } from 'react-redux'
import { CardType } from '../../api/api'
import { AppRootStateType } from '../../redux/store'
import { getCardsTC, addCardTC } from '../../redux/cards-reducer/cards-reducer'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Paginator from '../../components/Paginator/Paginator'
import Select from '../../components/Select/Select'
import CardInfoModal from './modals/CardInfoModal'
import { FiEdit as EditIcon } from 'react-icons/fi'
import CardEditModal from './modals/CardEditModal'
import AddCardModal from './modals/AddCardModal'

const Cards = () => {
    
    const dispatch = useDispatch()
    const {id} = useParams<{id: string}>()
    const cardPackId = id

    const [foundQuestion, setFoundQuestion] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [modalInfoShow, setModalInfoShow] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ModalDataType>({} as ModalDataType)
    const [modalEditShow, setModalEditShow] = useState<boolean>(false)
    const [modalAddShow, setModalAddShow] = useState<boolean>(false)

    const cards = useSelector<AppRootStateType, CardType[]>((state) => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>((state) => state.cards.cardsTotalCount)
    const itemsOnPage = useSelector<AppRootStateType, number>((state) => state.cards.requestParams.pageCount!)


    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardPackId}))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [itemsOnPage])


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
        setModalAddShow(true)
    }

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(getCardsTC({cardsPack_id: cardPackId, page: pageNumber}))
    }

    const onItemsCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC({cardsPack_id: cardPackId, pageCount: +e.currentTarget.value}))
    }

    const onClickInfo = (question: string, answer: string) => {
        setModalInfoShow(true)
        setModalData({question, answer})
    }

    const onEditCard = (cardId: string, question: string, answer: string) => {
        setModalEditShow(true)
        setModalData({cardId, question, answer})
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
                                <button className={s.card__info_btn} onClick={() => onClickInfo(card.question, card.answer)}>Click for info</button>
                                <div><EditIcon className={s.card__edit_btn} size='28' onClick={() => onEditCard(card._id, card.question, card.answer)}/></div>
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
                <div className={s.footer__select}>
                    <Select 
                        onSelectValue={onItemsCountChange}
                        selectValues={[9, 15, 30, 45, 99]}
                    />
                </div>
            </div>
            <CardInfoModal 
                show={modalInfoShow}
                setShow={setModalInfoShow}
                question={modalData.question}
                answer={modalData.answer}
            />
            <CardEditModal 
                show={modalEditShow}
                setShow={setModalEditShow}
                cardPackId={cardPackId}
                cardId={modalData.cardId!}
                question={modalData.question}
                answer={modalData.answer}
            />
            <AddCardModal
                show={modalAddShow}
                setShow={setModalAddShow}
                cardPackId={cardPackId}
            />
        </div>
    )
}

export default Cards


// types
type ModalDataType = {
    question: string
    answer: string
    cardId?: string
} 