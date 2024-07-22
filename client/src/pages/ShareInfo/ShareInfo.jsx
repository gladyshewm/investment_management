import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShareInfo.css";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import { formatDate } from "../../utils/formatDate";
import Loading from "../../components/Loading/Loading";

const ShareInfo = () => {
    const { figi } = useParams();
    const [shareData, setShareData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const callAPIShare = async () => {
            try {
                const response = await fetch(`/api/share/${figi}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        }

        callAPIShare()
            .then(res => {
                setShareData(res);
                setIsLoading(false);
            }
            )
            .catch(err => console.log(err));
    }, [figi]);

    if (isLoading) {
        return <Loading />;
    }

    const share = shareData[0];
    const shadowColor = share.logo_base_color === "#000000" ? "rgba(255, 255, 255, 0.8)" : share.logo_base_color; 

    return (
        <div className="bond-info" style={{ '--shadow-color': shadowColor }}>
            <Sidebar />
            <div className="header-info">
                <div className="bond-name">{share.name}</div>
                <div className="header-logo">
                    <img src={share.logo_url} alt={share.name} />
                </div>
            </div>
            <div className="main-info">
                <div className="col-1">
                    <div className="id-info">
                        <span className="title">Идентификационные данные</span>
                        <div className="info-item">
                            <div className="info-item__left">Название</div>
                            <div className="info-item__right">{share.name}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Figi</div>
                            <div className="info-item__right">{share.figi}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ticker</div>
                            <div className="info-item__right">{share.ticker}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Класс-код (секция торгов)</div>
                            <div className="info-item__right">{share.class_code}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left"> ISIN</div>
                            <div className="info-item__right">{share.isin}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID</div>
                            <div className="info-item__right">{share.uid}</div>
                        </div>
                    </div>
                    <div className="revenue-info">
                        <span className="title">Котировки</span>
                        <div className="info-item">
                            <div className="info-item__left">Коэф. ставки риска длинной позиции по клиенту</div>
                            <div className="info-item__right">{share.klong}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Коэф. ставки риска короткой позиции по клиенту</div>
                            <div className="info-item__right">{share.kshort}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КСУР лонг</div>
                            <div className="info-item__right">{share.dlong}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КСУР шорт</div>
                            <div className="info-item__right">{share.dshort}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КПУР лонг</div>
                            <div className="info-item__right">{share.dlong_min}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Ставка риска начальной маржи для КПУР шорт</div>
                            <div className="info-item__right">{share.dshort_min}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак доступности для операций в шорт</div>
                            <div className="info-item__right">{share.short_enabled_flag ? 'Да' : 'Нет'}</div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="spec-info">
                        <span className="title">Характеристики</span>
                        <div className="info-item">
                            <div className="info-item__left">Страна риска</div>
                            <div className="info-item__right">{share.country_of_risk_name}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Сектор</div>
                            <div className="info-item__right">{share.sector}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Размер выпуска</div>
                            <div className="info-item__right">{share.issue_size}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Планируемый размер выпуска</div>
                            <div className="info-item__right">{share.issue_size_plan}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Тип акции</div>
                            <div className="info-item__right">{share.share_type}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата IPO</div>
                            <div className="info-item__right">{formatDate(share.ipo_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Наличие дивидендов</div>
                            <div className="info-item__right">{share.div_yield_flag ? 'Да' : 'Нет'}</div>
                        </div>
                    </div>
                    <div className="trade-info">
                        <span className="title">Торговые данные</span>
                        <div className="info-item">
                            <div className="info-item__left">Биржа</div>
                            <div className="info-item__right">{share.exchange}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Режим торгов</div>
                            <div className="info-item__right">{share.trading_status}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность к покупке</div>
                            <div className="info-item__right">{share.buy_available_flag ? 'Доступно' : 'Недоступно'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность к продаже</div>
                            <div className="info-item__right">{share.sell_available_flag ? 'Доступно' : 'Недоступно'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Признак внебиржевой ценной бумаги</div>
                            <div className="info-item__right">{share.otc_flag ? 'Да' : 'Нет'}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="revenue-info">
                        <span className="title">Лот и валюта</span>
                        <div className="info-item">
                            <div className="info-item__left">Лот</div>
                            <div className="info-item__right">{share.lot}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Валюта</div>
                            <div className="info-item__right">{share.currency}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Номинальная стоимость</div>
                            <div className="info-item__right">{share.nominal}</div>
                        </div>
                    </div>
                    <div className="other-info">
                        <span className="title">Другое</span>
                        <div className="info-item">
                            <div className="info-item__left">Реальная площадка исполнения расчётов</div>
                            <div className="info-item__right">{share.real_exchange}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID позиции</div>
                            <div className="info-item__right">{share.position_uid}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">UID актива</div>
                            <div className="info-item__right">{share.asset_uid}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность для ИИС</div>
                            <div className="info-item__right">{share.for_iis_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность торговли только для квалифицированных инвесторов</div>
                            <div className="info-item__right">{share.for_qual_investor_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Доступность торговли инструментом по выходным</div>
                            <div className="info-item__right">{share.weekend_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Флаг заблокированного ТКС</div>
                            <div className="info-item__right">{share.blocked_tca_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Флаг достаточной ликвидности</div>
                            <div className="info-item__right">{share.liquidity_flag ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата первой минутной свечи</div>
                            <div className="info-item__right">{formatDate(share.first_1min_candle_date)}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-item__left">Дата первой дневной свечи</div>
                            <div className="info-item__right">{formatDate(share.first_1day_candle_date)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ShareInfo;
