import React, { ChangeEvent } from 'react'
import s from './Select.module.css'

const Select: React.FC<PropsType> = ({onSelectValue}) => {
    return (
        <div className={s.select__outer}>
            <span className={s.select__start}>Show</span>
            <select className={s.select} onChange={onSelectValue}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <span className={s.select__end}>Packs per page</span>
        </div>
    )
}

export default Select

type PropsType = {
    onSelectValue: (e: ChangeEvent<HTMLSelectElement>) => void
}