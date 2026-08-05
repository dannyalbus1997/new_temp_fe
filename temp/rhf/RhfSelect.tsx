"use client";

import { ListSubheader, MenuItem, Stack, TextField } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

type SelectOption = string | { label: string; value: string };
type GroupedSelectOption = { label: string; options: SelectOption[] };

const fieldSizeHeightMap = {
  small: "3.928rem",
  medium: "4.2rem",
  large: "4.6rem",
};

interface RHFSelectProps {
  name: string;
  outerLabel?: string;
  labelSx?: SxProps<Theme>;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  options?: SelectOption[];
  groupedOptions?: GroupedSelectOption[];
  required?: boolean;
  fieldSize?: "small" | "medium" | "large";
  [key: string]: any;
}

const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  outerLabel,
  labelSx,
  placeholder = "Select Option",
  startIcon,
  endIcon,
  options = [],
  groupedOptions,
  required = false,
  fieldSize = "small",
  ...other
}) => {
  const { control } = useFormContext();
  const theme = useTheme();

  const { sx: callerSx, ...restOther } = other as any;

  const groupedMenuProps = groupedOptions
    ? {
        PaperProps: {
          sx: {
            bgcolor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            mt: 0.5,
            "& .MuiMenuItem-root": {
              fontSize: "1.3rem", color: "text.primary", py: 0.75,
              "&:hover": { bgcolor: "action.hover" },
              "&.Mui-selected": {
                bgcolor: alpha(theme.palette.gold[500], 0.12), color: "text.primary",
                "&:hover": { bgcolor: alpha(theme.palette.gold[500], 0.18) },
              },
            },
            "& .MuiListSubheader-root": {
              fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.06em",
              color: theme.palette.gold[600], bgcolor: "background.paper", lineHeight: "2.6rem",
              textTransform: "uppercase",
            },
          },
        },
      }
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {outerLabel && (
            <CustomLabel label={outerLabel} required={required} error={error} sx={labelSx} />
          )}
          <TextField
            {...field}
            select
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: endIcon ?? "",
                startAdornment: startIcon ?? "",
              },
              select: {
                native: false,
                displayEmpty: true,
                ...(groupedMenuProps ? { MenuProps: groupedMenuProps } : {}),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: fieldSizeHeightMap[fieldSize],
                overflow: "hidden",
                fontSize: "1.3rem",
                "& .MuiSvgIcon-root": { color: "text.disabled" },
              },
              ...callerSx,
            }}
            {...restOther}
            value={field.value ? field.value : ""}
          >
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
            {groupedOptions
              ? groupedOptions.flatMap((group) => [
                  <ListSubheader key={`hdr-${group.label}`}>{group.label}</ListSubheader>,
                  ...group.options.map((opt) =>
                    typeof opt === "string" ? (
                      <MenuItem key={opt} value={opt} sx={{ pl: 3 }}>
                        {opt}
                      </MenuItem>
                    ) : (
                      <MenuItem key={opt.value} value={opt.value} sx={{ pl: 3 }}>
                        {opt.label}
                      </MenuItem>
                    ),
                  ),
                ])
              : options.map((option) =>
                  typeof option === "string" ? (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ) : (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ),
                )}
          </TextField>
        </Stack>
      )}
    />
  );
};

export default RHFSelect;
