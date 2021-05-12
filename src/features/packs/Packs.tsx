import React from 'react'
import { useTable, Column } from 'react-table'
import './table.css'
import { useSelector } from 'react-redux'

// const columnsNames: Column<FakeDataType>[] = [  
//     {Header: 'Name', accessor: 'name'},
//     {Header: 'Cards count', accessor: 'cardsCount'},
//     {Header: 'Updated', accessor: 'updated'},
//     {Header: 'Action'},
//     {Header: 'Cards'}
// ]

const Table: React.FC = () => {

    // const responseData = useSelector(() => )

    const columns = React.useMemo(() => columnsNames, [columnsNames])
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

    return (
        <>
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
        </>
    )
}

export default Table
