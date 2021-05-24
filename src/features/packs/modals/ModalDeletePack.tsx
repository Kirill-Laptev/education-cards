import React, { useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { deletePackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { AppRootStateType } from '../../../redux/store'
import {BsX as CloseIcon} from 'react-icons/bs'
import s from './ModalDeletePack.module.css'

const ModalDeletePack: React.FC<PropsType> = ({show, setShow, packId}) => {

    const dispatch = useDispatch()

    const isDeleteSuccess = useSelector<AppRootStateType, boolean>((state) => state.packs.isPackActionSuccess)

    useEffect(() => {
        setShow(false)
        dispatch(setPackActionStatusAC(false))
    }, [isDeleteSuccess])

    const onDeleteClick = () => {
        dispatch(deletePackTC(packId))
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <div className={s.modal}>
                        <div className={s.modal__header}>
                            <div>Delete pack</div>
                            <CloseIcon 
                                className={s.header__icon} 
                                size={35}
                                onClick={closeModal}
                            />
                        </div>
                        <div className={s.modal__description}>
                            <p>Do you really want to remove this pack?</p> 
                            <p>All cards will be excluded from this course</p>
                        </div>
                        <div className={s.modal__buttons}>
                            <button className={s.buttons__cancel} onClick={closeModal}>Cancel</button>
                            <button className={s.buttons__delete} onClick={onDeleteClick}>Delete</button>
                        </div>
                    </div>
                }
            </ModalPopup>
        </div>
    )
}

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    packId: string
}

export default ModalDeletePack
