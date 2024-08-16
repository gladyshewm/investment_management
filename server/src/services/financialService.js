import supabase from '../supabase/supabase.js';
import financialData from '../constants/data.js';

const apiLink = process.env.API_LINK;

const getShares = async () => {
  try {
    const { data: shares, error } = await supabase
      .from('shares')
      .select('*')
      .limit(1000);

    if (error) {
      console.error('Error fetching shares:', error.message);
      throw new Error('Failed to fetch shares');
    }

    shares.forEach((share) => {
      share.sector = financialData.shares_sectors[share.sector];
      share.real_exchange = financialData.real_exchanges[share.real_exchange];
      share.trading_status =
        financialData.trading_statuses[share.trading_status];
    });

    const figiList = shares.map((share) => share.figi).join(',');

    const pricesData = await fetchPricesInChunks(figiList);

    const sharesWithPrices = shares.map((share) => ({
      ...share,
      price: pricesData[share.figi].price,
    }));

    return sharesWithPrices;
  } catch (error) {
    console.error('Error fetching shares:', error.message);
    throw new Error('Failed to fetch shares');
  }
};

const fetchPricesInChunks = async (figiList) => {
  const figis = figiList.split(',');
  const chunkSize = 200; // Количество элементов для каждого запроса
  let offset = 0;
  const pricesData = {};

  while (offset < figis.length) {
    const figisChunk = figis.slice(offset, offset + chunkSize).join(',');

    const response = await fetch(`${apiLink}/lastprices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Figi-List': `${figisChunk}`,
      },
    });

    const data = await response.json();

    // Объединяем данные о ценах из каждого запроса
    Object.assign(pricesData, data);

    offset += chunkSize;
  }

  return pricesData;
};

const getShareByFigi = async (figi) => {
  try {
    const { data: shares, error } = await supabase
      .from('shares')
      .select('*')
      .eq('figi', figi);

    if (error) {
      console.error('Error fetching shares:', error.message);
      throw new Error('Failed to fetch shares');
    }

    shares.forEach((share) => {
      share.sector = financialData.shares_sectors[share.sector];
      share.real_exchange = financialData.real_exchanges[share.real_exchange];
      share.trading_status =
        financialData.trading_statuses[share.trading_status];
    });

    return shares;
  } catch (error) {
    console.error('Error fetching shares:', error.message);
    throw new Error('Failed to fetch shares');
  }
};

const getShareFigiByTicker = async (ticker) => {
  try {
    const { data, error } = await supabase
      .from('shares')
      .select('figi')
      .eq('ticker', ticker);

    if (error) {
      console.error('Error fetching share figi:', error.message);
      return res.status(500).json({ error: 'Failed to fetch share figi' });
    }

    return { figi: data[0].figi };
  } catch (error) {
    console.error('Error fetching shares:', error.message);
    throw new Error('Failed to fetch shares');
  }
};

const getBonds = async () => {
  try {
    const { data: bonds, error } = await supabase.from('bonds').select('*');

    if (error) {
      console.error('Error fetching bonds:', error.message);
      throw new Error('Failed to fetch bonds');
    }

    bonds.forEach((bond) => {
      const date = new Date(bond.maturity_date).toLocaleDateString();
      bond.maturity_date = date;
      bond.risk_level = financialData.bonds_risk_level[bond.risk_level];
      bond.sector = financialData.bonds_sectors[bond.sector];
      bond.issue_kind = financialData.bond_issue_kinds[bond.issue_kind];
      bond.real_exchange = financialData.real_exchanges[bond.real_exchange];
    });

    return bonds;
  } catch (error) {
    console.error('Error fetching bonds:', error.message);
    throw new Error('Failed to fetch bonds');
  }
};

const getBondByFigi = async (figi) => {
  try {
    const { data: bonds, error } = await supabase
      .from('bonds')
      .select('*')
      .eq('figi', figi);

    if (error) {
      console.error('Error fetching bonds:', error.message);
      throw new Error('Failed to fetch bonds');
    }

    bonds.forEach((bond) => {
      bond.risk_level = financialData.bonds_risk_level[bond.risk_level];
      bond.sector = financialData.bonds_sectors[bond.sector];
      bond.issue_kind = financialData.bond_issue_kinds[bond.issue_kind];
      bond.real_exchange = financialData.real_exchanges[bond.real_exchange];
    });

    return bonds;
  } catch (error) {
    console.error('Error fetching bonds:', error.message);
    throw new Error('Failed to fetch bonds');
  }
};

const getCurrencies = async () => {
  try {
    const { data: currencies, error } = await supabase
      .from('currencies')
      .select('*');

    if (error) {
      console.error('Error fetching currencies:', error.message);
      throw new Error('Failed to fetch currencies');
    }

    const figiList = currencies.map((currency) => currency.figi);

    const pricesData = await fetchLastPrices(figiList);

    const currencyWithPrices = currencies.map((currency) => ({
      ...currency,
      price: pricesData[currency.figi].price,
    }));

    return currencyWithPrices;
  } catch (error) {
    console.error('Error fetching currencies:', error.message);
    throw new Error('Failed to fetch currencies');
  }
};

const getDividends = async (figi) => {
  const url = `${apiLink}/dividends/${figi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching dividends:', error.message);
    throw new Error('Failed to fetch dividends');
  }
};

const getLatestPrices = async (tickerList) => {
  try {
    const tickers = tickerList.split(',');
    const tickerFigiMap = {};

    for (const ticker of tickers) {
      const figi = await getShareFigiByTicker(ticker);

      if (!figi) {
        console.error(`Error fetching figi for ${ticker}`);
        return;
      }

      tickerFigiMap[ticker] = figi[0].figi;
    }

    const pricesWithTickers = {};
    const lastPrices = await fetchLastPrices(Object.values(tickerFigiMap));

    for (const ticker in tickerFigiMap) {
      const figi = tickerFigiMap[ticker];

      const currency = await getShareCurrencyByFigi(figi);

      pricesWithTickers[ticker] = {
        figi: figi,
        price: lastPrices[figi],
        currency: currency,
      };
    }

    return pricesWithTickers;
  } catch (error) {
    console.error('Error fetching latest prices:', error.message);
    throw new Error('Failed to fetch latest prices');
  }
};

const getShareCurrencyByFigi = async (figi) => {
  try {
    const { data: currencyData, error: currencyError } = await supabase
      .from('shares')
      .select('currency')
      .eq('figi', figi);

    if (currencyError) {
      console.error(
        `Error fetching currency for ${ticker}:`,
        currencyError.message,
      );
      throw new Error('Failed to fetch currency');
    }

    return currencyData[0].currency;
  } catch (error) {
    console.error('Error fetching share currency:', error.message);
    throw new Error('Failed to fetch share currency');
  }
};

const fetchLastPrices = async (figiList) => {
  try {
    const response = await fetch(`${apiLink}/lastprices`, {
      method: 'GET',
      headers: {
        'Figi-List': `${figiList}`,
      },
    });
    const data = await response.json();

    for (const figi of figiList) {
      const { data: currencyData, error } = await supabase
        .from('shares')
        .select('currency')
        .eq('figi', figi);

      if (error) {
        console.error(
          `Error fetching currency for figi ${figi}:`,
          error.message,
        );
        continue;
      }

      if (
        currencyData &&
        currencyData.length > 0 &&
        currencyData[0].currency === 'usd'
      ) {
        data[figi].price *= 92.31;
      }
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const getStats = async (figi) => {
  try {
    const url = `${apiLink}/getcandles/${figi}`;
    const shareCandle = await fetch(url);

    if (!shareCandle.ok) {
      console.error('Error fetching data:', shareCandle.statusText);
      return null;
    }

    const data = await shareCandle.json();

    return data;
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    throw new Error('Failed to fetch stats');
  }
};

const getDayCandles = async (figi) => {
  try {
    const url = `${apiLink}/getdaycandles/${figi}`;
    const shareCandle = await fetch(url);

    if (!shareCandle.ok) {
      console.error('Error fetching data:', shareCandle.statusText);
      return null;
    }

    const data = await shareCandle.json();

    return data;
  } catch (error) {
    console.error('Error fetching day candles:', error.message);
    throw new Error('Failed to fetch day candles');
  }
};

const getWeekCandles = async (figi) => {
  try {
    const url = `${apiLink}/getweekcandles/${figi}`;
    const shareCandle = await fetch(url);

    if (!shareCandle.ok) {
      console.error('Error fetching data:', shareCandle.statusText);
      return null;
    }

    const data = await shareCandle.json();

    return data;
  } catch (error) {
    console.error('Error fetching week candles:', error.message);
    throw new Error('Failed to fetch week candles');
  }
};

const getMonthCandles = async (figi) => {
  try {
    const url = `${apiLink}/getmonthcandles/${figi}`;
    const shareCandle = await fetch(url);

    if (!shareCandle.ok) {
      console.error('Error fetching data:', shareCandle.statusText);
      return null;
    }

    const data = await shareCandle.json();

    return data;
  } catch (error) {
    console.error('Error fetching month candles:', error.message);
    throw new Error('Failed to fetch month candles');
  }
};

const getYearCandles = async (figi) => {
  try {
    const url = `${apiLink}/getyearcandles/${figi}`;
    const shareCandle = await fetch(url);

    if (!shareCandle.ok) {
      console.error('Error fetching data:', shareCandle.statusText);
      return null;
    }

    const data = await shareCandle.json();

    return data;
  } catch (error) {
    console.error('Error fetching year candles:', error.message);
    throw new Error('Failed to fetch year candles');
  }
};

const getPortfolioCost = async (portfolioId) => {
  try {
    const portfolioShares = await getSortedPortfolioShares(portfolioId);

    if (!portfolioShares) {
      console.error('Error fetching portfolio shares:', error.message);
      return;
    }

    const tickers = portfolioShares.map((share) => share.ticker);

    const shareRequests = tickers.map(async (ticker) => {
      const shareData = await getShareFigiByTicker(ticker);

      if (!shareData) {
        console.error('Error fetching share data:', error.message);
        throw new Error('Failed to fetch share data');
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
    const sharesWithDivInfo = (await dividendInfo(figiList)).filter(
      (share) => share.div_yield_flag,
    );

    const dividendData = await Promise.all(
      sharesWithDivInfo.map(async (share) => {
        const dividends = await getDividends(share.figi);
        return { ...share, dividends };
      }),
    );

    const tickerQuantities = calculateTotalDividendsForTicker(portfolioShares);

    const portfolioWithTotalDividends = Object.entries(tickerQuantities).map(
      ([ticker, quantity]) => {
        const dividendInfo = dividendData.find(
          (item) => item.figi === figiMap[ticker],
        );
        if (dividendInfo) {
          const totalDividends =
            calculateTotalDividends(
              dividendInfo.dividends,
              dividendInfo.currency,
            ) * quantity;

          return {
            ticker: ticker,
            quantity: quantity,
            dividends: {
              ...dividendInfo.dividends,
              total_dividends: totalDividends,
            },
          };
        }
      },
    );

    //стоимость портфеля
    const prices = await fetchLastPrices(Object.values(figiMap));

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
    const xirrData = portfolioShares.map((share) => {
      const { date_of_operation: when, cost: amount } = share;
      const adjustedAmount =
        share.type_of_operation === 'Покупка' ? -amount : amount;

      return { when: new Date(when), amount: adjustedAmount }; // Умножаем на -1, так как xirr ожидает отрицательные значения для покупок
    });

    xirrData.push({ when: currentDate, amount: totalCost });

    if (xirrData.length < 2) {
      console.error('Failed to calculate XIRR:', error.message);
      return;
    }

    try {
      let rate = xirr(xirrData);
      rate = parseFloat((rate * 100).toFixed(2)); // в процентах

      return { portfolioWithTotalDividends, totalCost, rate };
    } catch (error) {
      console.error('Error calculating portfolio cost:', error.message);
      return {
        portfolioWithTotalDividends,
        totalCost,
        error: 'Failed to calculate portfolio cost',
      };
    }
  } catch (error) {
    console.error('Error fetching portfolio cost:', error.message);
    throw new Error('Failed to fetch portfolio cost');
  }
};

const getSortedPortfolioShares = async (portfolioId) => {
  const { data: portfolioShares, error } = await supabase
    .from('portfolio_shares')
    .select(
      'ticker, quantity, type_of_operation, date_of_operation, quantity, commission, price',
    )
    .eq('portfolio_id', portfolioId)
    .order('date_of_operation', { ascending: true });

  if (!portfolioShares) {
    console.error('Error fetching portfolio shares:', error.message);
    return;
  }

  const updatedPortfolioShares = portfolioShares.map((share) => {
    const { commission, price, quantity } = share;
    const cost = ((commission * price) / 100 + price) * quantity;
    return { ...share, cost };
  });

  return updatedPortfolioShares;
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

const data = {
  getShares,
  getShareByFigi,
  getBonds,
  getBondByFigi,
  getCurrencies,
  getShareFigiByTicker,
  getLatestPrices,
  getStats,
  getDayCandles,
  getWeekCandles,
  getMonthCandles,
  getYearCandles,
  getPortfolioCost,
  getDividends,
};

export default data;
