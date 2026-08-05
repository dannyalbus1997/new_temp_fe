"use client";
import React from "react";
import { ICustomChartProps } from "./Chart.interface";
import ChartStyle from "./Chart.style";
import { barOptions } from "./Chart.data";
import { useTheme } from "@mui/material";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const CustomChart = ({
  options,
  series,
  type,
  height = "312",
  width,
  isThemeColors = true,
}: ICustomChartProps) => {
  const theme = useTheme();

  return (
    <>
      <ChartStyle />
      <ReactApexChart
        options={barOptions(theme, type, options, isThemeColors)}
        series={series}
        type={type}
        width={width}
        height={height}
      />
    </>
  );
};

export { default as ChartStyle } from "./Chart.style";

export default CustomChart;
