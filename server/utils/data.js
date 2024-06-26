const real_exchanges = {
    0: 'Тип не определён',
    1: 'Московская биржа',
    2: 'Санкт-Петербургская биржа',
    3: 'Внебиржевой инструмент',
};

const shares_sectors = {
    'telecom': 'Телекоммуникации',
    'utilities': 'Коммунальные услуги',
    'green_buildings': 'Green Building',
    'electrocars': 'Электромобили',
    'industrials': 'Промышленность',
    'energy': 'Энергетика',
    'it': 'Информационные технологии',
    'financial': 'Финансовый сектор',
    'health_care': 'Здравоохранение',
    'real_estate': 'Недвижимость',
    'ecomaterials': 'Экологические материалы',
    'consumer': 'Потребительский сектор',
    'materials': 'Сырьевой сектор',
    'other': 'Другое',
};

const bonds_sectors = {
    'telecom': 'Телекоммуникации',
    'municipal': 'Муниципалитет',
    'utilities': 'Коммунальные услуги',
    'industrials': 'Промышленность',
    'government': 'Государственный сектор',
    'energy': 'Энергетика',
    'it': 'Информационные технологии',
    'financial': 'Финансовый сектор',
    'health_care': 'Здравоохранение',
    'real_estate': 'Недвижимость',
    'consumer': 'Потребительский сектор',
    'materials': 'Сырьевой сектор',
    'other': 'Другое',
};

const bond_issue_kinds = {
    'documentary': 'Документарная',
    'non_documentary': 'Бездокументарная',
};

const trading_statuses = {
    0: 'Торговый статус не определён',
    1: 'Недоступен для торгов',
    2: 'Период открытия торгов',
    3: 'Период закрытия торгов',
    4: 'Перерыв в торговле',
    5: 'Нормальная торговля',
    6: 'Аукцион закрытия',
    7: 'Аукцион крупных пакетов',
    8: 'Дискретный аукцион',
    9: 'Аукцион открытия',
    10: 'Период торгов по цене аукциона закрытия',
    11: 'Сессия назначена',
    12: 'Сессия закрыта',
    13: 'Сессия открыта',
    14: 'Доступна торговля в режиме внутренней ликвидности брокера',
    15: 'Перерыв торговли в режиме внутренней ликвидности брокера',
    16: 'Недоступна торговля в режиме внутренней ликвидности брокера',
}

const bonds_risk_level = {
    0: 'Не определён',
    1: 'Низкий',
    2: 'Средний',
    3: 'Высокий',
};

const data = {
    real_exchanges,
    shares_sectors,
    bonds_sectors,
    bond_issue_kinds,
    trading_statuses,
    bonds_risk_level
};

export default data;