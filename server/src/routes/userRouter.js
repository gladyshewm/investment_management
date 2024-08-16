import { Router } from 'express';
import userService from '../services/userService.js';

export const userDataRouter = Router();

userDataRouter.get('/:userId/portfolios', async (req, res) => {
  const { userId } = req.params;
  const portfolios = await userService.getPortfolios(userId);

  if (!portfolios) {
    console.error('Failed to fetch portfolios');
    return res
      .status(404)
      .json({ error: 'Portfolios not found for the specified user' });
  }

  res.status(200).json(portfolios);
});

userDataRouter.post('/:userId/create-portfolio', async (req, res) => {
  const { userId } = req.params;
  const { portfolioName, portfolioGoal } = req.body;
  const portfolio = await userService.createPortfolio(
    userId,
    portfolioName,
    portfolioGoal,
  );

  if (!portfolio) {
    console.error('Failed to create portfolio');
    return res.status(500).json({ error: 'Failed to create portfolio' });
  }

  res.status(201).json(portfolio);
});

userDataRouter.get('/portfolio/:portfolioId', async (req, res) => {
  const { portfolioId } = req.params;
  const portfolio = await userService.getPortfolioShares(portfolioId);

  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }

  res.status(200).json(portfolio);
});

userDataRouter.get('/portfolio/:portfolioId/shares', async (req, res) => {
  const { portfolioId } = req.params;
  const shares = await userService.getPortfolioAssets(portfolioId);

  if (!shares) {
    return res
      .status(404)
      .json({ error: 'Shares not found for the specified portfolio' });
  }

  res.status(200).json(shares);
});

userDataRouter.get(
  '/portfolio/:portfolioId/grouped-shares',
  async (req, res) => {
    const { portfolioId } = req.params;
    const groupedShares = await userService.getGroupedPortfolioShares(
      portfolioId,
    );

    if (!groupedShares) {
      return res.status(404).json({
        error: 'Grouped shares not found for the specified portfolio',
      });
    }

    res.status(200).json(groupedShares);
  },
);

userDataRouter.post('/portfolio/:portfolioId/add-share', async (req, res) => {
  const { portfolioId } = req.params;
  const { share } = req.body;
  const addedShare = await userService.addPortfolioShare(portfolioId, share);

  if (!addedShare) {
    return res
      .status(500)
      .json({ error: 'Failed to add share to the portfolio' });
  }

  res.status(201).json(addedShare);
});

userDataRouter.delete('/portfolio/:portfolioId', async (req, res) => {
  const { portfolioId } = req.params;
  const deletedPortfolio = await userService.deletePortfolio(portfolioId);

  if (!deletedPortfolio) {
    return res.status(500).json({ error: 'Failed to delete portfolio' });
  }

  res.status(200).json(deletedPortfolio);
});
