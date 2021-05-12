import React from 'react'
import { useTable, Column } from 'react-table'
import './table.css'
import { fakeData, FakeDataType } from './fakeData'

// const COLUMNS: Column<FakeDataType>[] = [  
//     {Header: 'Name', accessor: 'name'},
//     {Header: 'Cards count', accessor: 'cardsCount'},
//     {Header: 'Updated', accessor: 'updated'},
//     {Header: 'Action'},
//     {Header: 'Cards'}
// ]

const Table: React.FC<TablePropsType> = ({columnsNames, responseData}) => {

    // Если не сделать React.memo, то на каждом ререндере компонента 
    // данные будут вновь воссоздаваться, если это будет большой объем данных, 
    // то это приведет к плохому перфомансу.
    const columns = React.useMemo(() => columnsNames, [columnsNames])
    const data = React.useMemo(() => responseData, [responseData])

    const tableInstance = useTable({
        columns,
        data,
      })

      const { 
          getTableProps, // Пропсы которые могут быть необходимы table
          getTableBodyProps, // Пропсы которые могут быть необходимы tbody
          headerGroups, // Информация залоговка столбца, которая лежит внутри thead-групп залоговков, является массивом
          rows,  // Строки
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


//types
type TablePropsType = {
    columnsNames: any
    responseData: any
}

// Теги таблицы
// 1) table - создает таблицу, то есть является контейнером для всего содержимого таблицы
// 2) thead - предназначен для группировки одной или нескольких строк в таблице,
// тем самым делая шапку таблицы
// 3) tbody - предназначен для хранения одной или нескольких строк таблицы
// 4) tr - является контейнером для создания строки таблицы
// 5) th - создает одну ячейку таблицу, которая является заголовочной
// 6) td - создает одну ячейку таблицы

// Так выглядит основная структура таблицы
{/* <table>
    <thead>
        <tr>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table> */}


// Что происходит в jsx ?
// Заголовки собираются в массив. Каждый заголовок берется как колонка и отрисовывается.
// Далее проходимся по всем строкам и в каждой строке получаем ячейку и отрисовываем ее.