"use client";

import React from "react";
import { Stack, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import { JSX } from "react";
import { CustomLabel } from "../custom-label";
import { Controller, useFormContext } from "react-hook-form";
import { slotPropsStyles } from "./rhf.styles";
import { formatToDate, generateDate, getDayOfWeek } from "@shared/utils";

// ----------------------------------------------------------------------
interface DatePickerInterFace {
  name: string;
  label?: string;
  required?: boolean;
  yearOnly?: boolean;
  monthOnly?: boolean;
  monthYearOnly?: boolean;
  dateOnly?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  other?: Record<string, any>;
  onChangeHandler?: (date: Date | null) => void;
  disabled?: boolean;
  minDate?: any;
  maxDate?: any;
  shouldDisableMonth?: (month: any) => boolean;
  shouldDisableDate?: (date: any) => boolean;
  textFieldSx?: SxProps<Theme>;
}

export default function RHFDatePicker({
  name,
  label,
  required = false,
  yearOnly = false,
  monthOnly = false,
  monthYearOnly = false,
  dateOnly = false,
  disabled = false,
  minDate,
  maxDate,
  shouldDisableMonth,
  shouldDisableDate,
  textFieldSx,
  ...other
}: DatePickerInterFace): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();
  let views: DateView[];

  if (yearOnly) {
    views = ["year"];
  } else if (monthOnly) {
    views = ["month"];
  } else if (monthYearOnly) {
    views = ["year", "month"];
  } else if (dateOnly) {
    views = ["day"];
  } else {
    views = ["year", "month", "day"];
  }

  let openTo: DateView;

  if (yearOnly) {
    openTo = "year";
  } else if (monthOnly) {
    openTo = "month";
  } else if (monthYearOnly) {
    openTo = "month";
  } else {
    openTo = "day";
  }

  let placeHolder;
  if (yearOnly) {
    placeHolder = "Select year";
  } else if (monthOnly) {
    placeHolder = "Select month";
  } else {
    placeHolder = "Select date";
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack>
            {label && (
              <CustomLabel label={label} required={required} error={error} />
            )}

            <DatePicker
              disabled={disabled}
              {...field}
              {...other}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableMonth={shouldDisableMonth}
              shouldDisableDate={shouldDisableDate}
              views={views}
              openTo={openTo}
              localeText={{
                calendarWeekNumberHeaderText: "Week",
              }}
              dayOfWeekFormatter={(day) => {
                const daysFull = [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ];
                return daysFull[getDayOfWeek(day)];
              }}
              slotProps={{
                textField: {
                  size: other?.size,
                  helperText: error ? error.message : "",
                  error: Boolean(error),
                  fullWidth: other.fullWidth,
                  variant: "outlined",
                  sx: {
                    "& .MuiInputBase-input": {
                      padding: theme.spacing(1.25, 1.75),
                      color: "text.primary",
                    },
                    "& .MuiInputAdornment-root .MuiIconButton-root .MuiSvgIcon-root": {
                      color: theme.palette.ink[400],
                      fontSize: "2rem",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: theme.palette.ink[200],
                      opacity: 1,
                    },
                    ...(textFieldSx as object),
                  },
                },
                ...slotPropsStyles(theme),
              }}
              onChange={(date) => {
                const convertedDate = date ? formatToDate(date) : null;
                field.onChange(convertedDate);
                other?.onChangeHandler?.(convertedDate);
              }}
              value={field.value ? generateDate(field.value) : null}
            />
          </Stack>
        );
      }}
    />
  );
}
