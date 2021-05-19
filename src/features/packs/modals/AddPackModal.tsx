import React, { ChangeEvent, useState, useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { SortDirection } from '../../../helpers/enum'
import { AppRootStateType } from '../../../redux/store'

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

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <>
                        <div><input onChange={AddPackNameHandler} value={packName}/></div>
                        <div><button onClick={onAddCard}>ADD</button></div>
                    </>
                }
            </ModalPopup>
        </div>
    )
}

export default AddPackModal

type PropsType = {
    show: boolean
    setShow: (value: boolean) => void
}