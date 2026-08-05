"use client";

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
  Grid2,
} from "@mui/material";

interface Option {
  label: string;
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
}

interface RHFMultiCheckboxProps {
  md?: number;
  required?: boolean;
  label?: string;
  name: string;
  options: Option[];
  [key: string]: unknown;
}

export default function RHFMultiCheckbox({
  md = 6,
  required,
  label,
  name,
  options,
  ...other
}: RHFMultiCheckboxProps) {
  const { control, setValue, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => {
        const onSelected = (option: Option): (string | number)[] => {
          const selectedValues: (string | number)[] = Array.isArray(
            field?.value,
          )
            ? field.value
            : [];
          if (selectedValues.includes(option.value)) {
            return selectedValues.filter((value) => value !== option.value);
          } else {
            return [...selectedValues, option.value];
          }
        };

        useEffect(() => {
          if (
            options.length === 0 ||
            typeof options[0]?.checked === "undefined"
          ) {
            return;
          }

          const currentValues: (string | number)[] = getValues(name) || [];
          const initialSelected: (string | number)[] = options
            .filter((option) => option.checked)
            .map((option) => option.value);

          const updatedValues = Array.from(
            new Set([...currentValues, ...initialSelected]),
          );
          setValue(name, updatedValues, { shouldValidate: true });
        }, [options, getValues, name, setValue]);

        return (
          <Stack gap="0.6rem">
            {label && (
              <CustomLabel label={label} required={required} error={error} />
            )}
            <FormGroup>
              <Grid2 container>
                {options.map((option) => (
                  <Grid2 size={{ xs: 12, md: md }} key={option.value}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            Array.isArray(field?.value) &&
                            field.value.includes(option.value)
                          }
                          onChange={() => field?.onChange(onSelected(option))}
                          disabled={option.disabled}
                        />
                      }
                      label={option.label}
                      {...other}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </FormGroup>
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </Stack>
        );
      }}
    />
  );
}
