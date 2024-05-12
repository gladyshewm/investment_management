import React, { useState } from "react";
import "./CreatePortfolio.css";
import Sidebar from "../components/UI/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import user from "../api/user";
import useInput from "../components/hooks/useInput";

const CreatePortfolio = () => {
    const navigate = useNavigate();
    /* const [portfolioName, setPortfolioName] = useState(''); */
    /* const [portfolioGoal, setPortfolioGoal] = useState(''); */
    const portfolioName = useInput('', { isEmpty: true });
    const portfolioGoal = useInput('', { isEmpty: true });

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const userId = await user.getUserId();
            await user.createPortfolio(userId, portfolioName.value, portfolioGoal.value);

            navigate("/manage-portfolios");
        } catch (error) {
            console.error('Error saving portfolio:', error.message);
        }
    };

    return (
        <div className="create-portfolio">
            <Sidebar />
            <div className="create-main">
                <div className="create-block">
                    <div className="create-block__header">
                        Новый портфель
                    </div>
                    <form id="assetform">
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="asset-name">Название портфеля</label>
                                <input
                                    placeholder="Мой портфель"
                                    type="text"
                                    id="asset-name"
                                    name="asset-name"
                                    required
                                    value={portfolioName.value}
                                    onChange={e => portfolioName.onChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="asset-ticker">Цель</label>
                                <input
                                    placeholder="Пассивный доход 1.000.000₽/месяц"
                                    type="text"
                                    id="asset-ticker"
                                    name="asset-ticker"
                                    required
                                    value={portfolioGoal.value}
                                    onChange={e => portfolioGoal.onChange(e)}
                                />
                            </div>
                        </div>
                        <div className="form-footer">
                            <button className="cancel-btn" type="button" onClick={handleCancel}>Отменить</button>
                            <button
                                disabled={!portfolioName.validInput || !portfolioName.validInput}
                                className="save-btn"
                                type="submit"
                                onClick={e => handleSave(e)}
                            >
                                Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreatePortfolio;
