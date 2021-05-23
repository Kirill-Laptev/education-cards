import React, { useMemo, useEffect, useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { PacksType } from '../../api/api'
import s from './Packs.module.css'
import { getPacksTC, GetPacksRequestType } from '../../redux/packs-reducer/packs-reducer'
import { Redirect, NavLink } from 'react-router-dom'
import { SortDirection } from '../../helpers/enum'
import { BiEdit as EditIcon } from 'react-icons/bi'
import { TiDeleteOutline as DeleteIcon } from 'react-icons/ti'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { BsCaretUpFill as UpIcon } from 'react-icons/bs'
import { BsCaretDownFill as DownIcon } from 'react-icons/bs'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import Paginator from '../../components/Paginator/Paginator'
import Select from '../../components/Select/Select'
import AddPackModal from './modals/AddPackModal'
import ModalDeletePack from './modals/ModalDeletePack'
import ModalEditPack from './modals/ModalEditPack'
import Switch from '../../components/Switch/Switch'

const Packs = () => {

    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [modalAddShow, setModalAddShow] = useState<boolean>(false)
    const [modalDeleteShow, setModalDeleteShow] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ModalDataType>({} as ModalDataType)
    const [modalEditShow, setModalEditShow] = useState<boolean>(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const packs = useSelector<AppRootStateType, PacksType[]>((state) => state.packs.packs)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.packs.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const requestParams = useSelector<AppRootStateType, GetPacksRequestType>((state) => state.packs.requestParams) 
    const packsTotalCount = useSelector<AppRootStateType, number>((state) => state.packs.packsTotalCount)
    const itemsOnPage = useSelector<AppRootStateType, number>((state) => state.packs.requestParams.pageCount!)
    const page = useSelector<AppRootStateType, number>((state) => state.packs.requestParams.page!)
    const userId = useSelector<AppRootStateType, string>((state) => state.profile._id)

    const columns = useMemo(() => [
        {id: 1, title: 'Name', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.nameUp, SortDirection.nameDown]},
        {id: 2, title: 'Cards count', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.countUp, SortDirection.countDown]},
        {id: 3, title: 'Updated', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.updateUp, SortDirection.updateDown]},
        {id: 4, title: 'Action'},
        {id: 5, title: 'Cards'},
        {id: 6, title: "Let's learn"}
    ], [])

    const packsRows = useMemo(() => packs, [packs])


    useEffect(() => {
        dispatch(getPacksTC(requestParams))
    }, [])

    // useEffect(() => {
    //     setTimeout(() => setCurrentPage(page), 1000) 
    // }, [page])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [itemsOnPage])


    const onAddNewPack = () => {
        setModalAddShow(true)
    }

    const onPackDelete = (packId: string) => {
        setModalData({packId})
        setModalDeleteShow(true)
    }

    const onUpdatePack = (packId: string, packName: string) => {
        setModalData({packId, packName})
        setModalEditShow(true)
    }

    const searchByNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }
    const onSearchClick = () => {
        dispatch(getPacksTC({packName: searchName}))
        setSearchName('')
    }

    const onSortClick = (SortDirection: string) => { 
        dispatch(getPacksTC({sortPacks: SortDirection, page: 1}))
    }

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(getPacksTC({page: pageNumber}))
    }

    const onItemsCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacksTC({pageCount: +e.currentTarget.value}))
    }

    const onSwitchPrivatePack = () => {
        if(!isPrivate){
            setIsPrivate(true)
            dispatch(getPacksTC({...requestParams, user_id: userId}))
        } else {
            setIsPrivate(false)
            dispatch(getPacksTC({...requestParams, user_id: ''}))
        }
        
    }

    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }


    return (
        <>
        <div className={s.header}>
                <div className={s.search__title}><span>Search pack</span></div>
                <div className={s.search__field}>
                    <input 
                    type='text'
                    placeholder='Search by name' 
                    onChange={searchByNameHandler}
                    value={searchName}/>
                </div>
                <div className={s.search__btn}>
                    <button onClick={onSearchClick}>Search</button>
                </div>
                <div className={s.add}>
                    <button onClick={onAddNewPack}><AddIcon size='25'/><span>Add new cardspack</span></button>
                </div>
                <div className={s.private}>
                    <div className={s.private__title}>My packs</div>
                    <Switch 
                        color='#64c37d'
                        isOn={isPrivate}
                        handleToggle={onSwitchPrivatePack}
                    />
                </div>
            </div>
            <table className={s.table}>
                <thead>
                    <tr>
                        {columns.map((column) => {
                            return (
                                <th key={column.id}>
                                    {column.icons ?
                                        <div className={s.table__title}>
                                        <span>{column.title}</span>
                                        <div className={s.title__icons}>
                                            <span onClick={() => onSortClick(column.sort[0])}>{column.icons && column.icons[0]}</span>
                                            <span onClick={() => onSortClick(column.sort[1])}>{column.icons && column.icons[1]}</span>
                                        </div>
                                    </div>
                                    : <span>{column.title}</span>} 
                                </th>) 
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                        {packsRows.map((row) => (
                            <tr key={row._id}>
                                <td>{row.name}</td>
                                <td>{row.cardsCount}</td>
                                <td>{row.updated}</td>
                                <td>
                                    <div className={s.action__btns}>
                                        <EditIcon className={s.action__btn} size='25' onClick={() => onUpdatePack(row._id, row.name)}/>
                                        <DeleteIcon className={s.action__btn} size='27' onClick={() => onPackDelete(row._id)}/>
                                    </div>
                                </td> 
                                <td><NavLink to={`/cards/${row._id}`}>Cards</NavLink></td>
                                <td><NavLink to={`/learn/${row._id}`}>Learn</NavLink></td>
                            </tr>
                        ))}
                </tbody>
            </table> 
            <div className={s.table__footer}>
                <Paginator 
                    totalItemsCount={packsTotalCount}
                    itemsOnPage={itemsOnPage}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
                <div className={s.footer__select}>
                    <Select 
                        onSelectValue={onItemsCountChange}
                        selectValues={[10, 25, 50, 100]}
                    />
                </div>
                <AddPackModal 
                    show={modalAddShow}
                    setShow={setModalAddShow}
                />
                <ModalDeletePack 
                    show={modalDeleteShow}
                    setShow={setModalDeleteShow}
                    packId={modalData.packId}
                />
                <ModalEditPack 
                    show={modalEditShow}
                    setShow={setModalEditShow}
                    packId={modalData.packId}
                    packName={modalData.packName!}
                />
                <AlertPopup message={serverErrorMessage}/>  
            </div>   
        </>
    )
}

export default Packs

// types

type ModalDataType = {
    packId: string
    packName?: string
}