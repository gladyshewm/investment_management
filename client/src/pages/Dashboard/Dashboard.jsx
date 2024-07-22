import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import "./Dashboard.css";
import PieChart from "../../components/Charts/PieChart/PieChart";
import Table from "../../components/Table/Table";
import BarChart from "../../components/Charts/BarChart/BarChart";
import { COLUMNS } from "../../components/Table/category_columns";
import WalletIcon from "../../components/UI/icons/WalletIcon";
import ArrowLeftIcon2 from "../../components/UI/icons/ArrowLeftIcon2";
import ArrowTrendingUpIcon from "../../components/UI/icons/ArrowTrendingUpIcon";
import BanknotesIcon from "../../components/UI/icons/BanknotesIcon";
import BriefCaseIcon from "../../components/UI/icons/BriefCaseIcon";
import ArrowDownIcon from "../../components/UI/icons/ArrowDownIcon";
import TriangleUpIcon from "../../components/UI/icons/TriangleUpIcon";
import TriangleDownIcon from "../../components/UI/icons/TriangleDownIcon";
import PlusIcon from "../../components/UI/icons/PlusIcon";
import ClipboardIcon from "../../components/UI/icons/ClipboardIcon";
import Loading from "../../components/Loading/Loading";
import user from "../../api/user";
import investData from "../../api/investData";
import portfolioMethods from "../../utils/portfolio";

