import { Router } from "express";
import userDataAPI from "../api/userData.js";

export const userDataRouter = Router();

userDataRouter.get("/:userId/portfolios", async (req, res) => {
    const { userId } = req.params;

    try {
        const portfolios = await userDataAPI.getPortfolios(userId);

        if (!portfolios) {
            return res.status(404).json({ error: 'Portfolios not found for the specified user' });
        }

        res.status(200).json(portfolios);
    } catch (error) {
        console.error('Error fetching portfolios:', error.message);
        res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
});

userDataRouter.post("/:userId/create-portfolio", async (req, res) => {
    const { userId } = req.params;
    const { portfolioName, portfolioGoal } = req.body;

    try {
        const portfolio = await userDataAPI.createPortfolio(userId, portfolioName, portfolioGoal);

        if (!portfolio) {
            return res.status(500).json({ error: 'Failed to create portfolio' });
        }

        res.status(201).json(portfolio);
    } catch (error) {
        console.error('Error creating portfolio:', error.message);
        res.status(500).json({ error: 'Failed to create portfolio' });
    }
});

userDataRouter.get("/portfolio/:portfolioId", async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const portfolio = await userDataAPI.getPortfolioShares(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        res.status(200).json(portfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error.message);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

userDataRouter.get("/portfolio/:portfolioId/shares", async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const shares = await userDataAPI.getPortfolioAssets(portfolioId);

        if (!shares) {
            return res.status(404).json({ error: 'Shares not found for the specified portfolio' });
        }

        res.status(200).json(shares);
    } catch (error) {
        console.error('Error fetching shares:', error.message);
        res.status(500).json({ error: 'Failed to fetch shares' });
    }
});

userDataRouter.get("/portfolio/:portfolioId/grouped-shares", async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const groupedShares = await userDataAPI.getGroupedPortfolioShares(portfolioId);

        if (!groupedShares) {
            return res.status(404).json({ error: 'Grouped shares not found for the specified portfolio' });
        }

        res.status(200).json(groupedShares);
    } catch (error) {
        console.error('Error fetching grouped shares:', error.message);
        res.status(500).json({ error: 'Failed to fetch grouped shares' });
    }
});    

userDataRouter.post("/portfolio/:portfolioId/add-share", async (req, res) => {
    const { portfolioId } = req.params;
    const { share } = req.body;

    try {
        const addedShare = await userDataAPI.addPortfolioShare(portfolioId, share);

        if (!addedShare) {
            return res.status(500).json({ error: 'Failed to add share to the portfolio' });
        }

        res.status(201).json(addedShare);
    } catch (error) {
        console.error('Error adding share:', error.message);
        res.status(500).json({ error: 'Failed to add share to the portfolio' });
    }
});

userDataRouter.delete("/portfolio/:portfolioId", async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const deletedPortfolio = await userDataAPI.deletePortfolio(portfolioId);

        if (!deletedPortfolio) {
            return res.status(500).json({ error: 'Failed to delete portfolio' });
        }

        res.status(200).json(deletedPortfolio);
    } catch (error) {
        console.error('Error deleting portfolio:', error.message);
        res.status(500).json({ error: 'Failed to delete portfolio' });
    }
})