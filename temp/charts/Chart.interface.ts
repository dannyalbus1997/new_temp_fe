export interface ICustomChartProps {
  options: any;
  series: any;
  type: ChartType;
  height?: string | number;
  width?: string | number;
  isThemeColors?: boolean;
}

export type ChartType =
  | "area"
  | "line"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;
