import React from 'react'

interface ITextErrorPropsType {
    children?: React.ReactNode
}

const stylesError = {
    position: 'absolute' as const,
    bottom: '-19px',
    right: '0',
    fontSize: '14px',
    color: 'red'
}

export const TextError: React.FC<ITextErrorPropsType> = (props) => {
    return (
        <div style={stylesError}>
            {props.children}
        </div>
    )
}