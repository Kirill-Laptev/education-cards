import React, { useMemo, useEffect, useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { PacksType } from '../../api/api'
import s from './Packs.module.css'
import { getPacksTC, GetPacksRequestType, UpdatePackTC, deletePackTC, addNewPackTC } from '../../redux/packs-reducer/packs-reducer'
import { Redirect } from 'react-router-dom'
import { SortDirection } from '../../helpers/enum'
import { BiEdit as EditIcon } from 'react-icons/bi'
import { TiDeleteOutline as DeleteIcon } from 'react-icons/ti'
import { MdAddCircleOutline as AddIcon } from 'react-icons/md'
import { BsCaretUpFill as UpIcon } from 'react-icons/bs'
import { BsCaretDownFill as DownIcon } from 'react-icons/bs'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import Paginator from '../../components/Paginator/Paginator'
import Select from '../../components/Select/Select'

const Packs = () => {

    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')
    const [currentPage, setCurrentPage] = useState<number>(1)

    const packs = useSelector<AppRootStateType, PacksType[]>((state) => state.packs.packs)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.packs.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const requestParams = useSelector<AppRootStateType, GetPacksRequestType>((state) => state.packs.requestParams) 
    const packsTotalCount = useSelector<AppRootStateType, number>((state) => state.packs.packsTotalCount)
    const itemsOnPage = useSelector<AppRootStateType, number>((state) => state.packs.requestParams.pageCount!)
    const page = useSelector<AppRootStateType, number>((state) => state.packs.requestParams.page!)

    const columns = useMemo(() => [
        {id: 1, title: 'Name', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.nameUp, SortDirection.nameDown]},
        {id: 2, title: 'Cards count', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.countUp, SortDirection.countDown]},
        {id: 3, title: 'Updated', icons: [<UpIcon size='15'/>, <DownIcon size='15'/>], sort: [SortDirection.updateUp, SortDirection.updateDown]},
        {id: 4, title: 'Action'},
        {id: 5, title: 'Cards'}
    ], [])

    const packsRows = useMemo(() => packs, [packs])


    useEffect(() => {
        dispatch(getPacksTC(requestParams))
    }, [])

    useEffect(() => {
        setTimeout(() => setCurrentPage(page), 1000) 
    }, [page])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [itemsOnPage])


    const onAddNewPack = () => {
        dispatch(addNewPackTC('New title', {sortPacks: SortDirection.updateUp, packName: '', page: 1}))
    }

    const onPackDelete = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const onUpdatePack = (id: string, newTitle: string) => {
        dispatch(UpdatePackTC(id, newTitle))
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
                                        <EditIcon className={s.action__btn} size='25' onClick={() => onUpdatePack(row._id, "yo it's my pack")}/>
                                        <DeleteIcon className={s.action__btn} size='27' onClick={() => onPackDelete(row._id)}/>
                                    </div>
                                </td> 
                                <td></td>
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
                <Select onSelectValue={onItemsCountChange}/>
                <AlertPopup message={serverErrorMessage}/>  
            </div>   
        </>
    )
}

export default Packs
