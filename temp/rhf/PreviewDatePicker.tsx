"use client";

import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Box, Typography, useTheme } from "@mui/material";
import { DateView } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { DATE_TIME_FORMATS, nowDate, otherDateFormat } from "@shared/utils";

const baseStyle = {
  marginRight: "4px",
  padding: "18px",
  cursor: "pointer",
  borderRadius: "8px",
};

const getBoxStyle = (
  activeElement: string | null,
  element: string,
  theme: any,
) => ({
  ...baseStyle,
  boxShadow:
    activeElement === element
      ? `12px 0px 12px -5px ${theme?.palette?.common?.primaryShadow}, -12px 0px 12px -5px ${theme?.palette?.common?.primaryShadow}`
      : "none",
  color: "text.primary",
});

type StaticDatePickerLandscapeProps = {
  name: string;
  footer?: boolean;
  [key: string]: any;
};

export default function StaticDatePickerLandscape({
  name,
  label = "Select Date",
  footer = false,
  ...props
}: StaticDatePickerLandscapeProps) {
  const [view, setView] = React.useState<DateView[]>(["day"]);
  const theme = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={nowDate()}
      render={({ field }) => {
        const day = otherDateFormat(field.value, DATE_TIME_FORMATS?.D);
        const month = otherDateFormat(field.value, DATE_TIME_FORMATS?.MMMM);

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: "18px",
              }}
            >
              <Typography variant="h6">
                <Box
                  component="span"
                  sx={getBoxStyle(view[0] || "day", "day", theme)}
                  onClick={() => setView(["day"])}
                >
                  {day}
                </Box>
                <Box
                  component="span"
                  sx={getBoxStyle(view[0] || "month", "month", theme)}
                  onClick={() => setView(["month"])}
                >
                  {month}
                </Box>
              </Typography>
            </Box>
            <Box
              sx={{
                "& .MuiPickersDay-root:focus": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                },
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                  "&:focus": {
                    backgroundColor: theme.palette.grayscale[800],
                    color: theme.palette.common.white,
                  },
                },
                "& .MuiPickersMonth-monthButton:focus": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                },
                "& .MuiPickersMonth-monthButton.Mui-selected": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                  "&:focus": {
                    backgroundColor: theme.palette.grayscale[800],
                    color: theme.palette.common.white,
                  },
                },
                "& .MuiPickersYear-yearButton:focus": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                },
                "& .MuiPickersYear-yearButton.Mui-selected": {
                  backgroundColor: theme.palette.grayscale[800],
                  color: theme.palette.common.white,
                  "&:focus": {
                    backgroundColor: theme.palette.grayscale[800],
                    color: theme.palette.common.white,
                  },
                },
              }}
            >
              <StaticDatePicker
                orientation="landscape"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                views={view}
                slotProps={{
                  day: {
                    sx: {
                      "&.MuiPickersDay-root:focus": {
                        backgroundColor: theme.palette.grayscale[800],
                        color: theme.palette.common.white,
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.grayscale[800],
                        color: theme.palette.common.white,
                        "&:focus": {
                          backgroundColor: theme.palette.grayscale[800],
                          color: theme.palette.common.white,
                        },
                      },
                    },
                  },
                }}
                {...props}
              />
            </Box>
          </LocalizationProvider>
        );
      }}
    />
  );
}
