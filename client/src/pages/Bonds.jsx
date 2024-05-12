import React, { useState, useMemo, useEffect } from "react";
import Table from "../components/Table/Table";
//import MOCK_DATA from "../components/Table/MOCK_DATA";
import { COLUMNS } from "../components/Table/bonds_columns";
import "./Bonds.css"
import Sidebar from "../components/UI/sidebar/Sidebar";
import { BondsProvider, useBondsData } from "../context/BondsContext";
import Loading from "../components/Loading/Loading";

const Bonds = () => {
    const columns = useMemo(() => COLUMNS, []);
    const { bondsData, setBondsData } = useBondsData();
    const [isLoading, setIsLoading] = useState(true);

    const callAPIBonds = async () => {
        try {
            console.log("Вызов API");
            const response = await fetch('/api/bonds');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const storedData = localStorage.getItem('bondsData');
            const lastUpdated = localStorage.getItem('bondsDataLastUpdated');

            if (storedData && lastUpdated) {
                const storedDataTimestamp = new Date(lastUpdated).getTime();
                const currentTime = new Date().getTime();

                // Проверяем, были ли данные обновлены за последний час
                const isDataRecent = (currentTime - storedDataTimestamp) < (60 * 60 * 1000);
                if (isDataRecent) {
                    setBondsData(JSON.parse(storedData));
                    /* setTimeout(() => {
                        setIsLoading(false);
                    }, 1000); */
                    setIsLoading(false);
                    return;
                }
            }
            const data = await callAPIBonds();
            setBondsData(data);
            localStorage.setItem('bondsData', JSON.stringify(data));
            localStorage.setItem('bondsDataLastUpdated', new Date().toISOString());
            setIsLoading(false);
        };
        fetchData();
    }, [setBondsData]);

    return (
        <BondsProvider>
            <div className="container">
                <Sidebar />
                <div className="main bonds">
                    {
                        isLoading ? <Loading /> : <Table columns={columns} data={bondsData} />
                    }
                </div>
            </div>
        </BondsProvider>
    )
};

export default Bonds;
