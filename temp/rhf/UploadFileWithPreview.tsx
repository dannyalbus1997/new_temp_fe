"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Box, FormHelperText, Stack, TypographyOwnProps } from "@mui/material";
import React, { JSX } from "react";
import { UploadSingleFile } from "../upload-file";
import { CustomLabel } from "../custom-label";
import { UploadFolderIcon } from "../icons";
import { MAX_FILES_SIZE } from "@shared/utils";

interface UploadSingleFileWithPreviewProps {
  name: string;
  label?: string;
  supportedFormats?: string;
  showUploadButton?: boolean;
  showIcon?: boolean;
  required?: boolean;
  error?: boolean;
  dragText?: string;
  dragTextColor?: string;
  dragTextVariant?: TypographyOwnProps["variant"];
  accept: Record<string, string[]>;
  buttonVariant?: boolean;
  upLoadFileIcon?: JSX.Element;
  disabled?: boolean;
  previewImage?: any;
  maxFileSize?: number;
  onBlurHandler?: (file: File) => void;
  otherTitle?: any;
}

export default function UploadSingleFileWithPreview({
  name,
  label,
  supportedFormats,
  required = false,
  showIcon,
  dragTextColor,
  dragTextVariant,
  buttonVariant = false,
  upLoadFileIcon = <UploadFolderIcon />,
  maxFileSize = MAX_FILES_SIZE.GLOBAL_MAX_SIZE,
  otherTitle = false,
  ...other
}: UploadSingleFileWithPreviewProps): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = Boolean(error) && !field.value;

        return (
          <>
            <Stack gap="0.6rem">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {label && (
                  <CustomLabel
                    label={label}
                    required={required}
                    error={error}
                  />
                )}
                {otherTitle && otherTitle}
              </Box>
              <UploadSingleFile
                file={field.value}
                error={hasError}
                onChange={(file) => {
                  field.onChange(file);
                  other?.onBlurHandler?.(file);
                }}
                dragTextVariant={dragTextVariant}
                dragTextColor={dragTextColor}
                buttonVariant={buttonVariant}
                upLoadFileIcon={upLoadFileIcon}
                maxFileSize={maxFileSize}
                {...other}
              />
              <FormHelperText error>{error?.message}</FormHelperText>
            </Stack>
          </>
        );
      }}
    />
  );
}
