const getUserId = async () => {
    try {
        const data = await fetch('/auth/isloggedin');
        const user = await data.json();
        const user_id = user.user.id;
        return user_id;
    } catch (error) {
        console.error('Error checking user authentication:', error.message);
    }
};

const getPortfolios = async (user_id) => {
    try {
        const data = await fetch(`/userData/${user_id}/portfolios`);
        const portfolios = await data.json();
        return portfolios;
    } catch (error) {
        console.error('Error fetching portfolios:', error.message);
        return [];
    }
};

const createPortfolio = async (user_id, portfolioName, portfolioGoal) => {
    try {
        const data = await fetch(`/userData/${user_id}/create-portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ portfolioName, portfolioGoal }),
        });
        const portfolio = await data.json();
        return portfolio;
    } catch (error) {
        console.error('Error creating portfolio:', error.message);
    }
};

const getPortfolio = async (portfolio_id) => {
    try {
        const data = await fetch(`/userData/portfolio/${portfolio_id}`);
        const portfolio = await data.json();
        return portfolio;
    } catch (error) {
        console.error('Error fetching portfolio:', error.message);
    }
};

const getPortfolioShares = async (portfolio_id) => {
    try {
        const data = await fetch(`/userData/portfolio/${portfolio_id}/shares`);
        const shares = await data.json();
        return shares;
    } catch (error) {
        console.error('Error fetching portfolio shares:', error.message);
    }
};

const getGroupedPortfolioShares = async (portfolio_id) => {
    try {
        const data = await fetch(`/userData/portfolio/${portfolio_id}/grouped-shares`);
        const shares = await data.json();

        const sharesData = shares.groupedShares;
        const totalInvested = shares.totalInvested;

        return { sharesData, totalInvested };
    } catch (error) {
        console.error('Error fetching grouped portfolio shares:', error.message);
    }
};

const addPortfolioShare = async (portfolio_id, share) => {
    try {
        const data = await fetch(`/userData/portfolio/${portfolio_id}/add-share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ share }),
        });
        const portfolio = await data.json();
        return portfolio;
    } catch (error) {
        console.error('Error adding portfolio share:', error.message);
    }
};

const deletePortfolio = async (portfolio_id) => {
    try {
        const data = await fetch(`/userData/portfolio/${portfolio_id}`, {
            method: 'DELETE',
        });
        const portfolio = await data.json();
        return portfolio;
    } catch (error) {
        console.error('Error deleting portfolio:', error.message);
    }
}

const user = {
    getUserId,
    getPortfolios,
    createPortfolio,
    getPortfolio,
    getPortfolioShares,
    getGroupedPortfolioShares,
    addPortfolioShare,
    deletePortfolio
};

export default user;