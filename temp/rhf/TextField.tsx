"use client";

import React, { useState, useRef } from "react";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Controller, useFormContext, FieldError } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CustomLabel } from "../custom-label";
import { useTheme } from "@mui/material/styles";

interface RHFTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  type?: "text" | "password" | "email" | "number" | "color";
  readOnly?: boolean;
  StartIcon?: React.ReactNode;
  EndIcon?: React.ReactNode;
  label?: string;
  labelSx?: SxProps<Theme>;
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  required?: boolean;
  onBlurHandler?: (value: any) => void;
  fieldSize?: "small" | "medium" | "large";
}

const fieldSizeHeightMap = {
  small: "3.928rem",
  medium: "4.2rem",
  large: "4.6rem",
};

export default function RHFTextField({
  name,
  type = "text",
  variant = "outlined",
  readOnly = false,
  StartIcon,
  EndIcon,
  label,
  labelSx,
  fullWidth = true,
  rules,
  required = false,
  onBlurHandler,
  fieldSize = "small",
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  // Pull slotProps and sx out of other so we can merge them explicitly below
  // (leaving them in {…other} would silently override our built-in slotProps/sx)
  const { slotProps: callerSlotProps, sx: callerSx, defaultValue: callerDefaultValue, ...restOther } = other as any;

  const endAdornment =
    type === "password" && !EndIcon ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Visibility sx={{ color: "text.secondary" }} />
          ) : (
            <VisibilityOff sx={{ color: "text.secondary" }} />
          )}
        </IconButton>
      </InputAdornment>
    ) : (
      EndIcon
    );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={callerDefaultValue || ""}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && (
            <CustomLabel label={label} required={required} error={error} sx={labelSx} />
          )}
          <TextField
            {...field}
            value={field?.value || ""}
            onChange={field?.onChange}
            onBlur={(e) => {
              // Read the actual DOM value — catches autofill / password-manager fills
              // that set the input value without triggering React's onChange
              const domVal = inputRef.current?.value ?? (e.target as HTMLInputElement).value ?? "";
              if (domVal !== String(field.value ?? "")) {
                field.onChange(domVal);
              }
              onBlurHandler?.(field.value);
              field?.onBlur?.();
            }}
            fullWidth={fullWidth}
            error={Boolean(error)}
            helperText={(error as FieldError)?.message}
            type={
              type === "password" && !EndIcon
                ? showPassword
                  ? "text"
                  : type
                : type
            }
            variant={variant}
            slotProps={{
              input: {
                readOnly,
                endAdornment,
                startAdornment: StartIcon,
                ...callerSlotProps?.input,
              },
              htmlInput: {
                // Catch browser autofill that bypasses React's onChange
                onInput: (e: React.FormEvent<HTMLInputElement>) => {
                  const val = (e.target as HTMLInputElement).value;
                  if (val !== String(field.value ?? "")) {
                    field.onChange(val);
                  }
                },
                ...callerSlotProps?.htmlInput,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: fieldSizeHeightMap[fieldSize],
                overflow: "hidden",
                "&.Mui-error fieldset": {
                  borderWidth: "1px",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#B0B7C3",
                opacity: 1,
              },
              "& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus": {
                transition: "background-color 9999s ease-out 0s",
                WebkitTextFillColor: "inherit",
                caretColor: "inherit",
              },
              ...callerSx,
            }}
            {...restOther}
            inputRef={inputRef}
            label={""}
          />
        </Stack>
      )}
    />
  );
}
