import GraphIcon from "../UI/icons/GraphIcon";
import { Link } from "react-router-dom";

export const COLUMNS = [
    {
        Header: 'Название',
        accessor: 'name',
        Cell: ({ row }) =>
            <Link to={`/bond/${row.original.figi}/info`}>
                <span className="name-text">
                    {row.original.name}
                </span>
            </Link>,
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
        Header: 'Дата погашения',
        accessor: 'maturity_date',
        className: 'column-date'
    },
    {
        Header: 'Сектор',
        accessor: 'sector',
        className: 'column-sector'
    },
    {
        Header: 'Выплат по купонам/год',
        accessor: 'coupon_quantity_per_year',
        className: 'column-date'
    },
    {
        Header: 'Уровень риска',
        accessor: 'risk_level',
    },
/*     {
        Header: 'НКД',
        accessor: 'aci_value',
        className: 'column-date'
    }, */
];

/* () => (
    <div style={{textAlign: 'left'}}>
        Название
    </div>
), */