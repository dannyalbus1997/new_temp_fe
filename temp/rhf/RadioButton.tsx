"use client";

import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import {
  Radio,
  FormHelperText,
  FormControlLabel,
  RadioProps,
  Stack,
} from "@mui/material";
import { CustomLabel } from "../custom-label";

interface RHFRadioButtonProps extends Omit<RadioProps, "name"> {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function RHFRadioButton({
  name,
  label,
  disabled = false,
  required = false,
  ...other
}: RHFRadioButtonProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          <FormControlLabel
            control={
              <Radio
                checked={Boolean(value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e.target.checked);
                }}
                disabled={disabled}
                {...other}
                sx={{ ml: 0.3 }}
              />
            }
            label={""}
          />
          {label && (
            <CustomLabel label={label} required={required} error={error} />
          )}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Stack>
      )}
    />
  );
}
