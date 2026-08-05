import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { cssStyles } from "./Chart.data";
import { GlobalStyles } from "@mui/material";

export default function ChartStyle() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "&.apexcharts-canvas": {
          ".apexcharts-xaxistooltip": {
            ...cssStyles(theme)?.bgBlur(),
            border: 0,
            color: theme.palette.grayscale[800],
            borderRadius: Number(theme?.shape?.borderRadius) * 1.5,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(
                theme?.palette?.background?.default,
                0.8,
              ),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            backgroundColor: `${theme.palette.grayscale[800]} !important`,
            color: "white !important",
            border: 0,
            borderRadius: Number(theme?.shape?.borderRadius) * 1.5,
            paddingTop: "4px !important",
            paddingBottom: "4px !important",
            "& .apexcharts-tooltip-title": {
              display: "block !important",
              backgroundColor: "transparent !important",
              color: "white !important",
              marginBottom: "4px !important",
              paddingBottom: "4px !important",
              borderBottom: "none !important",
            },
            "& .apexcharts-tooltip-series-group": {
              color: "white !important",
            },
            "& .apexcharts-tooltip-text": {
              color: "white !important",
            },
            "& .apexcharts-tooltip-text-label": {
              color: `${theme.palette.grayscale[800]} !important`,
            },
            "& .apexcharts-tooltip-text-value": {
              color: "white !important",
            },
          },
          ".apexcharts-legend": {
            padding: 0,
            gap: "8px",
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 13,
          },
          ".apexcharts-legend-text": {
            textTransform: "capitalize",
             
            marginTop: "3px",
            color: `${theme.palette.grayscale[400]} !important`,
            fontSize: "14px !important",
            fontWeight: 400,
          },
          ".apexcharts-xaxis-texts": {
            "& .apexcharts-text": {
              fill: `${theme.palette.grayscale[400]} !important`,
              fontSize: "12px !important",
            },
          },
          ".apexcharts-yaxis-texts": {
            "& .apexcharts-text": {
              fill: `${theme.palette.grayscale[400]} !important`,
              fontSize: "12px !important",
            },
          },
        },
      }}
    />
  );
}
