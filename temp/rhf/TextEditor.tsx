"use client";
import { useFormContext, Controller } from "react-hook-form";
import { Box, FormHelperText, Stack } from "@mui/material";
import { CustomLabel } from "../custom-label";
import { ReactQuill } from "../";

export default function RHFEditor({
  name,
  required,
  disabled,
  allowAttachments,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {other?.label && (
            <CustomLabel
              label={other?.label}
              required={required}
              error={error}
            />
          )}
          <Box position="relative">
            <ReactQuill
            id={`${name}-editor`}
            name={name}
            value={field?.value}
            onChange={field?.onChange}
            error={!!error}
            readOnly={disabled}
            allowAttachments={allowAttachments}
            {...other}
          />

            <FormHelperText error>{error?.message}</FormHelperText>
          </Box>
        </Stack>
      )}
    />
  );
}
