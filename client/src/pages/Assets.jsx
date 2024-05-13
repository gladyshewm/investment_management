import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/UI/sidebar/Sidebar";
import { COLUMNS } from "../components/Table/assets_columns";
import Table from "../components/Table/Table";
import user from "../api/user";
import Loading from "../components/Loading/Loading";
import ArrowLeftIcon2 from "../components/UI/icons/ArrowLeftIcon2";
import "./Assets.css";

const Assets = () => {
    const columns = useMemo(() => COLUMNS, []);

    const [isLoading, setIsLoading] = useState(true);
    const [portfolioShares, setPortfolioShares] = useState([]);
    const [totalCosts, setTotalCosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const selectedPortfolioId = localStorage.getItem('selectedPortfolioId');
                if (selectedPortfolioId) {
                    const portfolioShare = await user.getPortfolioShares(selectedPortfolioId);
                    const portfolioSharesData = portfolioShare.portfolioShares;
                    const total_cost_purchase = portfolioShare.total_cost_purchase;
                    const total_cost_sale = portfolioShare.total_cost_sale;
                    const totalCosts = [total_cost_purchase, total_cost_sale];
                    setTotalCosts(totalCosts);
                    portfolioSharesData.length > 0 ? setPortfolioShares(portfolioSharesData) : setPortfolioShares([]);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="portfolio-main">
            <Sidebar />
            {isLoading ? <Loading /> : (
                <div className="portfolio-block">
                    <div className="portfolio-block__main-wrapper">
                        <div className="portfolio-block__main">
                            {portfolioShares.length > 0 ?
                                <div className="portfolio-table">
                                    <Table columns={columns} data={portfolioShares} extraBlock={totalCosts} />
                                </div> :
                                <div className="table-not-found">
                                    <div className="table-not-found__title">Операций не найдено</div>
                                    <Link to={"/portfolio/add-asset"}>
                                        <span>Добавить сделки</span>
                                        <ArrowLeftIcon2 />
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Assets;
