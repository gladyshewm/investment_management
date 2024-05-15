import supabase from "../supabase/supabase.js";

const getSortedPortfolioShares = async (portfolioId) => {
    const { data: portfolioShares, error } = await supabase
        .from('portfolio_shares')
        .select('ticker, quantity, type_of_operation, date_of_operation, quantity, commission, price')
        .eq('portfolio_id', portfolioId)
        .order('date_of_operation', { ascending: true }); // Сортировка по дате

    if (!portfolioShares) {
        console.error('Error fetching portfolio shares:', error.message);
        return;
    }

    const updatedPortfolioShares = portfolioShares.map(share => {
        const { commission, price, quantity } = share;
        const cost = (commission * price / 100 + price) * quantity;
        return { ...share, cost };
    });

    return updatedPortfolioShares;
}

const fetchLastPrices = async (figiList) => {
    try {
        const response = await fetch(`https://schenok.pythonanywhere.com/lastprices`, {
            method: 'GET',
            headers: {
                'Figi-List': `${figiList}`
            }
        });
        const data = await response.json();

        for (const figi of figiList) {
            const { data: currencyData, error } = await supabase
                .from('shares')
                .select('currency')
                .eq('figi', figi);

            if (error) {
                console.error(`Error fetching currency for figi ${figi}:`, error.message);
                continue;
            }

            if (currencyData && currencyData.length > 0 && currencyData[0].currency === 'usd') {
                data[figi].price *= 92.31;
            }
        }

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const fetchPricesInChunks = async (figiList) => {
    const figis = figiList.split(','); // Разбиваем список figi на отдельные элементы
    const chunkSize = 200; // Количество элементов для каждого запроса
    let offset = 0;
    const pricesData = {};

    while (offset < figis.length) {
        const figisChunk = figis.slice(offset, offset + chunkSize).join(',');

        const response = await fetch(`https://schenok.pythonanywhere.com/lastprices`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Figi-List': `${figisChunk}`
            }
        });

        const data = await response.json();

        // Объединяем данные о ценах из каждого запроса
        Object.assign(pricesData, data);

        offset += chunkSize;
    }

    return pricesData;
};

const dividendInfo = async (figiList) => {
    try {
        const response = await supabase
            .from('shares')
            .select('ticker, figi, currency, div_yield_flag')
            .in('figi', figiList);

        if (!response) {
            console.error('Error fetching data:', response.statusText);
            return null;
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const calculateTotalDividends = (dividends, currency) => {
    if (!dividends || !dividends.dividend) {
        return 0;
    }

    const dividendAmount = dividends.dividend.dividend_net;

    // Если валюта равна 'usd', умножаем на курс 92.31
    if (currency === 'usd') {
        return dividendAmount * 92.31;
    }

    return dividendAmount;
};

const calculateTotalDividendsForTicker = (portfolioShares) => {
    const tickerQuantities = {};

    portfolioShares.forEach((share) => {
        if (!tickerQuantities[share.ticker]) {
            tickerQuantities[share.ticker] = 0;
        }

        if (share.type_of_operation === 'Покупка') {
            tickerQuantities[share.ticker] += share.quantity;
        } else if (share.type_of_operation === 'Продажа') {
            tickerQuantities[share.ticker] -= share.quantity;
        }
    });

    return tickerQuantities;
};

const getDividends = async (figi) => {
    const url = `https://schenok.pythonanywhere.com/dividends/${figi}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dividends:', error.message);
        return null;
    }
};

const data = {
    getSortedPortfolioShares,
    fetchLastPrices,
    fetchPricesInChunks,
    dividendInfo,
    calculateTotalDividends,
    calculateTotalDividendsForTicker,
    getDividends
}

export default data;