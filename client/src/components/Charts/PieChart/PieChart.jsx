import React from "react";
import { Chart } from "react-google-charts";
import "./PieChart.css";

/* const data = [
    ["Task", "Hours per Day"],
    ["Валюта", 11],
    ["Криптовалюта", 2],
    ["Акции", 2],
    ["Облигации", 2],
    ["Sleep", 7],
]; */

const options = {
    title: "",
    pieHole: 0.5,
    is3D: false,
    height: 400,
    width: '100%',
    backgroundColor: {
        stroke: "#666",
        strokeWidth: 0,
        fill: "transparent", /* #121212 */
    },
    chartArea: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        width: '100%',
        height: '100%',
    },
    legend: "none",
    /* legend: {
        position: "bottom",
        alignment: "center",
    }, */
    fontSize: 14,
    fontName: "Sans-Serif",
    pieSliceBorderColor: "#3C3E42",
    pieSliceText: "percentage",
    pieSliceTextStyle: {
        color: "#fff",
        fontName: "Sans-Serif",
        fontSize: 14,
    },
    pieResidueSliceLabel: "Другое",
    tooltip: {
        isHtml: false,
        text: "both",
        trigger: "focus",
    },
};

const PieChart = ({ data }) => {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
        />
    )
};

export default PieChart;
