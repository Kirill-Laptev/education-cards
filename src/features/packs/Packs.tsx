import React, { useEffect, useState, ChangeEvent } from 'react'
import { useTable, Column } from 'react-table'
import './table.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { getPacksTC, addNewPackTC, deletePackTC, UpdatePackTC, GetPacksRequestType } from '../../redux/packs-reducer/packs-reducer'
import { PacksType } from '../../api/api'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import { Redirect } from 'react-router-dom'
import { SortRoute } from '../../helpers/enum'


const Packs = () => {

    const [searchName, setSearchName] = useState<string>('')

    const dispatch = useDispatch()

    const responseData = useSelector<AppRootStateType, PacksType[]>((state) => state.packs.cardPacks)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.packs.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)
    const requestParams = useSelector<AppRootStateType, GetPacksRequestType>((state) => state.packs.requestParams) 
    // const token = useSelector<AppRootStateType, string>((state) => state.profile.token)
    const userId = useSelector<AppRootStateType, string>((state) => state.profile._id)

    const columnsNames: Column<PacksType>[] = [  
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Cards count', 
            accessor: 'cardsCount'
        },
        {
            Header: 'Updated', 
            accessor: 'updated'
        },
        {
            Header: 'Action', 
            //@ts-ignore
            Cell: ({row: {original}}) => (
                <div>
                    <button style={{width: '20px', height: '20px', marginRight: '5px'}} onClick={() => onPackDelete(original._id)}>-</button>
                    <button style={{height: '20px'}} onClick={() => onUpdatePack(original._id, 'my update pack')}>Update</button>
                </div>     
            )
        },
        {Header: 'Cards'}
    ]

    useEffect(() => {
        dispatch(getPacksTC(requestParams))
    }, [])  
    
    
    const columns = React.useMemo(() => columnsNames, [])
    const data = React.useMemo(() => responseData, [responseData])

    const tableInstance = useTable({
        columns,
        data,
      })

    const { 
        getTableProps,
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow 
    } = tableInstance

    const onAddNewPack = () => {
        dispatch(addNewPackTC('New title', {sortPacks: SortRoute.updateUp}))
    }

    const onPackDelete = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const onUpdatePack = (id: string, newTitle: string) => {
        dispatch(UpdatePackTC(id, newTitle))
    }

    // const searchByNameHandler = (e: ChangeEvent<HTMLInputElement>) => {  // Как реализовать live поиск ?
    //     setSearchName(e.currentTarget.value)
    //     dispatch(getPacksTC({packName: searchName, userId}))
    // }

    const searchByNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }
    const onSearchClick = () => {
        dispatch(getPacksTC({packName: searchName, userId}))
    }

    const onSortClick = (sortRoute: string) => { 
        dispatch(getPacksTC({sortPacks: sortRoute}))
    }


    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }

    return (
        <>  
            <div>Search pack by name</div>
            <input type='text' onChange={searchByNameHandler} value={searchName} style={{border: '1px solid', width: '200px', height: '30px'}}/>
            <button onClick={onSearchClick} style={{width: '50px', height: '30px', marginRight: '50px'}}>Search</button>
            <button onClick={onAddNewPack} style={{width: '100px', height: '60px'}}>Add pack</button>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (            
                        <tr{...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (    
                            <th {...column.getHeaderProps()}>{column.render('Header')}
                            {column.Header === 'Name' && <span onClick={() => onSortClick(SortRoute.nameUp)}>🔼</span>}
                            {column.Header === 'Name' &&  <span onClick={() => onSortClick(SortRoute.nameDown)}>🔽</span>}
                            {column.Header === 'Cards count' && <span onClick={() => onSortClick(SortRoute.countUp)}>🔼</span>}
                            {column.Header === 'Cards count' && <span onClick={() => onSortClick(SortRoute.countDown)}>🔽</span>}
                            {column.Header === 'Updated' &&  <span onClick={() => onSortClick(SortRoute.updateUp)}>🔼</span>}
                            {column.Header === 'Updated' &&  <span onClick={() => onSortClick(SortRoute.updateDown)}>🔽</span>}</th>
                            ))}
                        </tr>
                    ))}            
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )  
                    })}
                </tbody>
            </table>
            <AlertPopup message={serverErrorMessage}/>
        </>
    )
}

export default Packs
