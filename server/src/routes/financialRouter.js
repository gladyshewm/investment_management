import { Router } from 'express';
import financialService from '../services/financialService.js';

export const apiRouter = Router();

apiRouter.get('/stats/:figi', async (req, res) => {
  const figi = req.params.figi;
  const shareCandle = await financialService.getStats(figi);

  if (!shareCandle) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.send(shareCandle);
});

apiRouter.get('/day-candles/:figi', async (req, res) => {
  const figi = req.params.figi;
  const shareCandle = await financialService.getDayCandles(figi);

  if (!shareCandle) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.send(shareCandle);
});

apiRouter.get('/week-candles/:figi', async (req, res) => {
  const figi = req.params.figi;
  const shareCandle = await financialService.getWeekCandles(figi);

  if (!shareCandle) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.send(shareCandle);
});

apiRouter.get('/month-candles/:figi', async (req, res) => {
  const figi = req.params.figi;
  const shareCandle = await financialService.getMonthCandles(figi);

  if (!shareCandle) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.send(shareCandle);
});

apiRouter.get('/year-candles/:figi', async (req, res) => {
  const figi = req.params.figi;
  const shareCandle = await financialService.getYearCandles(figi);

  if (!shareCandle) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.send(shareCandle);
});

//Стоимость портфеля по его id
apiRouter.get('/portfolio-cost/:portfolioId', async (req, res) => {
  const portfolioId = req.params.portfolioId;
  const { portfolioWithTotalDividends, totalCost, rate } =
    await financialService.getPortfolioCost(portfolioId);

  if (!portfolioWithTotalDividends || !totalCost || !rate) {
    console.error('Failed to fetch data');
    return res.status(500).send('Failed to fetch data');
  }

  res.status(200).json({ portfolioWithTotalDividends, totalCost, rate });
});

apiRouter.get('/shares', async (_, res) => {
  const sharesWithPrices = await financialService.getShares();

  if (!sharesWithPrices) {
    console.error('Failed to fetch share data');
    return res.status(500).send('Failed to fetch share data');
  }

  res.send(sharesWithPrices);
});

apiRouter.get('/share/:figi', async (req, res) => {
  const shares = await financialService.getShareByFigi(req.params.figi);

  if (!shares) {
    console.error('Failed to fetch share data');
    return res.status(500).send('Failed to fetch share data');
  }

  res.send(shares);
});

apiRouter.get('/bonds', async (_, res) => {
  const bonds = await financialService.getBonds();

  if (!bonds) {
    console.error('Failed to fetch bonds data');
    return res.status(500).send('Failed to fetch bonds data');
  }

  res.send(bonds);
});

apiRouter.get('/bond/:figi', async (req, res) => {
  const bonds = await financialService.getBondByFigi(req.params.figi);

  if (!bonds) {
    console.error('Failed to fetch bonds data');
    return res.status(500).send('Failed to fetch bonds data');
  }

  res.send(bonds);
});

apiRouter.get('/currencies', async (_, res) => {
  const currencyWithPrices = await financialService.getCurrencies();

  if (!currencyWithPrices) {
    console.error('Failed to fetch currency data');
    return res.status(500).send('Failed to fetch currency data');
  }

  res.send(currencyWithPrices);
});

apiRouter.get('/sharefigi/:ticker', async (req, res) => {
  const shareTicker = await financialService.getShareFigiByTicker(
    req.params.ticker,
  );

  if (!shareTicker) {
    console.error('Failed to fetch share data');
    return res.status(500).send('Failed to fetch share data');
  }

  res.send(shareTicker);
});

apiRouter.get('/dividends/:figi', async (req, res) => {
  const figi = req.params.figi;

  const shareCandle = await financialService.getDividends(figi);

  if (!shareCandle) {
    res.status(500).send('Failed to fetch data');
  }

  res.status(200).json(shareCandle);
});

apiRouter.get('/latest_prices', async (req, res) => {
  const tickerList = req.headers['ticker-list'];

  if (!tickerList) {
    console.error('No ticker list provided');
    return res.status(400).send('No ticker list provided');
  }

  const pricesWithTickers = await financialService.getLatestPrices(tickerList);

  if (!pricesWithTickers) {
    console.error('Failed to fetch share data');
    return res.status(500).send('Failed to fetch share data');
  }

  res.status(200).json(pricesWithTickers);
});
