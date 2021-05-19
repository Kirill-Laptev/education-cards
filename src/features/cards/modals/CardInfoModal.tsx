import React from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'

const CardInfoModal: React.FC<PropsType> = ({show, setShow, question, answer}) => {
    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <>
                    <div>{question}</div>
                    <div>{answer}</div>
                    </>
                }
            </ModalPopup>
        </div>
    )
}

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    question: string
    answer: string
}

export default CardInfoModal
