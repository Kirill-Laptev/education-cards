import React, { useEffect } from 'react'
import ModalPopup from '../../../components/ModalPopup/ModalPopup'
import { useDispatch, useSelector } from 'react-redux'
import { deletePackTC, setPackActionStatusAC } from '../../../redux/packs-reducer/packs-reducer'
import { AppRootStateType } from '../../../redux/store'

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

    return (
        <div>
            <ModalPopup show={show} setShow={setShow}>
                {
                    <>
                        <div>Are you sure ?</div>
                        <div><button onClick={onDeleteClick}>DELETE</button></div>
                    </>
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
