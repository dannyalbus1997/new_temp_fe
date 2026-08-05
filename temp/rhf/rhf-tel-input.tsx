"use client";

import { Stack, FormHelperText, Box, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { CustomLabel } from "../custom-label";

const fieldSizePaddingMap = {
  small:  "0.614rem 5.6rem",
  medium: "0.75rem 5.6rem",
  large:  "0.95rem 5.6rem",
};

export function RHFTelInput({
  name,
  outerLabel,
  variant = "filled",
  readOnly = false,
  required = false,
  country = "gb",
  fieldSize = "small",
  ...other
}: {
  name: string;
  outerLabel?: string;
  labelFontWeight?: string;
  variant?: "outlined" | "filled" | "standard";
  readOnly?: boolean;
  required?: boolean;
  country?: string;
  fieldSize?: "small" | "medium" | "large";
  [key: string]: any;
}): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isError = Boolean(error);
        const errorColor = theme.palette.error.main;
        const borderColor = isError
          ? errorColor
          : theme.palette.grayscale[300] || "#ebe7e5";
        const focusBorderColor = isError
          ? errorColor
          : theme.palette.primary.main;
        return (
          <Stack gap="0.6rem" position="relative">
            {outerLabel && (
              <CustomLabel label={outerLabel} required={required} error={error} />
            )}
             <Box
              sx={{
                width: "100%",
                "& .react-tel-input": {
                  width: "100%",
                },
                "& .react-tel-input .form-control": {
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  backgroundColor: theme.palette.canvas[50],
                  borderRadius: "8px",
                  borderStyle: "solid",
                  borderWidth: "1.5px",
                  borderColor: borderColor,
                  padding: fieldSizePaddingMap[fieldSize],
                  transition: theme.transitions.create(["border-color", "box-shadow"]),
                  "&:hover": {
                    backgroundColor: theme.palette.canvas[50],
                    borderColor: borderColor,
                  },
                  "&:focus": {
                    backgroundColor: theme.palette.canvas[50],
                    borderColor: focusBorderColor,
                    boxShadow: `${focusBorderColor} 0 0 0 2px`,
                    outline: "none",
                  },
                  "&:disabled": {
                    backgroundColor: theme.palette.canvas[100],
                    cursor: "not-allowed",
                  },
                  "&.invalid-number": {
                    borderColor: errorColor,
                    "&:focus": {
                      borderColor: errorColor,
                      boxShadow: `${errorColor} 0 0 0 2px`,
                    },
                  },
                },
                "& .react-tel-input .flag-dropdown": {
                  borderRight: "none",
                  borderRadius: "8px 0 0 8px",
                  "&.open": {
                    backgroundColor: "transparent",
                  },
                },
                "& .react-tel-input .selected-flag": {
                  borderRadius: "8px 0 0 8px",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&:focus": {
                    backgroundColor: "transparent",
                  },
                },
               
              }}
            >
              <PhoneInput
                country={country}
                value={field.value || ""}
                onChange={field?.onChange}
                disabled={readOnly}
                inputProps={{
                  required: required,
                  name: name,
                }}
                specialLabel=""
                {...other}
              />
            </Box>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </Stack>
        );
      }}
    />
  );
}
