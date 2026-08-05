"use client";

import React, { Fragment, JSX, ReactNode } from "react";
import { Controller } from "react-hook-form";
import {
  useTheme,
  TextField,
  Autocomplete,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

interface SearchableSelectAsyncProps {
  name: string;
  label?: string;
  apiQuery: any;
  queryKey?: string;
  debounceTime?: number;
  required?: boolean;
  getOptionLabel?: (option: any) => string;
  /** Optional hook to filter/map options returned from the API before rendering. */
  transformOptions?: (options: any[]) => any[];
  variant?: "outlined" | "filled" | "standard";
  placeholder?: string;
  noOptionsText?: string;
  externalParams?: Record<string, any>;
  freeSolo?: boolean;
  endAdornment?: ReactNode;
  onChangeHandler?: (
    event: any,
    newValue: any,
    onChange: (value: any) => void
  ) => void;
  isOptionEqualToValue?: (option: any, newValue: any) => boolean;
  groupBy?: (option: any) => string;
  renderOption?: (props: any, option: any) => JSX.Element;
  size?: "small" | "medium";
  slotProps?: Record<string, any>;
  other?: Record<string, any>;
  customOnChangeHandler?: any;
  disabled?: boolean;
  getOptionDisabled?: (option: any) => boolean;
  /** When false, do not trigger API on dropdown open (only on input/search). Use when opening should not cause a fetch. */
  triggerOnOpen?: boolean;
}

export default function SearchableSelectAsync({
  name,
  label,
  apiQuery,
  queryKey = "search",
  debounceTime = 500,
  required = false,
  getOptionLabel = (option: any) => option?.name,
  transformOptions,
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
  renderOption,
  customOnChangeHandler = undefined,
  disabled = false,
  getOptionDisabled,
  triggerOnOpen = true,
  slotProps = {},
  ...other
}: SearchableSelectAsyncProps) {
  const theme: any = useTheme();
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;
  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);

  // Transform response to extract array from nested structures
  const getOptionsArray = (responseData: any): any[] => {
    if (Array.isArray(responseData)) {
      return responseData;
    }
    // Handle nested structure: { data: { records: [...] } }
    if (
      responseData?.data?.records &&
      Array.isArray(responseData.data.records)
    ) {
      return responseData.data.records;
    }
    // Handle alternative structure: { records: [...] }
    if (responseData?.records && Array.isArray(responseData.records)) {
      return responseData.records;
    }
    return [];
  };

  const optionsArray = getOptionsArray(data);
  const transformedOptionsArray = transformOptions
    ? transformOptions(optionsArray)
    : optionsArray;

  // Debug logging
  useEffect(() => {
    if (data !== undefined) {
      console.log("SearchableSelectAsync - data received:", data);
      console.log(
        "SearchableSelectAsync - data is array:",
        Array.isArray(data)
      );
      console.log("SearchableSelectAsync - optionsArray:", optionsArray);
      if (transformOptions) {
        console.log(
          "SearchableSelectAsync - transformedOptionsArray:",
          transformedOptionsArray
        );
      }
    }
  }, [data, optionsArray, transformOptions, transformedOptionsArray]);

  const triggerWithDebounce = useCallback(
    (newInputValue: string) => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      const timeout = setTimeout(() => {
        trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
      }, debounceTime);
      setDebounceTimeout(timeout);
    },
    [debounceTimeout, queryKey, externalParams, debounceTime, trigger]
  );

  const onChanged = useCallback((e: any, newValue: any, onChange: any) => {
    if (customOnChangeHandler) {
      customOnChangeHandler?.(e, newValue, onChange);
      return;
    }
    onChangeHandler?.(e, newValue, onChange);
    onChange(newValue);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);

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
            onOpen={() => {
              setOpen(true);
              if (triggerOnOpen) {
                trigger({ params: { ...externalParams } });
              }
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={isLoading || isFetching ? [] : transformedOptionsArray}
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
            getOptionDisabled={getOptionDisabled}
            slotProps={{
              paper: {
                sx: {
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                },
              },
              ...(slotProps || {}),
            }}
            {...other}
            onInputChange={(event, newInputValue) => {
              triggerWithDebounce(newInputValue);
            }}
            renderOption={
              renderOption
                ? renderOption
                : (props, option: any) => {
                    return (
                      <li {...props} key={option?._id ?? option?.id}>
                        {getOptionLabel(option)}
                      </li>
                    );
                  }
            }
            renderInput={(params) => (
              <Stack gap="0.6rem">
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
                    ...((slotProps?.input as any)?.sx || {}),
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
                          {params?.InputProps?.endAdornment}
                        </Fragment>
                      ),
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
