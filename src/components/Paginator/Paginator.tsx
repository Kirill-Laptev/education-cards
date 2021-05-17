import React, { useState } from 'react'
import s from './Paginator.module.css'
import { FiChevronRight as RigthIcon } from 'react-icons/fi'
import { FiChevronLeft as LeftIcon } from 'react-icons/fi'

const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, itemsOnPage, currentPage, onPageChange}) => {

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
        <div className={s.paginator}>
            {portionNumber > 1
            ? <LeftIcon size='20' onClick={() => setPortionNumber(portionNumber - 1)} className={s.icon__prev}/>
            : ''}

            {pages
            .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber ) 
            .map((page) => {
                return <span className={currentPage === page ? s.btn__active: s.btn}
                onClick={ () => {onPageChange(page)}}>{page + ' '}</span>
                })}

            {portionCount > portionNumber 
            ? <RigthIcon size='20' onClick={() => setPortionNumber(portionNumber + 1)} className={s.icon__next}/>
            : ''} 
        </div>
    )
}

export default Paginator

type PaginatorPropsType = {
    totalItemsCount: number
    itemsOnPage: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}