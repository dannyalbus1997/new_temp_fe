"use client";

import React, { ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Box,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useTheme,
  FormHelperText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UploadFolderIcon } from "../icons";
import { CustomLabel } from "../custom-label";
import { errorSnackbar } from "@shared/utils";

interface FilesUploadProps {
  name: string;
  accept?: string;
  limit?: number;
  icons?: ReactNode;
  labelText?: string;
  subLabelText?: string;
  label?: string;
  required?: boolean;
}

export default function FilesUpload({
  name,
  accept = "image/*,video/*,application/pdf",
  limit = 3,
  icons = <UploadFolderIcon />,
  labelText = "Drag and drop files here, or click to select files",
  subLabelText,
  label,
  required = false,
}: FilesUploadProps) {
  const { control, watch } = useFormContext();

  const selectedFiles: File[] = Array.isArray(watch(name)) ? watch(name) : [];

  const [isDragging, setIsDragging] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<File | null>(null);
  const theme = useTheme();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void,
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > limit) {
      errorSnackbar(
        `Up to ${limit} media files are allowed, additional files will be discarded.`,
      );
    }
    const updatedFiles = [...selectedFiles, ...files].slice(0, limit);

    onChange(updatedFiles);

    if (!currentPreview && updatedFiles.length > 0) {
      setCurrentPreview(updatedFiles[0]);
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
    onChange: (value: File[]) => void,
  ) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const updatedFiles = [...selectedFiles, ...files].slice(0, limit);

    onChange(updatedFiles);

    if (!currentPreview && updatedFiles.length > 0) {
      setCurrentPreview(updatedFiles[0]);
    }
  };

  const handleRemoveFile = (
    index: number,
    onChange: (value: File[]) => void,
  ) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    onChange(updatedFiles);

    if (currentPreview === selectedFiles[index]) {
      setCurrentPreview(updatedFiles[0] || null);
    }
  };

  // Store object URLs to revoke them later
  const [objectURLs, setObjectURLs] = useState<Map<File, string>>(new Map());

  const renderPreview = (file: File & { preview?: string }) => {
    if (file.preview) return file.preview;

    if (
      file instanceof File &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      if (!objectURLs.has(file)) {
        const url = URL.createObjectURL(file);
        setObjectURLs((prev) => new Map(prev).set(file, url));
        return url;
      }
      return objectURLs.get(file) || "";
    }

    return "";
  };

  // Use useRef to avoid infinite loops
  const objectURLsRef = React.useRef<Map<File, string>>(new Map());

  // Update ref when objectURLs changes
  React.useEffect(() => {
    objectURLsRef.current = objectURLs;
  }, [objectURLs]);

  // Clean up object URLs when files change
  React.useEffect(() => {
    // Get current files
    const currentFiles = new Set(selectedFiles);

    // Clean up URLs for files that are no longer selected
    const urlsToCleanup: string[] = [];
    objectURLsRef.current.forEach((url, file) => {
      if (!currentFiles.has(file)) {
        urlsToCleanup.push(url);
        objectURLsRef.current.delete(file);
      }
    });

    // Revoke URLs for removed files
    urlsToCleanup.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }, [selectedFiles]);

  // Clean up all URLs on unmount
  React.useEffect(() => {
    return () => {
      objectURLsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      objectURLsRef.current.clear();
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && (
            <CustomLabel label={label} required={required} error={error} />
          )}
          <Box
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
              backgroundColor: isDragging
                ? theme.palette.grey[900]
                : theme.palette.common.white,
              transition: "background-color 0.3s, border-color 0.3s",
              cursor: "pointer",
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
                multiple
                style={{ display: "none" }}
                id={name}
                onChange={(e) => handleFileChange(e, onChange)}
              />
              <Stack direction="column" alignItems="center" gap={1}>
                {icons}
                <Typography
                  variant="textSmMedium"
                  color="grayscale.800"
                  sx={{ mt: 2 }}
                >
                  {labelText}
                </Typography>
                <Typography
                  variant="textXs"
                  color="grayscale.500"
                  sx={{ mt: 2 }}
                >
                  {subLabelText}
                </Typography>
              </Stack>
            </label>
          </Box>

          {error && <FormHelperText error>{error.message}</FormHelperText>}

          {currentPreview && (
            <Box sx={{ mt: 4 }}>
              {currentPreview && currentPreview.type.startsWith("image/") && (
                <Box
                  component="img"
                  src={renderPreview(currentPreview)}
                  alt={currentPreview.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
              )}

              {currentPreview.type.startsWith("video/") && (
                <Box
                  component="video"
                  controls
                  src={renderPreview(currentPreview) || ""}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
              )}
            </Box>
          )}

          {selectedFiles.length > 0 && (
            <ImageList
              sx={{ display: "flex", overflowX: "auto", gap: 2 }}
              cols={selectedFiles.length}
              rowHeight={100}
            >
              {selectedFiles.map((file, index) => (
                <ImageListItem key={index}>
                  {file.type.startsWith("image/") ? (
                    <img
                      src={renderPreview(file)}
                      alt={file.name}
                      onClick={() => setCurrentPreview(file)}
                      style={{
                        cursor: "pointer",
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border:
                          file === currentPreview
                            ? `3px solid ${theme.palette.primary.main}`
                            : "none",
                        borderRadius: "4px",
                      }}
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={renderPreview(file)}
                      onClick={() => setCurrentPreview(file)}
                      style={{
                        cursor: "pointer",
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border:
                          file === currentPreview
                            ? `3px solid ${theme.palette.primary.main}`
                            : "none",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: theme.palette.grey[800],
                        borderRadius: "4px",
                        cursor: "pointer",
                        border:
                          file === currentPreview
                            ? `3px solid ${theme.palette.primary.main}`
                            : "none",
                      }}
                      onClick={() => setCurrentPreview(file)}
                    >
                      <Typography variant="caption">File</Typography>
                    </Box>
                  )}
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        onClick={() => handleRemoveFile(index, onChange)}
                        edge="end"
                        aria-label="delete"
                        sx={{ color: theme.palette.common.white }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          </Stack>
      )}
    />
  );
}
