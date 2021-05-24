import React, { useState, ChangeEvent, useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { AppRootStateType } from '../../../redux/store'
import {BsX as CloseIcon} from 'react-icons/bs'
import s from './ModalEditPack.module.css'

const ModalEditPack: React.FC<PropsType> = ({show, setShow, packId, packName}) => {

    const dispatch = useDispatch()

    const [newPackName, setNewPackName] = useState<string>('')

    const isEditSuccess = useSelector<AppRootStateType, boolean>((state) => state.packs.isPackActionSuccess)

    useEffect(() => {
        setNewPackName(packName)
    }, [packName])

    useEffect(() => {
        setShow(false)
        dispatch(setPackActionStatusAC(false))
    }, [isEditSuccess])

    const namePackEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPackName(e.currentTarget.value)
    }

    const onUpdateClick = () => {
        dispatch(UpdatePackTC(packId, newPackName))
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <div className={s.modal}>
                        <div className={s.modal__header}>
                            <div>Edit pack name</div>
                            <CloseIcon 
                                className={s.header__icon} 
                                size={35}
                                onClick={closeModal}
                            />
                        </div>
                        <div className={s.modal__input}>
                            <div className={s.input__title}>Name pack</div>
                            <input onChange={namePackEditHandler} value={newPackName} placeholder='New pack name'/>
                        </div>
                        <div className={s.modal__buttons}>
                            <button className={s.buttons__cancel} onClick={closeModal}>Cancel</button>
                            <button className={s.buttons__save} onClick={onUpdateClick}>Save</button>
                        </div>
                    </div>
                }
            </ModalPopup>
        </>
    )
}

export default ModalEditPack

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    packId: string
    packName: string
}