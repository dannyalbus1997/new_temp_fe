"use client";

import { Controller, useFormContext } from "react-hook-form";
import React, { JSX, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Box, Stack, useTheme } from "@mui/material";
import { CustomLabel } from "../custom-label";
import { slotTimePickerPropsStyles } from "./rhf.styles";
import {
  formatToDate,
  generateDate,
  getDayOfWeek,
  nowDate,
} from "@shared/utils";

interface TimePickerProps {
  name: string;
  label?: string;
  required: boolean;
  size?: "small" | "medium";
  other?: Record<string, any>;
  fullWidth?: boolean;
  openOnMount?: boolean;
  hasDefaultValue?: boolean;
  onChangeHandler?: (date: Date | null) => void;
  disabled?: boolean;
}

export default function RHFDateTimePicker({
  name,
  label,
  required,
  openOnMount = false,
  hasDefaultValue = true,
  disabled = false,
  ...other
}: TimePickerProps): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();
  const [open, setOpen] = useState(openOnMount);
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Stack gap="0.6rem">
            {label && (
              <CustomLabel label={label} required={required} error={error} />
            )}
            <DateTimePicker
              disabled={disabled}
              {...field}
              onChange={(date) => {
                const convertedDate = date ? formatToDate(date) : null;
                field.onChange(convertedDate);
                other?.onChangeHandler?.(convertedDate);
              }}
              value={field.value ? generateDate(field.value) : null}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              orientation="landscape"
              defaultValue={hasDefaultValue ? nowDate() : undefined}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
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
              {...other}
              slotProps={{
                textField: {
                  size: other?.size,
                  helperText: error ? error.message : "",
                  error: Boolean(error),
                  fullWidth: other.fullWidth,
                  disabled: true,
                  slotProps: {
                    input: {
                      readOnly: true,
                    },
                  },
                  sx: {
                    "& .MuiInputAdornment-root .MuiIconButton-root .MuiSvgIcon-root":
                      {
                        color: theme.palette.grayscale[800],
                      },
                  },
                },
                ...slotTimePickerPropsStyles(theme),
              }}
            />
          </Stack>
        )}
      />
    </Box>
  );
}
