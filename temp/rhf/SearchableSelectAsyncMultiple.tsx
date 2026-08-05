"use client";

import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
  useTheme,
  Stack,
} from "@mui/material";
import { debounce } from "lodash";
import React, { Fragment, JSX, ReactNode, useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

interface SearchableSelectAsyncProps {
  name: string;
  label?: string;
  apiQuery: any;
  queryKey?: string;
  debounceTime?: number;
  required?: boolean;
  limitTags?: number;
  getOptionLabel?: (option: any) => string;
  variant?: "outlined" | "filled" | "standard";
  placeholder?: string;
  noOptionsText?: string;
  externalParams?: Record<string, any>;
  freeSolo?: boolean;
  endAdornment?: ReactNode;
  onChangeHandler?: (
    event: any,
    newValue: any,
    onChange: (value: any) => void,
  ) => void;
  isOptionEqualToValue?: (option: any, newValue: any) => boolean;
  groupBy?: (option: any) => string;
  renderOption?: (...args: any) => JSX.Element;
  size?: "small" | "medium";
  other?: Record<string, any>;
  transformResponse?: (response: any) => any;
  EndIcon?: any;
  startIcon?: any;
  hasCheckbox?: boolean;
  disabled?: boolean;
}

export default function SearchableSelectAsyncMultiple({
  name,
  label,
  apiQuery,
  queryKey = "search",
  debounceTime = 500,
  required = false,
  limitTags = 3,
  getOptionLabel = (option: any) => option?.name,
  variant = "outlined",
  placeholder,
  noOptionsText = "Nothing in the List",
  externalParams = {},
  freeSolo = false,
  endAdornment = false,
  onChangeHandler,
  isOptionEqualToValue = (option: any, newValue: any) =>
    option?._id === newValue?._id,
  groupBy = (option) => option?.groupBy,
  hasCheckbox = false,
  renderOption = (props: any, option: any, { selected }: any) => {
    return (
      <li {...props} key={option?._id ?? option?.id}>
        {hasCheckbox && (
          <Checkbox
            key={option?._id ?? option?.id}
            style={{ marginRight: 8 }}
            checked={selected}
          />
        )}
        {getOptionLabel(option)}
      </li>
    );
  },
  transformResponse = (res: any) => {
    if (Array.isArray(res)) {
      return res;
    }
    return [];
  },
  EndIcon,
  startIcon,
  disabled = false,
  ...other
}: SearchableSelectAsyncProps) {
  const theme: any = useTheme();
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;

  const apiData = transformResponse(data) ?? [];
  // debounce
  const triggerDebounce = debounce((newInputValue) => {
    trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
  }, debounceTime);

  const onChanged = useCallback((e: any, newValue: any, onChange: any) => {
    onChangeHandler?.(e, newValue, onChange);
    onChange(newValue);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Autocomplete
            disabled={disabled}
            freeSolo={freeSolo}
            id={name}
            open={open}
            limitTags={limitTags}
            multiple
            onOpen={() => {
              setOpen(true);
              trigger({ params: { ...externalParams } });
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={apiData ?? []}
            autoComplete
            noOptionsText={noOptionsText}
            groupBy={groupBy}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            loading={isLoading || isFetching}
            includeInputInList
            {...form?.field}
            onChange={(e: React.SyntheticEvent, newValue: any) => {
              onChanged(e, newValue, form?.field?.onChange);
              setOpen(false);
            }}
            slotProps={{
              paper: {
                sx: {
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
            {...other}
            onInputChange={(event, newInputValue) => {
              triggerDebounce.cancel();
              if (newInputValue.trim()) triggerDebounce(newInputValue);
            }}
            renderOption={renderOption}
            renderInput={(params) => (
              <Stack gap="0.6rem" >
                {label && (
                  <CustomLabel
                    label={label}
                    required={required}
                    error={form?.fieldState?.error}
                  />
                )}
                <TextField
                  {...params}
                  label={""}
                  placeholder={placeholder}
                  sx={{
                    mt: 0.5,
                    ".MuiAutocomplete-input": {
                      color: "text.primary",
                    },
                    ".MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                      color: "text.secondary",
                      width: "1.5em",
                      height: "1.5em",
                    },
                  }}
                  error={Boolean(form?.fieldState?.error)}
                  helperText={form?.fieldState?.error?.message}
                  variant={variant}
                  slotProps={{
                    input: {
                      ...params?.InputProps,
                      endAdornment: (
                        <Fragment>
                          {isLoading || isFetching ? (
                            <CircularProgress
                              sx={{ color: "text.secondary" }}
                              size={20}
                            />
                          ) : null}
                          {EndIcon ?? params.InputProps.endAdornment}
                        </Fragment>
                      ),
                      startAdornment:
                        startIcon ?? params.InputProps.startAdornment,
                    },
                  }}
                />
              </Stack>
            )}
          />
        );
      }}
    />
  );
}
