import React from "react";
import { Chart } from "react-google-charts";
import "./BarChart.css";

/* const data = [
    ["Дата", "Величина дивиденда"],
    [new Date("01-01-2024"), 1000],
    [new Date("02-01-2024"), 1170],
    [new Date("09-02-2024"), 660],
    [new Date("11-04-2024"), 1030],
]; */

const options = {
    orientation: "horizontal",
    animation: {
        startup: true,
        easing: "out",
        duration: 500,
    },
    explorer: {
        actions: ['dragToPan', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: false,
    },
    colors: ['#EF1211'],
    hAxis: {
        baselineColor: "#fff",
        gridlines: {
            color: "transparent",
        },
        minorGridlines: {
            color: "transparent",
        },
        textStyle: {
            color: "#D0D0D0",
        },
    },
    vAxis: {
        minValue: 0,
        gridlines: {
            color: "#333",
        },
        minorGridlines: {
            color: "none",
        },
        textStyle: {
            color: "#D0D0D0",
        }
    },
    backgroundColor: {
        fill: "transparent",
    },
    chartArea: {
        width: "70%",
        height: "70%",
        backgroundColor: "transparent",
    },
    legend: "none",
    bar: {
        groupWidth: 50
    },
    tooltip: {
        isHtml: true
    }
};

const BarChart = ({ data }) => {
    return (
        <div className="area-chart">
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
};

export default BarChart;
