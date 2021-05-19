import React, { useState, ChangeEvent, useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { UpdatePackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { AppRootStateType } from '../../../redux/store'

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

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <> 
                        <input onChange={namePackEditHandler} value={newPackName}/>
                        <div><button onClick={onUpdateClick}>UPDATE</button></div>
                    </>
                }
            </ModalPopup>
        </div>
    )
}

export default ModalEditPack

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
    packId: string
    packName: string
}