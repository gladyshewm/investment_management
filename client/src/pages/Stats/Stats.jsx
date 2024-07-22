import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import CandleChart from "../../components/Charts/CandleChart/CandleChart";
import "./Stats.css";
import Loading from "../../components/Loading/Loading";

const Stats = ({ figi, name, ticker }) => {
    const [candle, setCandle] = useState([]);
    const [interval, setInterval] = useState('year');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const callBackendAPI = async (selectedInterval) => {
            try {
                const response = await fetch(`/api/${selectedInterval}-candles/${figi}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                const candlesData = jsonData.candles;
                const data = [[
                    "Day", "Low", "Open", "Close", "High",
                    { role: "tooltip", type: "string", p: { html: true } }
                ]];
    
                candlesData.forEach(candle => {
                    const date = new Date(candle.time);
                    data.push([
                        date, candle.low, candle.open, candle.close, candle.high,
                        `
                        <div class="tooltip-content">
                            <div class="item">${date.toLocaleString()}</div>
                            <div class="item"><b>High:</b> ${candle.high}</div>
                            <div class="item"><b>Open:</b> ${candle.open}</div>
                            <div class="item"><b>Close:</b> ${candle.close}</div>
                            <div class="item"><b>Low:</b> ${candle.low}</div>
                        </div>
                        `
                    ]);
                });
                setCandle(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCandle([]);
            }
        };

        callBackendAPI(interval);
    }, [interval, figi]);

    return (
        <div className="stats">
            <Sidebar />
            {isLoading ? <Loading /> :
                <div className="stats-main">
                    <div className="title">
                        <span>График {name} ({ticker})</span>
                        <div className="chart-controls">
                            <button
                                data-text="1 день в 5-минутных интервалах"
                                className="tooltip"
                                onClick={() => setInterval(() => 'day')}
                            >1Д</button>
                            <button
                                data-text="5 дней в 1-часовых интервалах"
                                className="tooltip"
                                onClick={() => setInterval(() => 'week')}
                            >5Д</button>
                            <button
                                data-text="30 дней в 1-дневных интервалах"
                                className="tooltip"
                                onClick={() => setInterval(() => 'month')}
                            >1М</button>
                            <button
                                data-text="1 год в 1-недельных интервалах"
                                className="tooltip"
                                onClick={() => setInterval(() => 'year')}
                            >1Г</button>
                        </div>
                    </div>
                    <div className="chart-block">
                        <CandleChart data={candle} />
                    </div>
                </div>
            }
        </div>
    )
};

export default Stats;
