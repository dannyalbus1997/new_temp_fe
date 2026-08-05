"use client";
import { useTheme, Stack } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";
import { slotPropsStyles } from "./rhf.styles";
import { formatToDate, generateDate } from "@shared/utils";

interface TimePickerI {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  other?: Record<string, any>;
}

export default function RHFTimePicker({
  name,
  label,
  required = false,
  fullWidth = true,
  size = "medium",
  other = {},
}: TimePickerI): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && (
            <CustomLabel label={label} required={required} error={error} />
          )}

          <TimePicker
            {...field}
            {...other}
            slotProps={{
              textField: {
                size,
                helperText: error ? error?.message : "",
                error: Boolean(error),
                fullWidth,
              },
              ...slotPropsStyles(theme),
            }}
            onChange={(value) => {
              field?.onChange(value ? formatToDate(value) : null);
            }}
            value={field.value ? generateDate(field.value) : null}
          />
        </Stack>
      )}
    />
  );
}
