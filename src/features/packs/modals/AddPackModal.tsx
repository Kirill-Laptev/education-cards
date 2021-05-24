import React, { ChangeEvent, useState, useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { SortDirection } from '../../../helpers/enum'
import { AppRootStateType } from '../../../redux/store'
import s from './AddPackModal.module.css'
import {BsX as CloseIcon} from 'react-icons/bs'

const AddPackModal: React.FC<PropsType> = ({show, setShow}) => {

    const dispatch = useDispatch()

    const [packName, setPackName] = useState<string>('')

    const isAddPackSuccess = useSelector<AppRootStateType, boolean>((state) => state.packs.isPackActionSuccess)

    useEffect(() => {
        setShow(false)
        dispatch(setPackActionStatusAC(false))
        setPackName('')
    }, [isAddPackSuccess])

    const AddPackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }

    const onAddCard = () => {   // packName - сортировка по имени колод
        dispatch(addNewPackTC(packName, {sortPacks: SortDirection.updateUp, packName: '', page: 1}))
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
                            <div>Add new pack</div>
                            <CloseIcon 
                                className={s.header__icon} 
                                size={35}
                                onClick={closeModal}
                            />
                        </div>
                        <div className={s.modal__input}>
                            <div className={s.input__title}>Name pack</div>
                            <input onChange={AddPackNameHandler} value={packName} placeholder='Name pack'/>
                        </div>
                        <div className={s.modal__buttons}>
                            <button className={s.buttons__cancel} onClick={closeModal}>Cancel</button>
                            <button className={s.buttons__save} onClick={onAddCard}>Save</button>
                        </div>
                    </div>
                }
            </ModalPopup>
        </>
    )
}

export default AddPackModal

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
}