import { Router } from "express";
import supabase from "../supabase/supabase.js";
import data from "../utils/data.js";
import xirr from 'xirr';
import apiData from "../api/api.js";

export const apiRouter = Router();

//свечи
apiRouter.get('/stats/:figi', async (req, res) => {
    const figi = req.params.figi;
    const url = `https://schenok.pythonanywhere.com/getcandles/${figi}`;

    const shareCandle = await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                return null;
            }
            return response.json();
        });

    res.send(shareCandle);
});

apiRouter.get('/day-candles/:figi', async (req, res) => {
    const figi = req.params.figi;
    const url = `https://schenok.pythonanywhere.com/getdaycandles/${figi}`;

    const shareCandle = await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                return null;
            }
            return response.json();
        });

    res.send(shareCandle);
});

apiRouter.get('/week-candles/:figi', async (req, res) => {
    const figi = req.params.figi;
    const url = `https://schenok.pythonanywhere.com/getweekcandles/${figi}`;

    const shareCandle = await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                return null;
            }
            return response.json();
        });

    res.send(shareCandle);
});

apiRouter.get('/month-candles/:figi', async (req, res) => {
    const figi = req.params.figi;
    const url = `https://schenok.pythonanywhere.com/getmonthcandles/${figi}`;

    const shareCandle = await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                return null;
            }
            return response.json();
        });

    res.send(shareCandle);
});

apiRouter.get('/year-candles/:figi', async (req, res) => {
    const figi = req.params.figi;
    const url = `https://schenok.pythonanywhere.com/getyearcandles/${figi}`;

    const shareCandle = await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Error fetching data:', response.statusText);
                return null;
            }
            return response.json();
        });

    res.send(shareCandle);
});

//Стоимость портфеля по его id
apiRouter.get('/portfolio-cost/:portfolioId', async (req, res) => {
    const portfolioId = req.params.portfolioId;

    const portfolioShares = await apiData.getSortedPortfolioShares(portfolioId);

    if (!portfolioShares) {
        res.status(500).json({ error: 'Failed to fetch portfolio shares' });
        return;
    }

    const tickers = portfolioShares.map(share => share.ticker);

    const shareRequests = tickers.map(async (ticker) => {
        const { data: shareData, error: shareError } = await supabase
            .from('shares')
            .select('figi')
            .eq('ticker', ticker)
            .single();

        if (shareError) {
            console.error(`Error fetching share data for ticker ${ticker}:`, shareError.message);
            res.status(500).json({ error: 'Failed to fetch share data' });
            return null;
        }
        return { ticker, figi: shareData.figi };
    });

    const updatedPortfolioShares = await Promise.all(shareRequests);

    let figiMap = updatedPortfolioShares.reduce((acc, share) => {
        if (share) {
            acc[share.ticker] = share.figi;
        }
        return acc;
    }, {});

    //дивиденды
    const figiList = Object.values(figiMap);
    const sharesWithDivInfo = await apiData.dividendInfo(figiList);
    const sharesWithDivFlag = sharesWithDivInfo.filter(share => share.div_yield_flag);
    const dividendData = await Promise.all(sharesWithDivFlag.map(async (share) => {
        const dividends = await apiData.getDividends(share.figi);
        return { ...share, dividends };
    }));

    const tickerQuantities = apiData.calculateTotalDividendsForTicker(portfolioShares);
    const portfolioWithTotalDividends = Object.entries(tickerQuantities).map(([ticker, quantity]) => {
        const dividendInfo = dividendData.find((item) => item.figi === figiMap[ticker]);
        if (dividendInfo) {
            const totalDividends = apiData.calculateTotalDividends(dividendInfo.dividends, dividendInfo.currency) * quantity;

            return {
                ticker: ticker,
                quantity: quantity,
                dividends: {
                    ...dividendInfo.dividends,
                    total_dividends: totalDividends,
                },
            };
        }
    });

    //стоимость портфеля
    const prices = await apiData.fetchLastPrices(Object.values(figiMap));

    let totalCost = portfolioShares.reduce((acc, share) => {
        const figi = figiMap[share.ticker];
        const price = prices[figi]?.price;
        if (share.type_of_operation === 'Покупка') {
            return acc + price * share.quantity;
        } else if (share.type_of_operation === 'Продажа') {
            return acc - price * share.quantity;
        } else {
            return acc;
        }
    }, 0);

    totalCost = parseFloat(totalCost.toFixed(2));

    const currentDate = new Date();
    const xirrData = portfolioShares.map(share => {
        const { date_of_operation: when, cost: amount } = share;
        const adjustedAmount = share.type_of_operation === 'Покупка' ? -amount : amount;
        return { when: new Date(when), amount: adjustedAmount }; // Умножаем на -1, так как xirr ожидает отрицательные значения для покупок
    });

    xirrData.push({ when: currentDate, amount: totalCost });

    if (xirrData.length < 2) {
        res.status(200).json({ portfolioWithTotalDividends, totalCost, error: 'Failed to calculate XIRR' });
        return;
    }

    try {
        let rate = xirr(xirrData);
        rate = parseFloat((rate * 100).toFixed(2)); // в процентах

        res.status(200).json({ portfolioWithTotalDividends, totalCost, rate });
    } catch (error) {
        console.error('Error calculating portfolio cost:', error.message);
        res.status(200).json({ portfolioWithTotalDividends, totalCost, error: 'Failed to calculate portfolio cost' });
    }
});

