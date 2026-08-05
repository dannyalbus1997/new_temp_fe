"use client";
import { FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { SxProps, Theme } from "@mui/material/styles";
import { StyledSwitch } from "./rhf.styles";
interface CustomSwitchProps {
  name: string;
  disabled?: boolean;
  label?: string;
  labelPlacement?: "start" | "end";
  onChange?: (value: boolean) => void;
  helperText?: any;
  sx?: SxProps<Theme>;
}

export default function CustomSwitch({
  name,
  disabled,
  label,
  labelPlacement = "end",
  onChange,
  helperText = "",
  ...other
}: CustomSwitchProps) {
  const { control } = useFormContext();

  return (
    <>
      <FormControlLabel
        label={label}
        labelPlacement={labelPlacement}
        sx={{
          gap: 1,
          marginLeft: "0px !important",
        }}
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <StyledSwitch
                disabled={disabled}
                checked={field.value ?? false}
                onChange={(event) => {
                  field.onChange(event.target.checked);
                  onChange?.(event.target.checked);
                }}
              />
            )}
          />
        }
        {...other}
      />
      {helperText && helperText}
    </>
  );
}
