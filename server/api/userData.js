import supabase from "../supabase/supabase.js";

const getPortfolios = async (userId) => {
    try {
        const { data: portfolios, error } = await supabase
            .from('portfolio')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching portfolios:', error.message);
            return { error: 'Failed to fetch portfolios' };
        }

        if (!portfolios || portfolios.length === 0) {
            return { error: 'Portfolios not found for the specified user' };
        }

        portfolios.forEach(portfolio => {
            const date = new Date(portfolio.created_at).toLocaleDateString();
            portfolio.created_at = date;
        });

        return portfolios;
    } catch (error) {
        console.error('Error fetching portfolios:', error.message);
        return { error: 'Failed to fetch portfolios' };
    }
};

const createPortfolio = async (user_id, portfolioName, portfolioGoal) => {
    try {
        const { data: portfolio, error } = await supabase
            .from('portfolio')
            .insert({
                'user_id': user_id,
                'portfolio_name': portfolioName,
                'goal': portfolioGoal
            })
            .select();

        if (error) {
            console.error('Error creating portfolio:', error.message);
            return { error: 'Failed to create portfolio' };
        }
    } catch (error) {
        console.error('Error creating portfolio:', error.message);
        return { error: 'Failed to create portfolio' };
    }
};

const getPortfolioShares = async (portfolio_id) => {
    try {
        const { data: portfolioShares, error } = await supabase
            .from('portfolio_shares')
            .select('*')
            .eq('portfolio_id', portfolio_id);

        if (error) {
            console.error('Error fetching portfolio shares:', error.message);
            return { error: 'Failed to fetch portfolio shares' };
        }

        const assetQuantities = {};

        portfolioShares.forEach((share) => {
            const { ticker, type_of_operation, quantity } = share;

            if (!assetQuantities[ticker]) {
                assetQuantities[ticker] = 0;
            }

            if (type_of_operation === 'Покупка') {
                assetQuantities[ticker] += quantity;
            } else if (type_of_operation === 'Продажа') {
                assetQuantities[ticker] -= quantity;
            }
        });

        const assetQuantitiesArray = Object.keys(assetQuantities).map(ticker => ({
            ticker,
            name: portfolioShares.find((share) => share.ticker === ticker).name,
            quantity: assetQuantities[ticker]
        }));

        return assetQuantitiesArray;
    } catch (error) {
        console.error('Error fetching portfolio shares:', error.message);
        return { error: 'Failed to fetch portfolio shares' };
    }
};

const getPortfolioAssets = async (portfolio_id) => {
    try {
        let total_cost_purchase = 0;
        let total_cost_sale = 0;

        const { data: portfolioShares, error } = await supabase
            .from('portfolio_shares')
            .select('*')
            .eq('portfolio_id', portfolio_id);

        if (error) {
            console.error('Error fetching portfolio assets:', error.message);
            return { error: 'Failed to fetch portfolio assets' };
        }

        portfolioShares.forEach(share => {
            const cost = (share.price + share.price * share.commission) * share.quantity;
            if (share.type_of_operation === 'Покупка') {
                share.cost = -parseFloat(cost.toFixed(2));
                total_cost_purchase += cost;
            } else {
                share.cost = parseFloat(cost.toFixed(2));
                total_cost_sale += cost;
            }

            const date = new Date(share.date_of_operation).toLocaleDateString();
            share.date_of_operation = date;
        });

        total_cost_purchase = parseFloat(total_cost_purchase.toFixed(2));
        total_cost_sale = parseFloat(total_cost_sale.toFixed(2));

        return { portfolioShares, total_cost_purchase, total_cost_sale };
    } catch (error) {
        console.error('Error fetching portfolio assets:', error.message);
        return { error: 'Failed to fetch portfolio assets' };
    }
};

const getGroupedPortfolioShares = async (portfolio_id) => {
    const portfolioShares = (await getPortfolioAssets(portfolio_id)).portfolioShares;

    if (!portfolioShares) {
        return { error: 'Failed to fetch portfolio shares' };
    }

    let totalInvested = 0;
    let groupedShares = {};

    for (const category in portfolioShares) {
        if (portfolioShares.hasOwnProperty(category)) {
            const categoryName = portfolioShares[category].category;
            const quantity = portfolioShares[category].quantity;
            const price = portfolioShares[category].price;
            const commission = portfolioShares[category].commission || 0;
            const typeOfOperation = portfolioShares[category].type_of_operation;

            let totalCost = 0;

            if (typeOfOperation === 'Покупка') {
                const priceWithCommission = price + (price * commission) / 100;
                totalCost = quantity * priceWithCommission;
                totalInvested += totalCost;
            } else if (typeOfOperation === 'Продажа') {
                const priceWithCommission = price + (price * commission) / 100;
                totalCost = -1 * (quantity * priceWithCommission); // Отрицательное значение для продажи
                totalInvested += totalCost;
            }

            if (!groupedShares[categoryName]) {
                groupedShares[categoryName] = {
                    quantity: quantity,
                    totalPrice: totalCost
                };
            } else {
                if (typeOfOperation === 'Покупка') {
                    groupedShares[categoryName].quantity += quantity;
                } else if (typeOfOperation === 'Продажа') {
                    groupedShares[categoryName].quantity -= quantity;
                }
                groupedShares[categoryName].totalPrice += totalCost;
            }
        }
    }

    for (const category in groupedShares) {
        if (groupedShares.hasOwnProperty(category)) {
            groupedShares[category].totalPrice = parseFloat(groupedShares[category].totalPrice.toFixed(2));
        }
    }

    totalInvested = parseFloat(totalInvested.toFixed(2));

    return { groupedShares, totalInvested };
};

const addPortfolioShare = async (portfolio_id, share) => {
    try {
        const { data: portfolioShares, error } = await supabase
            .from('portfolio_shares')
            .insert({
                'portfolio_id': portfolio_id,
                'name': share.assetName,
                'ticker': share.assetTicker,
                'category': share.assetCategory,
                'type_of_operation': share.assetOperation,
                'date_of_operation': share.assetDate,
                'quantity': share.assetQuantity,
                'price': share.assetPrice,
                'commission': share.assetCommission
            })
            .select();

        if (error) {
            console.error('Error adding portfolio share:', error.message);
            return { error: 'Failed to add portfolio share' };
        }
    } catch (error) {
        console.error('Error adding portfolio share:', error.message);
        return { error: 'Failed to add portfolio share' };
    }
};

const deletePortfolio = async (portfolio_id) => {
    try {
        const { error } = await supabase
            .from('portfolio')
            .delete()
            .eq('portfolio_id', portfolio_id);

        if (error) {
            console.error('Error deleting portfolio:', error.message);
            return { error: 'Failed to delete portfolio' };
        }
    } catch (error) {
        console.error('Error deleting portfolio:', error.message);
        return { error: 'Failed to delete portfolio' };
    }
};

export default {
    getPortfolios,
    createPortfolio,
    getPortfolioShares,
    getPortfolioAssets,
    addPortfolioShare,
    getGroupedPortfolioShares,
    deletePortfolio
};