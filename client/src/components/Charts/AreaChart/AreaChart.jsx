import React from "react";
import { Chart } from "react-google-charts";
import "./AreaChart.css";

const data = [
    ["Год", "Стоимость портфеля"],
    [2013, 1000],
    [2014, 1170],
    [2015, 660],
    [2016, 1030],
];

const options = {
    colors:['#EF1211','#00B60F'],
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

        /* title: "Year",
        titleTextStyle: { color: "#333" } */
    },
    vAxis: {
        minValue: 0,
        /* baselineColor: "#fffffc", */
        gridlines: {
            color: "#333",
        },
        textStyle: {
            color: "#D0D0D0",
        }
    },
    backgroundColor: {
        fill: "transparent",
    },
    chartArea: {
        width: "50%",
        height: "70%",
        backgroundColor: "transparent",
    },
    legend: {
        textStyle: {
            color: "#D0D0D0",
        }
    },
    pointShape: "circle",
    pointsVisible: true,
    tooltip: {
        textStyle: {
            color: "#000",
        },
    }

};

const AreaChart = () => {
    return (
        <div className="area-chart">
            <Chart
                chartType="AreaChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
};

export default AreaChart;
