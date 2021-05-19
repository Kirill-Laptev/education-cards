import React, { ChangeEvent } from 'react'
import s from './Select.module.css'

const Select: React.FC<PropsType> = ({onSelectValue, selectValues}) => {
    return (
        <div className={s.select__outer}>
            <span className={s.select__start}>Show</span>
            <select className={s.select} onChange={onSelectValue}>
                {selectValues.map((itemsOnPage) => (
                    <option key={itemsOnPage} value={itemsOnPage}>{itemsOnPage}</option>
                ))}
            </select>
            <span className={s.select__end}>Packs per page</span>
        </div>
    )
}

export default Select

type PropsType = {
    onSelectValue: (e: ChangeEvent<HTMLSelectElement>) => void
    selectValues: Array<number>
}