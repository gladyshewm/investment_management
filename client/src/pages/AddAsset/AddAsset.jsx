import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddAsset.css";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import ArrowLeftIcon2 from "../../components/UI/icons/ArrowLeftIcon2";
import user from "../../api/user";
import useInput from "../../components/hooks/useInput";

const AddAsset = () => {
    const navigate = useNavigate();
    const assetNameInput = useInput('', { isEmpty: true });
    const assetTickerInput = useInput('', { isEmpty: true });
    const assetCategoryInput = useInput('', { isEmpty: true });
    const [assetOperationInput, setAssetOperationInput] = useState('Покупка');
    const assetDateInput = useInput('', { isEmpty: true });
    const assetQuantityInput = useInput('', { isEmpty: true });
    const assetPriceInput = useInput('', { isEmpty: true });
    const assetCommissionInput = useInput('', { isEmpty: true });

    const handleChange = (e) => {
        const { value } = e.target;
        setAssetOperationInput(value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            assetNameInput.validInput &&
            assetTickerInput.validInput &&
            assetCategoryInput.validInput &&
            assetDateInput.validInput &&
            assetQuantityInput.validInput &&
            assetPriceInput.validInput &&
            assetCommissionInput.validInput
        ) {
            const formData = {
                assetName: assetNameInput.value,
                assetTicker: assetTickerInput.value,
                assetCategory: assetCategoryInput.value,
                assetOperation: assetOperationInput,
                assetDate: assetDateInput.value,
                assetQuantity: assetQuantityInput.value,
                assetPrice: assetPriceInput.value,
                assetCommission: assetCommissionInput.value
            };
            /* const id = await user.getUserId();
                const portfolioData = await user.getPortfolios(id);
                const portfolio_id = portfolioData[0].portfolio_id; */
            try {
                const selectedPortfolioId = localStorage.getItem('selectedPortfolioId');

                if (selectedPortfolioId) {
                    await user.addPortfolioShare(selectedPortfolioId, formData);
                    navigate('/assets');
                } else {
                    console.error('Error: Selected portfolio not found in local storage.');
                }
            } catch (error) {
                console.error('Error adding portfolio share:', error.message);
            }
        } else {
            console.log('Не все поля заполнены корректно');
        };
    };

    const handleSubmitMore = async (e) => {
        e.preventDefault()
        if (
            assetNameInput.validInput &&
            assetTickerInput.validInput &&
            assetCategoryInput.validInput &&
            assetDateInput.validInput &&
            assetQuantityInput.validInput &&
            assetPriceInput.validInput &&
            assetCommissionInput.validInput
        ) {
            const formData = {
                assetName: assetNameInput.value,
                assetTicker: assetTickerInput.value,
                assetCategory: assetCategoryInput.value,
                assetOperation: assetOperationInput,
                assetDate: assetDateInput.value,
                assetQuantity: assetQuantityInput.value,
                assetPrice: assetPriceInput.value,
                assetCommission: assetCommissionInput.value
            };
            try {
                /* const id = await user.getUserId();
                const portfolioData = await user.getPortfolios(id);
                const portfolio_id = portfolioData[0].portfolio_id; */
                const portfolio_id = localStorage.getItem('selectedPortfolioId');
                await user.addPortfolioShare(portfolio_id, formData);
            } catch (error) {
                console.error('Error adding portfolio share:', error.message);
            }
        } else {
            console.log('Не все поля заполнены корректно');
        };
    };

    return (
        <div className="add-asset-block">
            <Sidebar />
            <div className="add-asset__main">
                <div className="top">
                    <div className="back-link">
                        <Link to={"/assets"}>
                            <ArrowLeftIcon2 />
                            <span>Назад</span>
                        </Link>
                    </div>
                </div>
                <div className="add-asset__form">
                    <div className="form-header">
                        Новая сделка
                    </div>
                    <form id="assetform">
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="assetName">Название</label>
                                <input
                                    type="text"
                                    id="asset-name"
                                    name="assetName"
                                    placeholder="ВСМПО-АВИСМА"
                                    value={assetNameInput.value}
                                    onChange={e => assetNameInput.onChange(e)}
                                    onBlur={e => assetNameInput.onBlur(e)}
                                    required
                                />
                                {(assetNameInput.isDirty && assetNameInput.isEmpty) && <div className="onblur-text">{assetNameInput.isEmpty}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="assetTicker">Код (Тикер)</label>
                                <input
                                    type="text"
                                    id="asset-ticker"
                                    name="assetTicker"
                                    placeholder="VSMO"
                                    value={assetTickerInput.value}
                                    onChange={e => assetTickerInput.onChange(e)}
                                    onBlur={e => assetTickerInput.onBlur(e)}
                                    required
                                />
                                {(assetTickerInput.isDirty && assetTickerInput.isEmpty) && <div className="onblur-text">{assetTickerInput.isEmpty}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="assetCategory">Категория</label>
                                <input
                                    type="text"
                                    id="asset-category"
                                    name="assetCategory"
                                    placeholder="Сырьевой сектор"
                                    value={assetCategoryInput.value}
                                    onChange={e => assetCategoryInput.onChange(e)}
                                    onBlur={e => assetCategoryInput.onBlur(e)}
                                    required
                                />
                                {(assetCategoryInput.isDirty && assetCategoryInput.isEmpty) && <div className="onblur-text">{assetCategoryInput.isEmpty}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="asset-type">Тип</label>
                                <select id="asset-type" name="asset-type">
                                    <option value="stock">Акция</option>
                                    <option value="bond">Облигация</option>
                                    <option value="currency">Валюта</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <div className="combine">
                                    <div className="combine-element">
                                        <label htmlFor="assetOperation">Операция</label>
                                        <select
                                            id="asset-operation"
                                            name="assetOperation"
                                            value={assetOperationInput}
                                            onChange={e => handleChange(e)}
                                        >
                                            <option value="Покупка">Покупка</option>
                                            <option value="Продажа">Продажа</option>
                                        </select>
                                    </div>
                                    <div className="combine-element">
                                        <label htmlFor="assetDate">Дата</label>
                                        <input
                                            type="date"
                                            id="asset-date"
                                            name="assetDate"
                                            value={assetDateInput.value}
                                            onChange={e => assetDateInput.onChange(e)}
                                            onBlur={e => assetDateInput.onBlur(e)}
                                            required
                                        />
                                        {(assetDateInput.isDirty && assetDateInput.isEmpty) && <div className="onblur-text">{assetDateInput.isEmpty}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="combine">
                                    <div className="combine-element">
                                        <label htmlFor="assetQuantity">Кол-во, шт.</label>
                                        <input
                                            type="text"
                                            id="asset-quantity"
                                            name="assetQuantity"
                                            placeholder="100"
                                            value={assetQuantityInput.value}
                                            onChange={e => assetQuantityInput.onChange(e)}
                                            onBlur={e => assetQuantityInput.onBlur(e)}
                                            required
                                        />
                                        {(assetQuantityInput.isDirty && assetQuantityInput.isEmpty) && <div className="onblur-text">{assetQuantityInput.isEmpty}</div>}
                                    </div>
                                    <div className="combine-element">
                                        <label htmlFor="assetPrice">Цена, ₽</label>
                                        <input
                                            type="text"
                                            id="asset-price"
                                            name="assetPrice"
                                            placeholder="172.21"
                                            value={assetPriceInput.value}
                                            onChange={e => assetPriceInput.onChange(e)}
                                            onBlur={e => assetPriceInput.onBlur(e)}
                                            required
                                        />
                                        {(assetPriceInput.isDirty && assetPriceInput.isEmpty) && <div className="onblur-text">{assetPriceInput.isEmpty}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="assetCommission">Комиссия брокера, %</label>
                                <input
                                    type="text"
                                    id="asset-commission"
                                    name="assetCommission"
                                    placeholder="0.3"
                                    value={assetCommissionInput.value}
                                    onChange={e => assetCommissionInput.onChange(e)}
                                    onBlur={e => assetCommissionInput.onBlur(e)}
                                    required
                                />
                                {(assetCommissionInput.isDirty && assetCommissionInput.isEmpty) && <div className="onblur-text">{assetCommissionInput.isEmpty}</div>}
                            </div>
                        </div>
                        <div className="form-footer">
                            <button className="cancel-btn" type="button" onClick={handleCancel}>Отменить</button>
                            <button disabled={
                                !assetNameInput.validInput ||
                                !assetTickerInput.validInput ||
                                !assetCategoryInput.validInput ||
                                !assetDateInput.validInput ||
                                !assetQuantityInput.validInput ||
                                !assetPriceInput.validInput ||
                                !assetCommissionInput.validInput
                            }
                                className="save-btn" type="submit" onClick={handleSubmit}>Сохранить</button>
                            <button disabled={
                                !assetNameInput.validInput ||
                                !assetTickerInput.validInput ||
                                !assetCategoryInput.validInput ||
                                !assetDateInput.validInput ||
                                !assetQuantityInput.validInput ||
                                !assetPriceInput.validInput ||
                                !assetCommissionInput.validInput
                            }
                                className="save-more-btn" type="submit" onClick={handleSubmitMore}>Сохранить и добавить ещё</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default AddAsset;
