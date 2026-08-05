"use client";

import {
  Autocomplete,
  Chip,
  ListItemText,
  Stack,
  SxProps,
  TextField,
  useTheme,
} from "@mui/material";
import { Fragment, ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

const fieldSizeHeightMap = {
  small: "3.928rem",
  medium: "4.2rem",
  large: "4.6rem",
};

interface SearchableSelectMultipleProps {
  sx?: SxProps;
  name: string;
  label?: string;
  options: any[];
  required?: boolean;
  noOptionsText?: string;
  limitTags?: number;
  placeholder?: string;
  freeSolo?: boolean;
  endAdornment?: ReactNode;
  onChangeHandler?: (
    event: any,
    newValue: any,
    onChange: (value: any) => void
  ) => void;
  onBlurHandler?: (
    event: any,
    newValue: any,
    onChange: (value: any) => void
  ) => void;
  isOptionEqualToValue?: (option: any, newValue: any) => boolean;
  getOptionLabel?: (option: any) => string;
  groupBy?: (option: any) => string;
  size?: "small" | "medium";
  other?: Record<string, any>;
  value?: any;
  disabled?: boolean;
  renderTags?: (tagValue: any, getTagProps: any) => ReactNode;
  fieldSize?: "small" | "medium" | "large";
}

export default function SearchableSelectMultiple({
  name,
  label,
  options,
  required = false,
  noOptionsText = "Nothing in the List",
  placeholder,
  limitTags = 1,
  freeSolo = false,
  endAdornment = false,
  onChangeHandler,
  onBlurHandler,
  isOptionEqualToValue = (option, newValue) => option?._id === newValue?._id,
  getOptionLabel = (option) => option?.replaceAll?.("_", " "),
  groupBy,
  disabled = false,
  renderTags = (tagValue: any, getTagProps: any) => {
    return (
      <Stack direction="row" flexWrap="wrap" gap="0.35rem" sx={{ width: "100%" }}>
        {tagValue.map((option: any, index: number | string) => (
          <Chip
            {...getTagProps({ index })}
            key={option?._id || option?.id}
            label={getOptionLabel(option)}
            sx={{
              borderRadius: 1,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          />
        ))}
      </Stack>
    );
  },
  fieldSize = "small",
  ...other
}: SearchableSelectMultipleProps) {
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
          <Stack gap="0.6rem" sx={{ width: "100%" }}>
            {label && (
              <CustomLabel label={label} required={required} error={error} />
            )}
            <Autocomplete
              sx={{
                "& .MuiAutocomplete-tag": {
                  maxWidth: "100%",
                  whiteSpace: "normal",
                },
                "& .MuiAutocomplete-inputRoot": {
                  flexWrap: "wrap",
                },
              }}
              disabled={disabled}
              freeSolo={freeSolo}
              id={name}
              limitTags={limitTags}
              multiple
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              options={options ?? []}
              onChange={(e, newValue) => onChanged(e, newValue, onChange)}
              onBlur={(e) => onBlurHandler?.(e, value, onChange)}
              autoComplete
              noOptionsText={noOptionsText}
              {...(groupBy && { groupBy })}
              value={value || []}
              renderTags={renderTags}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              disableCloseOnSelect
              slotProps={{
                paper: {
                  sx: {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={option?._id || option?.id || key} {...rest}>
                    {/* <Checkbox checked={selected} /> */}
                    <ListItemText
                      primary={getOptionLabel(option)}
                      sx={{ color: "text.primary" }}
                    />
                  </li>
                );
              }}
              {...other}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={placeholder}
                  error={Boolean(error)}
                  helperText={error?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      minHeight: fieldSizeHeightMap[fieldSize as keyof typeof fieldSizeHeightMap],
                    },
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
