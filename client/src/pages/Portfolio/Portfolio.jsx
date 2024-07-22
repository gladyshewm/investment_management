import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import { COLUMNS } from "../../components/Table/portfolio_columns";
import user from "../../api/user";
import investData from "../../api/investData";
import ArrowLeftIcon2 from "../../components/UI/icons/ArrowLeftIcon2";
import BriefCaseIcon from "../../components/UI/icons/BriefCaseIcon";

const Portfolio = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedPortfolioId = localStorage.getItem('selectedPortfolioId');
        const storedData = localStorage.getItem('portfolioData');
        setSelectedPortfolioId(selectedPortfolioId);
        const lastUpdated = localStorage.getItem('portfolioDataLastUpdated');

        if (storedData && lastUpdated) {
          const storedDataTimestamp = new Date(lastUpdated).getTime();
          const currentTime = new Date().getTime();

          const isDataRecent = (currentTime - storedDataTimestamp) < (20 * 60 * 1000);

          if (isDataRecent) {
            setTableData(JSON.parse(storedData));
            setIsLoading(false);
            return;
          }
        }

        if (selectedPortfolioId) {
          const portfolioShare = await user.getPortfolio(selectedPortfolioId);
          const tickerList = portfolioShare.map(item => item.ticker).join(',');
          const prices = await investData.getLatestPrices(tickerList);

          for (const share of portfolioShare) {
            const ticker = share.ticker;
            if (prices[ticker]) {
              const priceData = prices[ticker];
              share.price = priceData.price.price;
              share.figi = priceData.figi;
              share.currency = priceData.currency;

              const dividends = await investData.getDividends(priceData.figi);
              const dividend_net = dividends.dividend?.dividend_net;
              const payment_date = dividends.dividend?.payment_date;
              const yield_value = dividends.dividend?.yield_value;

              share.dividend_net = dividend_net;
              share.payment_date = payment_date;
              share.yield_value = yield_value;
            } else {
              console.warn(`Price not found for ticker ${ticker}`);
            }
          }

          localStorage.setItem('portfolioData', JSON.stringify(portfolioShare));
          localStorage.setItem('portfolioDataLastUpdated', new Date().toISOString());
          setTableData(portfolioShare);
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
              {!selectedPortfolioId ?
                <div className="not-found__wrapper">
                  <div className="not-found">
                    <span>Портфели отсутствуют</span>
                    <Link to="/create-portfolio">
                      Создать портфель
                      <BriefCaseIcon stroke={"currentColor"} />
                    </Link>
                  </div>
                </div> :
                (
                  tableData.length > 0 ?
                    <div className="portf-table">
                      <Table columns={columns} data={tableData} />
                    </div> :
                    <div className="table-not-found">
                      <div className="table-not-found__title">Портфель пуст</div>
                      <Link to={"/portfolio/add-asset"}>
                        <span>Заполнить портфель</span>
                        <ArrowLeftIcon2 />
                      </Link>
                    </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Portfolio;
