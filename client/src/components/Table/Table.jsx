import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import "./table.css";
import SortIcon from "../UI/icons/SortIcon";
import SortDescIcon from "../UI/icons/SortDescIcon";
import SortAscIcon from "../UI/icons/SortAscIcon";
import InputFilter from "../UI/input_filter/InputFilter";
import Pagination from "../UI/pagination/Pagination";
import PlusIcon from "../UI/icons/PlusIcon";
import CircleIcon from "../UI/icons/CircleIcon";

const Table = ({ columns, data, extraBlock }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        prepareRow,
        setGlobalFilter
    } = useTable({
        columns: columns,
        data: data,
        initialState: {
            pageIndex: 0,
            pageSize: 15
        }
    },
        useGlobalFilter, useSortBy, usePagination);

    const { pageIndex } = state;
    const { globalFilter } = state;

    return (
        <div className="table-container">
            <div className="table-container__top">
                <InputFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Поиск" />
                <div className="right-block">
                    <Link to="/portfolio/add-asset">
                        <div className="add-asset">
                            <PlusIcon stroke="currentColor"/>
                            <div className="add-asset__text">Добавить сделку</div>
                        </div>
                    </Link>
                    <div className="extra-block">
                        <div className="extra-block__el">
                            <div className="text">
                                <CircleIcon fill="#00B60F" /><span>Покупка</span>
                            </div>
                            <div>{extraBlock && extraBlock[0] + " ₽"}</div>
                        </div>
                        <div className="extra-block__el">
                            <div className="text">
                                <CircleIcon fill="#EF1211" /><span>Продажа</span>
                            </div>
                            <div>{extraBlock && extraBlock[1] + " ₽"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th className={`${column.className}`} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            {column.className === 'column-data-graph' ? null : (
                                                <span className="sort-container">
                                                    {column.isSorted ? (column.isSortedDesc ? <SortDescIcon /> : <SortAscIcon />) : <SortIcon />}
                                                </span>
                                            )}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            if (cell.column.Header === 'Название') {
                                                return (
                                                    <td className="td-data-name" {...cell.getCellProps()}>
                                                        <img src={row.original.logo_url} alt={row.original.name} />
                                                        <div className="td-data-name__content">
                                                            <span className="td-text">{cell.render('Cell')}</span>
                                                        </div>
                                                    </td>
                                                );
                                            } else if (cell.column.Header === 'График') {
                                                return (
                                                    <td className="td-data" {...cell.getCellProps()}>
                                                        <div className="td-data-graph__content">
                                                            <span className="td-text">{cell.render('Cell')}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            else {
                                                return (
                                                    <td className="td-data" {...cell.getCellProps()}>
                                                        <div className="td-data__content">
                                                            <span className="td-text">{cell.render('Cell')}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {pageCount > 1 && (
                <Pagination
                    pageIndex={pageIndex}
                    pageOptions={pageOptions}
                    gotoPage={gotoPage}
                    canPreviousPage={canPreviousPage}
                    pageCount={pageCount}
                    canNextPage={canNextPage}
                />
            )}
        </div>
    )
};

export default Table;
