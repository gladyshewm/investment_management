const NameCell = ({ value, row }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{value}</div>
            <div className="asset-cell__ticker">{row.original.ticker}</div>
        </div>
    );
};

const PriceCell = ({ value, row }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{(value * row.original.quantity).toFixed(2) + " ₽"}</div>
            <div className="asset-cell__ticker">{value.toFixed(2) + " ₽"}</div>
        </div>
    );
};

const DivCell = ({ value, row }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{row.original.currency === "usd" ? (value * 92.31 * row.original.quantity).toFixed(2) + " ₽" : (value ? (value * row.original.quantity).toFixed(2) + " ₽" : "-")}</div>
            <div className="asset-cell__ticker">
                {row.original.currency === "usd" ? (value * 92.31).toFixed(2) + " ₽" : (value ? value.toFixed(2) + " ₽" : "")}
            </div>
        </div>
    );
};

const YieldCell = ({ value }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{value ? value + " %" : "-"}</div>
        </div>
    );
};

const DateCell = ({ value }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{value ? new Date(value).toLocaleDateString() : "-"}</div>
        </div>
    );
};

export const COLUMNS = [
    {
        Header: 'Актив',
        accessor: 'name',
        Cell: NameCell
    },
    {
        Header: 'Кол-во',
        accessor: 'quantity',
    },
    {
        Header: 'Текущая стоимость',
        accessor: 'price',
        Cell: PriceCell
    },
    {
        Header: 'Дивиденды',
        accessor: 'dividend_net',
        Cell: DivCell
    },
    {
        Header: 'Див. доходность',
        accessor: 'yield_value',
        Cell: YieldCell
    },
    {
        Header: 'Дата след. выплаты',
        accessor: 'payment_date',
        Cell: DateCell
    },
];
