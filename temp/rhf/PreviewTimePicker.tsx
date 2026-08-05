"use client";

import React, { Fragment, ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StaticTimePicker, TimeView } from "@mui/x-date-pickers";
import { Box, Typography, useTheme, Theme, Stack } from "@mui/material";
import { CustomLabel } from "../custom-label";
import { DayjsI, nowDate } from "@shared/utils";
import { useState } from "react";

interface TimePickerProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  endAdornment?: ReactNode;
  onChangeHandler?: (
    event: React.ChangeEvent<unknown>,
    newValue: DayjsI | null,
    onChange: (value: DayjsI | null) => void,
  ) => void;
  size?: "small" | "medium";
  other?: Record<string, unknown>;
}

export default function ReusableTimePicker({
  name,
  label,
  required = false,
  placeholder,
  endAdornment = false,
  onChangeHandler,
  size = "medium",
  ...other
}: TimePickerProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<TimeView>("hours");
  const [activeElement, setActiveElement] = useState<
    "hours" | "minutes" | "period" | null
  >("hours");
  const theme = useTheme<Theme>();

  const baseStyle = {
    marginRight: "4px",
    padding: "18px",
    cursor: "pointer",
    borderRadius: "8px",
  };

  const getBoxStyle = (
    activeElement: string | null,
    element: string,
    theme: Theme,
  ) => ({
    ...baseStyle,
    boxShadow:
      activeElement === element
        ? `12px 0px 12px -5px ${theme?.palette?.common?.primaryShadow}, -12px 0px 12px -5px ${theme?.palette?.common?.primaryShadow}`
        : "none",
    color:
      activeElement === element
        ? theme.palette.text.secondary
        : theme.palette.text.primary,
  });

  const getStaticTimePickerStyles = (theme: Theme) => ({
    "& .MuiClock-squareMask": {
      backgroundColor: theme.palette.common.white,
    },
    "& .MuiPickersArrowSwitcher-root": {
      display: "none",
    },
    "& .MuiClock-pin": {
      display: "none",
    },
    "& .MuiClockPointer-root": {
      display: "none",
    },
    "& .MuiClock-meridiemText": {
      fontSize: "14px",
      lineHeight: 1.4,
    },
    "& .MuiPickersToolbarText-root": {
      padding: "18px",
    },
    "& .MuiTimePickerToolbar-separator": {
      display: "none",
    },
    "& .MuiClockNumber-root": {
      transition: "background-color 0.3s ease, transform 0.2s ease",
      fontSize: "14px",
      borderRadius: "50%",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.common.white} !important`,
        transform: "scale(1.1)",
      },
    },
    "& .Mui-selected": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.common.white} !important`,
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const displayTime = value || nowDate();
        const formattedTime = displayTime.format("hh:mm A");
        const [hours, minutes, period] = formattedTime.split(/[: ]/);

        const onChanged = (
          e: React.ChangeEvent<unknown> | null,
          newValue: DayjsI | null,
        ) => {
          if (e && onChangeHandler) {
            onChangeHandler(e, newValue, onChange);
          }

          const cleanedValue = newValue
            ? newValue.second(0).millisecond(0)
            : nowDate().second(0).millisecond(0);

          onChange(cleanedValue);

          if (view === "hours") {
            setActiveElement("hours");
            setView("minutes");
          } else if (view === "minutes") {
            setActiveElement("minutes");
          } else if (
            newValue &&
            value &&
            newValue.format("A") !== value.format("A")
          ) {
            setActiveElement("period");
          }
        };

        const resetTimePicker = (newView: TimeView) => {
          setView(newView);
          setOpen(false);
          setTimeout(() => setOpen(true), 0);
        };

        return (
          <Stack gap="0.6rem">
            {label && (
              <CustomLabel label={label} required={required} error={error} />
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: "18px",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                <Box
                  component="span"
                  sx={getBoxStyle(activeElement || "hours", "hours", theme)}
                  onClick={() => {
                    setActiveElement("hours");
                    resetTimePicker("hours");
                  }}
                >
                  {hours}
                </Box>
                <Box
                  component="span"
                  sx={getBoxStyle(activeElement || "minutes", "minutes", theme)}
                  onClick={() => {
                    setActiveElement("minutes");
                    resetTimePicker("minutes");
                  }}
                >
                  {minutes}
                </Box>
                <Box
                  component="span"
                  sx={getBoxStyle(activeElement || "period", "period", theme)}
                  onClick={() => {
                    setActiveElement("period");
                  }}
                >
                  {period}
                </Box>
              </Typography>
            </Box>
            {open && (
              <StaticTimePicker
                displayStaticWrapperAs="desktop"
                ampm
                view={view}
                onViewChange={(newView) => setView(newView)}
                sx={getStaticTimePickerStyles(theme)}
                value={displayTime}
                onChange={(newValue) => onChanged(null, newValue)}
              />
            )}
          </Stack>
        );
      }}
    />
  );
}
