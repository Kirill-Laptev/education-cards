import React, { useEffect } from 'react'
import { useTable, Column } from 'react-table'
import './table.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppRootStateType } from '../../redux/store'
import { getPacksTC, addNewPackTC, deletePackTC, UpdatePackTC } from '../../redux/packs-reducer/packs-reducer'
import { PacksType } from '../../api/loginAPI'
import AlertPopup from '../../components/AlertPopup/AlertPopup'
import { Redirect } from 'react-router-dom'


const Packs = () => {

    const dispatch = useDispatch()

    const responseData = useSelector<AppRootStateType, PacksType[]>((state) => state.packs.cardPacks)
    const serverErrorMessage = useSelector<AppRootStateType, string>((state) => state.packs.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

    const columnsNames: Column<PacksType>[] = [  
        {
            Header: 'Name', 
            accessor: 'name'
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
                    <button style={{height: '20px'}} onClick={() => onUpdatePack(original._id)}>Update</button>
                </div>     
            )
        },
        {Header: 'Cards'}
    ]

    useEffect(() => {
        dispatch(getPacksTC())
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
        dispatch(addNewPackTC())
    }

    const onPackDelete = (id: string) => {
        dispatch(deletePackTC(id))
    }

    const onUpdatePack = (id: string) => {
        dispatch(UpdatePackTC(id))
    }

    if(!isLoggedIn){
        return <Redirect to='/login'/>
    }

    return (
        <>
            <button onClick={onAddNewPack} style={{width: '100px', height: '60px'}}>Add</button>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (            
                        <tr{...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (    
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
