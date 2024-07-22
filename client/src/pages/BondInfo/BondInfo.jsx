import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import "./BondInfo.css";
import { formatDate } from "../../utils/formatDate";
import Loading from "../../components/Loading/Loading";

const BondInfo = () => {
    const { figi } = useParams();
    const [bondData, setBondData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const callAPIBond = async () => {
            try {
                const response = await fetch(`/api/bond/${figi}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        }

        callAPIBond()
            .then(res => {
                setBondData(res);
                setIsLoading(false);
            }
            )
            .catch(err => console.log(err));
    }, [figi]);

    if (isLoading) {
        return <Loading />;
    }

    const bond = bondData[0];
    const shadowColor = bond.logo_base_color === "#000000" ? "rgba(255, 255, 255, 0.8)" : bond.logo_base_color; 

    return (
        <div className="bond-info" style={{ '--shadow-color': shadowColor }}>
            <Sidebar />
            <div className="header-info">
                <div className="bond-name">{bond.name}</div>
                <div className="header-logo">
                    <img src={bond.logo_url} alt={bond.name} />
                </div>
            </div>
            <div className="main-info">
                <div className="col-1">
                    <div className="id-info">
                        <span className="title">Идентификационные данные</span>
                        <div className="info-item">
                            <div className="info-item__left">Название</div>
                            <div className="info-item__right">{bond.name}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Figi</div>
                            <div className="info-item__right">{bond.figi}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ticker</div>
                            <div className="info-item__right">{bond.ticker}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Класс-код (секция торгов)</div>
                            <div className="info-item__right">{bond.class_code}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left"> ISIN</div>
                            <div className="info-item__right">{bond.isin}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID</div>
                            <div className="info-item__right">{bond.uid}</div>
                        </div>
                    </div>
                    <div className="trade-info">
                        <span className="title">Торговые данные</span>
                        <div className="info-item">
                            <div className="info-item__left">Биржа</div>
                            <div className="info-item__right">{bond.exchange}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Статус торговли</div>
                            <div className="info-item__right">{bond.trading_status}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность к покупке</div>
                            <div className="info-item__right">{bond.buy_available_flag ? 'Доступно' : 'Недоступно'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность к продаже</div>
                            <div className="info-item__right">{bond.sell_available_flag ? 'Доступно' : 'Недоступно'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак внебиржевой ценной бумаги</div>
                            <div className="info-item__right">{bond.otc_flag ? 'Да' : 'Нет'}</div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="spec-info">
                        <span className="title">Характеристики</span>
                        <div className="info-item">
                            <div className="info-item__left">Страна эмитента</div>
                            <div className="info-item__right">{bond.country_of_risk_name}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Сектор</div>
                            <div className="info-item__right">{bond.sector}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Вид выпуска</div>
                            <div className="info-item__right">{bond.issue_kind}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Размер выпуска</div>
                            <div className="info-item__right">{bond.issue_size}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Планируемый размер выпуска</div>
                            <div className="info-item__right">{bond.issue_size_plan}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата размещения</div>
                            <div className="info-item__right">{formatDate(bond.placement_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Цена размещения</div>
                            <div className="info-item__right">{bond.placement_price}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата государственной регистрации</div>
                            <div className="info-item__right">{formatDate(bond.state_reg_date)}</div>
                        </div>
                    </div>
                    <div className="risk-info">
                        <span className="title">Риск и ликвидность</span>
                        <div className="info-item">
                            <div className="info-item__left">Уровень риска</div>
                            <div className="info-item__right">{bond.risk_level}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Флаг ликвидности</div>
                            <div className="info-item__right">{bond.liquidity_flag ? 'Ликвидна' : 'Не ликвидна'}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="revenue-info">
                        <span className="title">Данные о доходности</span>
                        <div className="info-item">
                            <div className="info-item__left">Ставка купона</div>
                            <div className="info-item__right"></div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Количество купонных выплат в год</div>
                            <div className="info-item__right">{bond.coupon_quantity_per_year}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Номинальная стоимость</div>
                            <div className="info-item__right">{bond.nominal}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Начальная номинальная стоимость</div>
                            <div className="info-item__right">{bond.initial_nominal}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата погашения</div>
                            <div className="info-item__right">{formatDate(bond.maturity_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Валюта расчётов</div>
                            <div className="info-item__right">{bond.currency}</div>
                        </div>
                    </div>
                    <div className="other-info">
                        <span className="title">Другое</span>
                        <div className="info-item">
                            <div className="info-item__left">Реальная площадка исполнения расчётов</div>
                            <div className="info-item__right">{bond.real_exchange}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Коэф. ставки риска длинной позиции по клиенту</div>
                            <div className="info-item__right">{bond.klong}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Коэф. ставки риска короткой позиции по клиенту</div>
                            <div className="info-item__right">{bond.kshort}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КСУР лонг</div>
                            <div className="info-item__right">{bond.dlong}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КСУР шорт</div>
                            <div className="info-item__right">{bond.dshort}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КПУР лонг</div>
                            <div className="info-item__right">{bond.dlong_min}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КПУР шорт</div>
                            <div className="info-item__right">{bond.dshort_min}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак доступности для операций в шорт</div>
                            <div className="info-item__right">{bond.short_enabled_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак облигации с плавающим купоном</div>
                            <div className="info-item__right">{bond.floating_coupon_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак бессрочной облигации</div>
                            <div className="info-item__right">{bond.perpetual_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак облигации с амортизацией долга</div>
                            <div className="info-item__right">{bond.amortization_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак субординированной облигации</div>
                            <div className="info-item__right">{bond.subordinated_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID позиции</div>
                            <div className="info-item__right">{bond.position_uid}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID актива</div>
                            <div className="info-item__right">{bond.asset_uid}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность для ИИС</div>
                            <div className="info-item__right">{bond.for_iis_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность торговли только для квалифицированных инвесторов</div>
                            <div className="info-item__right">{bond.for_qual_investor_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность торговли инструментом по выходным</div>
                            <div className="info-item__right">{bond.weekend_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Флаг заблокированного ТКС</div>
                            <div className="info-item__right">{bond.blocked_tca_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата первой минутной свечи</div>
                            <div className="info-item__right">{formatDate(bond.first_1min_candle_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата первой дневной свечи</div>
                            <div className="info-item__right">{formatDate(bond.first_1day_candle_date)}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default BondInfo;
