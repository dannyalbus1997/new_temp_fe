"use client";

import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

interface RhfCheckboxProps {
  name: string;
  required?: boolean;
  disabled?: boolean;
  label?: string | React.ReactNode;
  [key: string]: unknown;
  onChangeHandler?: (e: any, value: boolean) => void;
  showErrorMessage?: boolean;
}

export default function RhfCheckbox({
  name,
  required,
  label,
  disabled,
  onChangeHandler,
  showErrorMessage = false,
  ...other
}: RhfCheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <Checkbox
                  {...field}
                  checked={field?.value ?? false}
                  disabled={disabled}
                  onChange={(e) => {
                    const value = e.target.checked;
                    field.onChange(value);
                    onChangeHandler?.(e, value);
                  }}
                  {...other}
                />

                {label && (
                  <CustomLabel
                    label={label}
                    required={required}
                    error={error}
                  />
                )}
              </Box>

              {showErrorMessage && error && (
                <Box>
                  <Typography variant="caption" color="error">
                    {error.message}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        />
      }
      label=""
    />
  );
}
