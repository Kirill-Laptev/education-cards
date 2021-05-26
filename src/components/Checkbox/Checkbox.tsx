import React, { ChangeEvent } from 'react'
import s from './Checkbox.module.css'

const CheckBox: React.FC<PropsType> = ({value, title, selectedValue, onChangeValue}) => {
    return (
        <div className={s.checkbox__wrapper}>
            <label className={s.label}>
              <input 
                    type='radio' 
                    value={value}
                    className={s.checkbox}
                    checked={selectedValue === value ? true : false}
                    onChange={onChangeValue} />
                {title}
            </label>
        </div>
    )
}

export default CheckBox

type PropsType = {
    value: number
    title?: string
    selectedValue: number
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
}