const getFigiByTicker = async (ticker) => {
    try {
        const data = await fetch(`/api/sharefigi/${ticker}`);
        const figi = await data.json();

        return figi;
    } catch (error) {
        console.error('Error fetching figi:', error.message);
    }
}

const getCandles = async (figi, selectedInterval) => {
    try {
        const response = await fetch(`/api/${selectedInterval}-candles/${figi}`);
        const candles = await response.json();

        return candles;
    } catch (error) {
        console.error('Error fetching candles:', error.message);
    }
}

const getCostPortfolio = async (portfolio_id) => {
    try {
        const res = await fetch(`/api/portfolio-cost/${portfolio_id}`);
        const cost = await res.json();

        return cost;
    } catch (error) {
        console.error('Error fetching /api/portfolio-cost', error.message);
    }
}

const getLatestPrices = async (tickers) => {
    try {
        const res = await fetch(`/api/latest_prices`, {
            method: 'GET',
            headers: {
                'ticker-list': `${tickers}`,
            },
        });
        const prices = await res.json();

        return prices;
    } catch (error) {
        console.error('Error fetching /api/latest-prices', error.message);
    }
}

const getDividends = async (figi) => {
    try {
        const res = await fetch(`/api/dividends/${figi}`);
        const dividends = await res.json();

        return dividends;
    } catch (error) {
        console.error('Error fetching /api/dividends', error.message);
    }
};

const investData = {
    getFigiByTicker,
    getCandles,
    getCostPortfolio,
    getLatestPrices,
    getDividends
};

export default investData;