apiRouter.get('/shares', async (req, res) => {
    const { data: shares, error } = await supabase
        .from('shares')
        .select('*')
        .limit(1000);

    if (error) {
        console.error('Error fetching shares:', error.message);
        res.status(500).send('Failed to fetch shares');
    }

    shares.forEach(share => {
        share.sector = data.shares_sectors[share.sector];
        share.real_exchange = data.real_exchanges[share.real_exchange];
        share.trading_status = data.trading_statuses[share.trading_status];
    })

    const figiList = shares.map(share => share.figi).join(',');

    const pricesData = await apiData.fetchPricesInChunks(figiList);

    const sharesWithPrices = shares.map(share => ({
        ...share,
        price: pricesData[share.figi].price
    }));

    res.send(sharesWithPrices);
});

apiRouter.get('/share/:figi', async (req, res) => {
    const figi = req.params.figi;
    const { data: shares, error } = await supabase
        .from('shares')
        .select('*')
        .eq('figi', figi);

    shares.forEach(share => {
        share.sector = data.shares_sectors[share.sector];
        share.real_exchange = data.real_exchanges[share.real_exchange];
        share.trading_status = data.trading_statuses[share.trading_status];
    })

    res.send(shares);
});

apiRouter.get('/bonds', async (req, res) => {
    const { data: bonds, error } = await supabase
        .from('bonds')
        .select('*');

    if (error) {
        console.error('Error fetching bonds:', error.message);
        res.status(500).send('Failed to fetch bonds');
    }

    bonds.forEach(bond => {
        const date = new Date(bond.maturity_date).toLocaleDateString();
        bond.maturity_date = date;
        bond.risk_level = data.bonds_risk_level[bond.risk_level];
        bond.sector = data.bonds_sectors[bond.sector];
        bond.issue_kind = data.bond_issue_kinds[bond.issue_kind];
        bond.real_exchange = data.real_exchanges[bond.real_exchange];
    })

    res.send(bonds);
});

apiRouter.get('/bond/:figi', async (req, res) => {
    const figi = req.params.figi;
    const { data: bonds, error } = await supabase
        .from('bonds')
        .select('*')
        .eq('figi', figi);

    bonds.forEach(bond => {
        bond.risk_level = data.bonds_risk_level[bond.risk_level];
        bond.sector = data.bonds_sectors[bond.sector];
        bond.issue_kind = data.bond_issue_kinds[bond.issue_kind];
        bond.real_exchange = data.real_exchanges[bond.real_exchange];
    })

    res.send(bonds);
});

apiRouter.get('/currencies', async (req, res) => {
    const { data: currencies, error } = await supabase
        .from('currencies')
        .select('*');

    const figiList = currencies.map(currency => currency.figi);

    const pricesData = await apiData.fetchLastPrices(figiList);

    const currencyWithPrices = currencies.map(currency => ({
        ...currency,
        price: pricesData[currency.figi].price
    }));


    res.send(currencyWithPrices);
});

//share figi по ticker
apiRouter.get('/sharefigi/:ticker', async (req, res) => {
    const ticker = req.params.ticker;

    const { data, error } = await supabase
        .from('shares')
        .select('figi')
        .eq('ticker', ticker);

    if (error) {
        console.error('Error fetching share figi:', error.message);
        return res.status(500).json({ error: 'Failed to fetch share figi' });
    }

    res.send(data);
});

apiRouter.get('/dividends/:figi', async (req, res) => {
    const figi = req.params.figi;

    const shareCandle = await apiData.getDividends(figi);

    if (!shareCandle) {
        res.status(500).send('Failed to fetch data');
    }

    res.status(200).json(shareCandle);
});

apiRouter.get('/latest_prices', async (req, res) => {
    try {
        const tickerList = req.headers['ticker-list'];

        // Проверяем, были ли переданы тикеры
        if (!tickerList) {
            return res.status(400).json({ error: 'Ticker list not provided in headers' });
        }

        // Разбиваем строку на массив тикеров
        const tickers = tickerList.split(',');

        // Массив для хранения figi каждого тикера
        const tickerFigiMap = {};

        // Получаем figi для каждого тикера
        for (const ticker of tickers) {
            const { data, error } = await supabase
                .from('shares')
                .select('figi')
                .eq('ticker', ticker);

            if (error) {
                console.error(`Error fetching figi for ${ticker}:`, error.message);
                return res.status(500).json({ error: `Failed to fetch figi for ${ticker}` });
            }

            if (!data || data.length === 0) {
                return res.status(404).json({ error: `Figi not found for ticker ${ticker}` });
            }

            // Добавляем figi в массив
            tickerFigiMap[ticker] = data[0].figi;
        }

        // Получаем последние цены для всех figi
        const pricesWithTickers = {};
        const lastPrices = await apiData.fetchLastPrices(Object.values(tickerFigiMap));
        for (const ticker in tickerFigiMap) {
            const figi = tickerFigiMap[ticker];
            const { data: currencyData, error: currencyError } = await supabase
                .from('shares')
                .select('currency')
                .eq('figi', figi);

            if (currencyError) {
                console.error(`Error fetching currency for ${ticker}:`, currencyError.message);
                return res.status(500).json({ error: `Failed to fetch currency for ${ticker}` });
            }

            const currency = currencyData[0].currency;

            pricesWithTickers[ticker] = {
                figi: figi,
                price: lastPrices[figi],
                currency: currency
            };
        }
        // Отправляем результат клиенту
        res.json(pricesWithTickers);
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})
