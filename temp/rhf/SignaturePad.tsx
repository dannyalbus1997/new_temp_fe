"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { Box, FormHelperText, Stack, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../buttons";
import { CustomLabel } from "../custom-label";

export default function SignaturePad({
  name,
  defaultImage,
  onChangeHandler,
  ...other
}: {
  name: string;
  defaultImage: string | null;
  onChangeHandler?: (value: any) => void;
  [key: string]: any;
}) {
  const { control } = useFormContext();
  const [showSignCanvas, setShowSignCanvas] = useState(false);
  const [initialImage, setInitialImage] = useState(defaultImage);
  const theme = useTheme();
  const sigCanvas: any = useRef(null);

  useEffect(() => {
    if (defaultImage) {
      setShowSignCanvas(true);
      setInitialImage(defaultImage);
    } else {
      setShowSignCanvas(false);
    }
  }, [defaultImage]);

  const urlToFile = async (url: string): Promise<File> => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const data = atob(arr[1]);
    const n = data.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; ++i) {
      u8arr[i] = data.charCodeAt(i);
    }
    return new File([u8arr], `signature-${Date.now()}.png`, { type: mime });
  };

  const formatIntoPng = async (isClear: boolean): Promise<File | null> => {
    if (isClear || !sigCanvas.current || sigCanvas.current.isEmpty()) {
      return null;
    }

    const dataURL = sigCanvas.current.toDataURL();
    const file = await urlToFile(dataURL);
    return file;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem" {...other}>
          {other.label && (
            <CustomLabel
              label={other.label}
              required={other?.required}
              error={error}
            />
          )}
          <Box
            sx={{
              width: "100%",
              border: Boolean(error)
                ? `1.5px solid ${theme.palette.error.main}`
                : `1.5px solid ${theme.palette.divider}`,
              borderRadius: "4px",
              display: !other.disabled ? "flex" : "block",
              justifyContent: !other.disabled ? "center" : undefined,
              padding: "0",
            }}
          >
            {showSignCanvas &&
              initialImage &&
              typeof initialImage === "string" &&
              initialImage.trim() !== "" && (
                <Image alt="sign" width={300} height={135} src={initialImage} />
              )}
            {!other?.disabled && !showSignCanvas && (
              <SignatureCanvas
                penColor={theme.palette.text.primary}
                onEnd={async () => {
                  const file = await formatIntoPng(false);
                  field.onChange(file);
                  onChangeHandler?.(file);
                }}
                canvasProps={{
                  style: {
                    width: "100%",
                    height: "135px",
                  },
                }}
                ref={sigCanvas}
              />
            )}
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              {!other.disabled && (
                <Button
                  sx={{ justifyContent: "end" }}
                  onClick={async () => {
                    setShowSignCanvas(false);
                    setInitialImage(null);
                    sigCanvas?.current?.clear();
                    const cleared = await formatIntoPng(true);
                    field.onChange(cleared);
                    onChangeHandler?.(cleared);
                  }}
                  variant="contained"
                  size="medium"
                >
                  Clear
                </Button>
              )}
            </Box>
            {Boolean(error) && (
              <FormHelperText error>{error?.message}</FormHelperText>
            )}
          </Box>
        </Stack>
      )}
    />
  );
}
