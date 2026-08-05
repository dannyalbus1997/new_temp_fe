"use client";

import { Box, Typography } from "@mui/material";
import { INoContentFoundProps } from "./no-content-found.interface";
import Image from "next/image";
import { Button } from "../../buttons";
import { NoDataIllustration } from "./no-data-illustration";

export function NoContentFound(props: INoContentFoundProps) {
  const {
    height = "50vh",
    sx,
    imageVisibility = true,
    src,
    messageVisibility = true,
    message = "No Data Found",
    subMessage = "There's nothing to show here yet",
    children,
    buttonVisibility = false,
    buttonText = "Refresh",
    buttonClick,
    buttonProps,
  } = props;

  return (
    <Box
      sx={{
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        overflow: "hidden",
        ...sx,
      }}
    >
      {imageVisibility && (
        <Box
          sx={{
            flexShrink: 0,
            maxHeight: "40vh",
            width: "100%",
            maxWidth: 420,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={"No Data Found"}
              width={2000}
              height={1600}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <NoDataIllustration />
          )}
        </Box>
      )}

      {messageVisibility && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            textAlign: "center",
          }}
        >
          {typeof message === "string" ? (
            <Typography variant={"xsMedium"} sx={{ color: "text.primary" }}>
              {message}
            </Typography>
          ) : (
            message
          )}

          {subMessage &&
            (typeof subMessage === "string" ? (
              <Typography variant={"textSm"} sx={{ color: "text.secondary" }}>
                {subMessage}
              </Typography>
            ) : (
              subMessage
            ))}
        </Box>
      )}

      {children}

      {buttonVisibility && (
        <Button
          className={"small"}
          variant={"contained"}
          onClick={() => buttonClick?.()}
          {...buttonProps}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}
