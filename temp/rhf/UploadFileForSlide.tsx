"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  FormHelperText,
  LinearProgress,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { UploadFolderIcon } from "../icons";
import { CustomLabel } from "../custom-label";

interface UploadFileForSlideProps {
  name: string;
  accept?: string;
  labelText?: string;
  subLabelText?: string;
  label?: string;
  required?: boolean;
}

export default function UploadFileForSlide({
  name,
  accept = "image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel",
  labelText = "Drag and drop files here, or click to select files",
  subLabelText,
  label,
  required = false,
}: UploadFileForSlideProps) {
  const { control, watch } = useFormContext();
  const selectedFile: File | null = watch(name) || null;

  const [isDragging, setIsDragging] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const theme = useTheme();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      onChange(file);
      setCurrentPreview(file);
      setUploadProgress(0); // Reset progress when new file is selected
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    onChange: (value: File | null) => void,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      onChange(file);
      setCurrentPreview(file);
      setUploadProgress(0); // Reset progress when new file is dropped
    }
  };

  const handleRemoveFile = (onChange: (value: File | null) => void) => {
    onChange(null);
    setCurrentPreview(null);
    setUploadProgress(0); // Reset progress when file is removed
  };

  const getPreviewUrl = (file: File) => {
    if (
      file.type.startsWith("image/") ||
      file.type.startsWith("video/") ||
      file.type.startsWith("audio/")
    ) {
      return URL.createObjectURL(file);
    }
    return "";
  };

  useEffect(() => {
    if (selectedFile instanceof File) {
      setCurrentPreview(selectedFile);
    }
  }, [selectedFile]);

  // Simulate upload progress when a file is selected
  useEffect(() => {
    if (currentPreview) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Increase progress by random increments for realistic effect
          const increment = Math.random() * 15 + 5; // Between 5 and 20
          return Math.min(prev + increment, 100);
        });
      }, 200); // Update every 200ms

      return () => clearInterval(interval);
    } else {
      setUploadProgress(0);
    }
  }, [currentPreview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box>
          {label && (
            <CustomLabel label={label} required={required} error={error} />
          )}

          {/* Drag & Drop Area - Always visible */}
          <Box
            sx={{
              border: `1px dashed ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
              backgroundColor: isDragging
                ? theme.palette.grey[100]
                : theme.palette.common.white,
              transition: "background-color 0.3s",
              cursor: "pointer",
              mb: currentPreview || selectedFile ? 2 : 0,
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, onChange)}
          >
            <label
              htmlFor={name}
              style={{ cursor: "pointer", display: "block" }}
            >
              <input
                type="file"
                accept={accept}
                style={{ display: "none" }}
                id={name}
                onChange={(e) => handleFileChange(e, onChange)}
              />
              <UploadFolderIcon />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {labelText}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                {subLabelText}
              </Typography>
            </label>
          </Box>

          {error && <FormHelperText error>{error.message}</FormHelperText>}

          {/* File Preview - Shown below drag & drop area when file is selected */}
          {(currentPreview || selectedFile) && (
            <Box
              sx={{
                width: "100%",
                maxWidth: "100%",
                minHeight: "83px",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "grayscale.200",
                padding: "11px 16px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              {/* Upload Icon */}
              <Box
                sx={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <UploadFolderIcon />
              </Box>

              {/* File Details */}
              <Box
                sx={{
                  flex: 1,
                  minHeight: "44px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="textMdMedium"
                  color="grayscale.900"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentPreview?.name || "Document 1"}
                </Typography>
                <Typography variant="textXs" color="grayscale.600">
                  File Format:{" "}
                  {(() => {
                    if (!currentPreview) return "PNG";
                    const ext = currentPreview.name
                      .split(".")
                      .pop()
                      ?.toUpperCase();
                    if (currentPreview.type.includes("pdf")) return "PDF";
                    if (currentPreview.type.includes("png")) return "PNG";
                    if (
                      currentPreview.type.includes("jpeg") ||
                      currentPreview.type.includes("jpg")
                    )
                      return "JPG";
                    return ext || "FILE";
                  })()}{" "}
                  File Size:{" "}
                  {currentPreview
                    ? (currentPreview.size / (1024 * 1024)).toFixed(2) + "MB"
                    : "12MB"}
                </Typography>
              </Box>

              {/* Delete Icon */}
              <IconButton
                onClick={() => handleRemoveFile(onChange)}
                sx={{
                  color: "error.main",
                  flexShrink: 0,
                  ml: "auto",
                }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>

              {/* Progress Bar */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "11px",
                  left: "16px",
                  right: "16px",
                  height: "4px",
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: "4px",
                    borderRadius: "2px",
                    "&.MuiLinearProgress-root": {
                      backgroundColor: "#E5E7EB",
                    },
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#9333EA",
                      borderRadius: "2px",
                      transition: "transform 0.2s linear",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    />
  );
}
