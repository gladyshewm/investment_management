import React, { useState, useMemo, useEffect } from "react";
import Table from "../../components/Table/Table";
import { COLUMNS } from "../../components/Table/shares_columns";
import "./Shares.css"
import Sidebar from "../../components/UI/sidebar/Sidebar";
import Loading from "../../components/Loading/Loading";

const Companies = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [sharesData, setSharesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const callAPIShares = async () => {
        try {
            console.log("вызов API");
            const response = await fetch('/api/shares');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const storedData = localStorage.getItem('sharesData');
            const lastUpdated = localStorage.getItem('sharesDataLastUpdated');

            if (storedData && lastUpdated) {
                const storedDataTimestamp = new Date(lastUpdated).getTime();
                const currentTime = new Date().getTime();

                const isDataRecent = (currentTime - storedDataTimestamp) < (20 * 60 * 1000);

                if (isDataRecent) {
                    setSharesData(JSON.parse(storedData));
                    setIsLoading(false);
                    return;
                }
            }
            const data = await callAPIShares();
            setSharesData(data);
            localStorage.setItem('sharesData', JSON.stringify(data));
            localStorage.setItem('sharesDataLastUpdated', new Date().toISOString());
            setIsLoading(false);
        };
        fetchData();
    }, [setSharesData]);

    return (
        <div className="container">
            <Sidebar />
            <div className="main shares">
                {
                    isLoading ? <Loading /> : <Table columns={columns} data={sharesData} />
                }
            </div>
        </div>
    )
};

export default Companies;
