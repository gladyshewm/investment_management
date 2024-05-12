import GraphIcon from "../UI/icons/GraphIcon";
import { Link } from "react-router-dom";

export const COLUMNS = [
    {
        Header: 'Название',
        accessor: 'name',
        className: 'column-data-name'
    },
    {
        Header: 'Тикер',
        accessor: 'ticker',
        className: 'column-data'
    },
    {
        Header: 'График',
        Cell: ({ row }) =>
            <div className="graph-block">
                <Link to={`/graph?figi=${row.original.figi}&name=${encodeURIComponent(row.original.name)}&ticker=${row.original.ticker}`}>
                    <div className="graph-icon">
                        <GraphIcon />
                    </div>
                </Link>
            </div>,
        headerClassName: 'column-header-graph',
        accessor: 'graphData',
        className: 'column-data-graph'
    },
    {
        Header: 'Цена, посл',
        accessor: 'price',
        Cell: ({ value }) => <div>{value + " ₽"}</div>,
        className: 'column-data-price'
    },
    {
        Header: 'Лотность',
        accessor: 'lot',
        className: 'column-data-price'
    },
];