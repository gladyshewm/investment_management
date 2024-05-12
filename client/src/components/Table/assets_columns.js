const OpeationCell = ({ value }) => {
    const className = value === 'Покупка' ? 'purchase' : 'sale';
    return <div className={className}>{value}</div>;
};

const CostCell = ({ value }) => {
    const className = value < 0 ? 'sale' : 'purchase';
    const formattedValue = value >= 0 ? `+${value}` : value;
    return <div className={className}>{formattedValue + " ₽"}</div>
};

const AssetCell = ({ value, row }) => {
    return (
        <div className="asset-cell">
            <div className="asset-cell__name">{value}</div>
            <div className="asset-cell__ticker">{row.original.ticker}</div>
        </div>
    );
}

export const COLUMNS = [
    {
        Header: 'Операция',
        accessor: 'type_of_operation',
        Cell: ({ value }) => <OpeationCell value={value} />,
    },
    {
        Header: 'Актив',
        accessor: 'name',
        Cell: AssetCell
    },
    {
        Header: 'Дата',
        accessor: 'date_of_operation',
    },
    {
        Header: 'Кол-во, шт',
        accessor: 'quantity',
    },
    {
        Header: 'Цена',
        accessor: 'price',
        Cell: ({ value }) => <div>{value + " ₽"}</div>,
    },
    {
        Header: 'Комиссия',
        accessor: 'commission',
        Cell: ({ value }) => <div>{value + "%"}</div>,
    },
    {
        Header: 'Сумма',
        accessor: 'cost',
        Cell: ({ value }) => <CostCell value={value} />,
    },
];
