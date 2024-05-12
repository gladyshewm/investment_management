import React from "react";
import Stats from "./Stats";
/* import { useParams } from "react-router-dom"; */
import { useLocation } from 'react-router-dom';

const StockChart = () => {
    /* const { figi } = useParams(); */
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const figi = searchParams.get('figi');
    const name = searchParams.get('name');
    const ticker = searchParams.get('ticker');

    return (
        <div>
            <Stats figi={figi} name={name} ticker={ticker} />
        </div>
    )
};

export default StockChart;
