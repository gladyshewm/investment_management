const formatDataForPieChart = (tableData) => {
    const dataForChart = [['name', 'price']]; // Первая строка

    // Проходимся по массиву данных и добавляем каждую категорию и общую цену в массив для графика
    tableData.forEach((item) => {
        dataForChart.push([item.category, item.price]);
    });

    return dataForChart;
};

const formatDataForBarChart = (tableData) => {
    const dataForChart = [["Дата", "Выплата", { role: 'tooltip', type: 'string', p: { html: true } }]];

    tableData.forEach((item) => {
        const paymentDate = new Date(item.paymentDate);
        const tooltipContent = `
        <div class="tooltip-content">
            <div class="item">Тикер: <b>${item.ticker}</b></div>
            <div class="item">Дата выплаты: ${paymentDate.toLocaleString()}</div>
            <div class="item">Сумма: ${item.totalDividends} ₽</div>
        </div>
        `;
        dataForChart.push([paymentDate, item.totalDividends, tooltipContent]);
    });

    return dataForChart;
}

const portfolioMethods = {
    formatDataForPieChart,
    formatDataForBarChart
};

export default portfolioMethods;