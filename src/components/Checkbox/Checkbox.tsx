import React, { ChangeEvent } from 'react'

const CheckBox: React.FC<PropsType> = ({value, title, selectedValue, onChangeValue}) => {
    return (
        <div>
            <label>
              <input 
                    type='radio' 
                    value={value}
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