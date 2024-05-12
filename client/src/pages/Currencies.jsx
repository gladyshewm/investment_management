import React, { useState, useMemo, useEffect } from "react";
import { COLUMNS } from "../components/Table/currencies_columns";
import Table from "../components/Table/Table";
import Sidebar from "../components/UI/sidebar/Sidebar";
import "./Currencies.css";
import Loading from "../components/Loading/Loading";

const Currencies = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [currenciesData, setCurrenciesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const callAPICurrencies = async () => {
        try {
            const response = await fetch('/api/currencies');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const storedData = localStorage.getItem('currenciesData');
            const lastUpdated = localStorage.getItem('currenciesDataLastUpdated');

            if (storedData && lastUpdated) {
                const storedDataTimestamp = new Date(lastUpdated).getTime();
                const currentTime = new Date().getTime();

                // Проверяем, были ли данные обновлены за последний час
                const isDataRecent = (currentTime - storedDataTimestamp) < (60 * 60 * 1000);

                if (isDataRecent) {
                    setCurrenciesData(JSON.parse(storedData));
                    setIsLoading(false);
                    return;
                }
            }
            const data = await callAPICurrencies();
            setCurrenciesData(data);
            localStorage.setItem('currenciesData', JSON.stringify(data));
            localStorage.setItem('currenciesDataLastUpdated', new Date().toISOString());
            setIsLoading(false);
        };
        fetchData();
    }, [setCurrenciesData]);

    return (
        <div className="container">
            <Sidebar />
            <div className="main currencies">
                {
                    isLoading ? <Loading /> : <Table columns={columns} data={currenciesData} />
                }
            </div>
        </div>
    )
};

export default Currencies;
