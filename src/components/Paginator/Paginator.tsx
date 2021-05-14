import React, { useState } from 'react'
import s from './Paginator.module.css'

const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, itemsOnPage, currentPage, onPageChanged}) => {

    const [portionNumber, setPortionNumber] = useState(1)

    const pagesCount = Math.ceil(totalItemsCount/itemsOnPage)

    const pages = []

    for(let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount/10) // Количество порций отображаемых страниц по 10

    const leftPortionPageNumber = (portionNumber - 1) * 10 + 1
    const rightPortionPageNumber = portionNumber * 10

    return (
        <div>
            {portionNumber > 1
            ? <button onClick={() => setPortionNumber(portionNumber - 1)} className={s.btn__prev}>PREV</button>  // Только если у нас номер порции больше 1 - показываем кнопку влево
            : ''}

            {pages
            .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber ) // Делаем фильтрацию, которая возвращает массив только в определенном диапазоне, например числа от 21 до 30
            .map((page) => {
                return <span className={currentPage === page ? s.btn__active: s.btn}
                onClick={ () => {onPageChanged(page)}}>{page + ' '}</span>
                })}

            {portionCount > portionNumber // Стрелка вправо будет показываться только тогда когда количество порций больше, чем количество текущей порции
            ? <button onClick={() => setPortionNumber(portionNumber + 1)} className={s.btn__next}>NEXT</button> // При клике на стрелку устанавливаем номер  порции больше на 1
            : ''} 
        </div>
    )
}

export default Paginator

type PaginatorPropsType = {
    totalItemsCount: number
    itemsOnPage: number
    currentPage: number
    onPageChanged: Function
}