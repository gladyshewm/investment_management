import React from "react";
import { Chart } from "react-google-charts";
import "./CandleChart.css";

const options = {
    legend: "none",
    animation: {
        startup: true,
        easing: "out",
        duration: 500,
    },
    hAxis: {
        baselineColor: "#fff",
        gridlines: {
            color: "#3C3E42",
        },
        minorGridlines: {
            color: "transparent",
        },
        textStyle: {
            color: "#D0D0D0",
        },
    },
    vAxis: {
        baselineColor: "#fff",
        gridlines: {
            color: "#3C3E42",
        },
        minorGridlines: {
            color: "transparent",
        },
        textStyle: {
            color: "#D0D0D0",
        },
    },
    colors: ['#D0D0D0'],
    explorer: {
        actions: ['dragToPan', 'scrollToZoom', 'rightClickToReset'],
        /* axis: 'horizontal', */
        maxZoomIn: 5.0,
        keepInBounds: false,
    },
    candlestick: {
        fallingColor: { stroke: "transparent", strokeWidth: 1, fill: '#EF1211' },
        risingColor: { stroke: "transparent", strokeWidth: 1, fill: '#00B60F' },
    },
    backgroundColor: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 1,
    },
    chartArea: {
        backgroundColor: 'transparent',
        left: 35,
        top: 5,
        width: '95%',
        height: '90%',
    },
    focusTarget: "datum",
    height: '100%',
    width: '100%',
    tooltip: {
        textStyle: {
            color: '#000',
            fontSize: 12,
            italic: false
        },
        isHtml: true, //false - svg, true - html
        showColorCode: false,
    },
};

const CandleChart = ({ data }) => {
    return (
        <Chart
            chartType="CandlestickChart"
            data={data}
            options={options}
        />
    )
};

export default CandleChart;
