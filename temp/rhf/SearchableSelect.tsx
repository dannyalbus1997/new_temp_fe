"use client";

import { Fragment, ReactNode, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Autocomplete,
  Typography,
  SxProps,
  AutocompleteProps,
  Stack,
} from "@mui/material";
import { CustomLabel } from "../custom-label";
import { useTheme } from "@emotion/react";

interface SearchableSelectProps extends Partial<
  Omit<AutocompleteProps<any, any, any, any>, "renderInput" | "options">
> {
  name: string;
  label?: string;
  options: any[];
  required?: boolean;
  noOptionsText?: string;
  placeholder?: string;
  freeSolo?: boolean;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  onChangeHandler?: (
    event: any,
    newValue: any,
    onChange: (value: any) => void
  ) => void;
  isOptionEqualToValue?: (option: any, newValue: any) => boolean;
  getOptionLabel?: (option: any) => string;
  groupBy?: (option: any) => string;
  size?: "small" | "medium";
  sx?: SxProps;
  labelSx?: SxProps;
}

export default function SearchableSelect({
  name,
  label,
  options,
  required = false,
  noOptionsText = "Nothing in the List",
  placeholder,
  freeSolo = false,
  endAdornment = false,
  startAdornment = false,
  onChangeHandler,
  isOptionEqualToValue = (option, newValue) => option?._id === newValue?._id,
  getOptionLabel = (option) => option?.label || option?.replaceAll?.("_", " "),
  groupBy = (option) => option?.groupBy,
  sx,
  labelSx,
  onOpen: externalOnOpen,
  ...other
}: SearchableSelectProps) {
  const theme: any = useTheme();

  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChangeHandler?.(e, newValue, onChange);
    onChange(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Stack gap="0.6rem">
            {label && (
              <CustomLabel label={label} required={required} error={error} sx={labelSx} />
            )}
            <Autocomplete
              freeSolo={freeSolo}
              id={name}
              open={open}
              onOpen={(event) => {
                setOpen(true);
                // Call external onOpen handler if provided
                externalOnOpen?.(event);
              }}
              onClose={() => {
                setOpen(false);
              }}
              options={options ?? []}
              onChange={(e, newValue) => {
                onChanged(e, newValue, onChange);
              }}
              autoComplete
              noOptionsText={noOptionsText}
              groupBy={groupBy}
              value={value || null}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              slotProps={{
                paper: {
                  sx: {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
              {...other}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!error}
                  placeholder={placeholder}
                  helperText={error?.message}
                  sx={{
                    ".MuiAutocomplete-input": {
                      color: "text.primary",
                    },
                    ".MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                      color: "text.secondary",
                      width: "1.5em",
                      height: "1.5em",
                    },
                    ...sx,
                  }}
                  slotProps={{
                    input: {
                      ...params?.InputProps,
                      endAdornment: (
                        <Fragment>
                          {endAdornment && endAdornment}
                          {params?.InputProps?.endAdornment}
                        </Fragment>
                      ),
                      startAdornment: (
                        <Fragment>
                          {startAdornment && startAdornment}
                          {params?.InputProps?.startAdornment}
                        </Fragment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Stack>
        );
      }}
    />
  );
}