const Dashboard = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolio, setPortfolio] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [dataForPieChart, setDataForPieChart] = useState([]);
    const [dataForBarChart, setDataForBarChart] = useState([]);
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
    const [totalInvested, setTotalInvested] = useState(0);
    const [costPorftolio, setCostPortfolio] = useState(0);
    const [profit, setProfit] = useState(0);
    const [diffInPercent, setDiffInPercent] = useState(0);
    const [xirr, setXirr] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const handlePortfolioChange = (event) => {
        setIsDataLoaded(false);
        const selectedId = event.target.value;
        setSelectedPortfolioId(selectedId);
        localStorage.setItem('selectedPortfolioId', selectedId);
    };

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const id = await user.getUserId();
                const portfolioData = await user.getPortfolios(id);
                setPortfolio(portfolioData);

                let defaultPortfolioId = localStorage.getItem('selectedPortfolioId');
                setSelectedPortfolioId(defaultPortfolioId);
                if (!defaultPortfolioId && portfolioData.length > 0) {
                    defaultPortfolioId = portfolioData[0].portfolio_id;
                    localStorage.setItem('selectedPortfolioId', defaultPortfolioId);
                    setSelectedPortfolioId(defaultPortfolioId);
                }

                const groupedPortfolioSharesData = await user.getGroupedPortfolioShares(defaultPortfolioId);
                const groupedData = groupedPortfolioSharesData.sharesData;
                let tableData = [];

                if (groupedData) {
                    tableData = Object.keys(groupedData).map((category) => ({
                        category,
                        quantity: groupedData[category].quantity,
                        price: groupedData[category].totalPrice
                    }));
                }

                const totalInvested = groupedPortfolioSharesData.totalInvested;
                setTotalInvested(totalInvested);

                setTableData(tableData);

                const pieChartData = portfolioMethods.formatDataForPieChart(tableData);

                setDataForPieChart(pieChartData);

                if (selectedPortfolioId && selectedPortfolioId !== undefined) {
                    try {
                        const port = await investData.getCostPortfolio(selectedPortfolioId);
                        const cost_portfolio = port.totalCost;
                        const xirrRate = port.rate;
                        setXirr(xirrRate);
                        setCostPortfolio(cost_portfolio);

                        const difference = cost_portfolio - totalInvested;
                        setProfit(parseFloat(difference.toFixed(2)));
                        const diffInPercent = (difference / totalInvested) * 100;
                        setDiffInPercent(parseFloat(diffInPercent.toFixed(2)));

                        const div = port.portfolioWithTotalDividends;
                        const chartData = div.map((item) => {
                            const totalDividends = item?.dividends?.total_dividends;
                            const paymentDate = item?.dividends?.dividend?.payment_date;
                            if (totalDividends && totalDividends !== 0) {
                                return {
                                    ticker: item?.ticker,
                                    paymentDate: paymentDate,
                                    totalDividends: totalDividends,
                                };
                            } else {
                                return null;
                            }
                        });
                        const filteredChartData = chartData.filter((item) => item !== null);
                        const barChartData = portfolioMethods.formatDataForBarChart(filteredChartData);
                        if (barChartData.length > 1) {
                            setDataForBarChart(barChartData)
                        } else {
                            setDataForBarChart([])
                        };

                        setIsDataLoaded(true);
                    } catch (error) {
                        console.error('Error fetching cost portfolio:', error.message);
                        setIsDataLoaded(true);
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
                setIsLoading(false);
            }
        };

        fetchPortfolioData();
    }, [selectedPortfolioId]);

    return (
        <div className="dashboard">
            <Sidebar />
            {isLoading ? (
                <Loading />
            ) : (
                <div className="dashboard-main">
                    {portfolio.error ? (
                        <div className="not-found__wrapper">
                            <div className="not-found">
                                <span>Портфели не найдены</span>
                                <Link to="/create-portfolio">
                                    Создать портфель
                                    <BriefCaseIcon stroke={"currentColor"} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {portfolio.length > 0 ? (
                                <>
                                    <div className="dashboard-header">
                                        <div className="add-block">
                                            <Link to="/create-portfolio">
                                                <PlusIcon stroke={"currentColor"} />
                                                <span>Создать портфель</span>
                                            </Link>
                                        </div>
                                        <div className="portfolio-select">
                                            <select
                                                value={selectedPortfolioId}
                                                onChange={handlePortfolioChange}
                                            >
                                                {portfolio.map((portfolio) => (
                                                    <option
                                                        key={portfolio.portfolio_id}
                                                        value={portfolio.portfolio_id}
                                                    >
                                                        {portfolio.portfolio_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="icon-container">
                                                <ArrowDownIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard-wrapper">
                                        <div className="financial-records">
                                            <div>
                                                <div className="title">
                                                    <BanknotesIcon />
                                                    Стоимость портфеля
                                                </div>
                                                <div className="count">
                                                    {!isDataLoaded ?
                                                        <Loading /> :
                                                        (costPorftolio != null && costPorftolio !== undefined) ? costPorftolio + "₽" : ""}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="title">
                                                    <WalletIcon stroke={"#990099"} />
                                                    Всего вложено
                                                </div>
                                                <div className="count">{!isDataLoaded ? "" : (totalInvested ? totalInvested + "₽" : "")}</div>
                                            </div>
                                            <div>
                                                <div className="title">
                                                    <ArrowTrendingUpIcon />
                                                    Прибыль
                                                </div>
                                                <div className="count">
                                                    {!isDataLoaded ? "" : (
                                                        <>
                                                            {profit ? profit + "₽" : ""}
                                                            {diffInPercent !== undefined && !isNaN(diffInPercent) && (
                                                                <span className="percent">
                                                                    {diffInPercent < 0 ? (
                                                                        <div className={profit < 0 ? "percent-content red" : profit > 0 ? "percent-content green" : "count"}>
                                                                            <TriangleDownIcon />{Math.abs(diffInPercent)}%
                                                                        </div>
                                                                    ) : (
                                                                        <div className={profit < 0 ? "percent-content red" : profit > 0 ? "percent-content green" : "count"}>
                                                                            <TriangleUpIcon />{diffInPercent}%
                                                                        </div>
                                                                    )}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="title xirr">
                                                    <ClipboardIcon />
                                                    Доходность
                                                </div>
                                                <div className="count">{!isDataLoaded ? "" : (xirr != null && xirr !== undefined) ? `${xirr}%` : ""}</div>
                                            </div>
                                        </div>
                                        <div className="statss">
                                            <div className="portfolio">
                                                <span className="title">Портфель</span>
                                                {tableData.length > 0 ?
                                                    <Table columns={columns} data={tableData} /> :
                                                    <div className="table-not-found">
                                                        <Link to={"/portfolio/add-asset"}>
                                                            <span>Заполнить портфель</span>
                                                            <ArrowLeftIcon2 />
                                                        </Link>
                                                    </div>
                                                }
                                            </div>
                                            <div className="portfolio-content">
                                                <div className="chart">
                                                    {
                                                        dataForPieChart.length > 1 ?
                                                            <PieChart data={dataForPieChart} /> :
                                                            <div className="pie-chart-not-found">Недостаточно данных</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="revenue">
                                            <div className="revenue-main">
                                                <span className="title">Будущие дивиденды</span>
                                                {isDataLoaded ?
                                                    (
                                                        dataForBarChart.length > 1 ?
                                                            <BarChart data={dataForBarChart} /> :
                                                            <div className="chart-not-found">Не найдено дивидендных выплат</div>
                                                    ) :
                                                    ""}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="not-found">
                                    <span>Портфели не найдены</span>
                                    <Link to="/create-portfolio">
                                        Создать портфель
                                        <BriefCaseIcon stroke={"currentColor"} />
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
};

export default Dashboard;