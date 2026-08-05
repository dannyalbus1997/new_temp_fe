"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Box,
  InputAdornment,
  Popover,
  TextField,
  useTheme,
} from "@mui/material";
import { JSX, useState } from "react";
import { CustomLabel } from "../custom-label";
import { TextFieldProps } from "@mui/material";
import { StyledDateRangePicker } from "./rhf.styles";
import { DateRangeIcon } from "../icons";
import { DATE_TIME_FORMATS, otherDateFormat, pxToRem } from "@shared/utils";
import { Button } from "../buttons";
import CloseIcon from "@mui/icons-material/Close";

interface DateRangePickerProps {
  name: string;
  label: string;
  variant?: TextFieldProps["variant"];
  required?: boolean;
  size?: "small" | "medium";
  fullWidth?: boolean;
  selectionRange?: {
    startDate: Date | null;
    endDate: Date | null;
    key: "selection";
  };
  hasSubmitButton?: boolean;
  disableSubmitButton?: boolean;
  handleSubmitButton?: () => void;
  cancelBtnEffect?: () => void;
  placeholder?: string;
  [key: string]: any;
}

export const DATE_FORMAT = {
  UI: "MM/DD/YYYY",
  API: "YYYY-MM-DD",
};

export default function RHFDateRangePicker(
  props: DateRangePickerProps,
): JSX.Element {
  const {
    name,
    label,
    variant = "outlined",
    selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
    hasSubmitButton = false,
    disableSubmitButton = false,
    handleSubmitButton = undefined,
    placeholder = "Select Date Range",
    cancelBtnEffect = undefined,
    ...other
  } = props;

  const { control, setValue } = useFormContext();

  const theme = useTheme();

  const [anchorElDate, setAnchorElDate] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDate(event?.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  const handleClear = () => {
    setValue(name, {
      startDate: null,
      endDate: null,
      key: "selection",
    });
    if (handleSubmitButton) {
      handleSubmitButton?.();
    }
    cancelBtnEffect?.();
  };

  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? "simple-popover" : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { startDate, endDate } = field?.value || {};

        const displayValue =
          startDate && endDate
            ? `${otherDateFormat(startDate, DATE_TIME_FORMATS?.DD_MM_YYYY_FORWARD_SLASH)} - ${otherDateFormat(endDate, DATE_TIME_FORMATS?.DD_MM_YYYY_FORWARD_SLASH)}`
            : "";

        return (
          <>
            {label && (
              <CustomLabel
                label={label}
                required={other?.required}
                error={error}
              />
            )}
            <TextField
              fullWidth
              variant={variant}
              helperText={error?.message}
              value={displayValue}
              placeholder={placeholder}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {displayValue && (
                      <CloseIcon
                        sx={{
                          color: "text.secondary",
                          cursor: "pointer",
                          fontSize: pxToRem(20),
                          "&:hover": {
                            color: "text.primary",
                          },
                        }}
                        onClick={handleClear}
                      />
                    )}
                    <Box
                      sx={{ cursor: "pointer", mt: 0.5 }}
                      onClick={(e: any) => {
                        handleClickDate?.(e);
                      }}
                    >
                      <DateRangeIcon iconColor={theme.palette.grayscale[800]} />
                    </Box>
                  </InputAdornment>
                ),
              }}
              {...other}
            />
            <Popover
              id={idDate}
              open={openDate}
              anchorEl={anchorElDate}
              onClose={handleCloseDate}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <StyledDateRangePicker>
                <DateRange
                  {...field}
                  {...other}
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  ranges={[field?.value ? field?.value : selectionRange]}
                  color={theme?.palette?.primary?.main}
                  rangeColors={[theme?.palette?.primary?.main]}
                  onChange={(item: any) => {
                    setValue(name, item?.selection);
                  }}
                />
              </StyledDateRangePicker>
              {hasSubmitButton && (
                <Box textAlign={"right"} mb={2} px={2}>
                  <Button
                    variant="contained"
                    disabled={disableSubmitButton}
                    onClick={() => {
                      handleSubmitButton?.();
                      handleCloseDate();
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Popover>
          </>
        );
      }}
    />
  );
}
