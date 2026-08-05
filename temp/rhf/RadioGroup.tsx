"use client";

import { useFormContext, Controller } from "react-hook-form";
import React, { ReactNode } from "react";
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  RadioGroupProps,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { CustomLabel } from "../custom-label";

interface Option {
  value: string | number | boolean;
  label: string | ReactNode;
  text?: string;
}

interface RHFRadioGroupProps extends Omit<RadioGroupProps, "name"> {
  name: string;
  options: Option[];
  label?: string;
  row?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export default function RHFRadioGroup({
  name,
  options,
  label,
  row = true,
  disabled = false,
  required = false,
  ...other
}: RHFRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0]?.value || ""}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && (
            <CustomLabel label={label} required={required} error={error} />
          )}
          <RadioGroup
            row={row}
            value={value ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;

              if (newValue === "true") onChange(true);
              else if (newValue === "false") onChange(false);
              else onChange(newValue);
            }}
            {...other}
          >
            {options.map(({ value, label, text }) => (
              <FormControlLabel
                key={String(value)} // Use `String(value)` for keys
                value={value}
                control={<Radio disabled={disabled} />}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "16px", fontweight: "900px" }}
                    >
                      {label}
                    </Typography>
                    {text && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "13px", fontweight: 600 }}
                      >
                        {text}
                      </Typography>
                    )}
                  </Box>
                }
              />
            ))}
          </RadioGroup>

          {Boolean(error) && (
            <FormHelperText error>{error?.message}</FormHelperText>
          )}
        </Stack>
      )}
    />
  );
}
