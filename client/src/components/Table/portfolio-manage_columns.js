import TrashIcon from "../UI/icons/TrashIcon";
import user from "../../api/user";
const handleDelete = async (portfolio_id) => {
    try {
        await user.deletePortfolio(portfolio_id);
        window.location.reload();
    } catch (error) {
        console.error('Error deleting portfolio:', error.message);
    }
}

export const COLUMNS = [
    {
        Header: 'Название',
        accessor: 'portfolio_name',
        className: 'portfolio-name'
    },
    {
        Header: 'Цель',
        accessor: 'goal',
        className: 'portfolio-goal'
    },
    {
        Header: 'Дата создания',
        accessor: 'created_at',
    },
    {
        id: 'remove-column',
        Cell: ({ row }) => (
            <div className="portfolio-remove-block">
                <button className="portfolio-remove-btn" onClick={() => handleDelete(row.original.portfolio_id)}><TrashIcon stroke={"rgba(255, 255, 255, 0.8)"} /></button>
            </div>
        ),
        accessor: 'id',
        className: 'portfolio-remove'
    }
];
