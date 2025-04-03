import React from "react";
import Chart from "react-apexcharts";

export default function DonutChart({ series, colors, labels }){
  if (typeof window === "undefined") return;

  const chartOptions ={
    series: series,
    colors: colors,
    chart: {
      height: 200,
      type: "donut",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
    labels: labels,
    legend: {
        labels: {
          colors: "#FFFFFF",
        },
      },
    stroke: {
      show: false,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false, 
    },
    tooltip: {
      enabled: true, 
    },
  };

  return <Chart options={chartOptions} series={series} type="donut" height={200} />
};

