"use client";
import React, { useState, ReactNode, MouseEvent } from "react";
import { Box, Button, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { ButtonProps, MenuProps, Theme } from "@mui/material";

interface TableActionProps {
  children: ReactNode;
  selectButtonProps?: ButtonProps;
  menuProps?: MenuProps;
  placeholder?: string;
  buttonStyles?: React.CSSProperties;
  iconStyles?: React.CSSProperties;
}

export function TableAction({
  children,
  menuProps,
  selectButtonProps,
  placeholder,
  buttonStyles,
  iconStyles,
}: TableActionProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return React.createElement(
    Box,
    null,
    React.createElement(
      Button,
      {
        id: "basic-button",
        "aria-controls": open ? "basic-menu" : undefined,
        "aria-haspopup": "true",
        "aria-expanded": open ? "true" : undefined,
        onClick: handleClick,
        sx: (theme: Theme) => ({
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.grey[100],
          border: "1px solid #D0D5DD",
          borderRadius: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 7px",
          ...buttonStyles,
        }),
        ...selectButtonProps,
      },
      placeholder || "select",
      React.createElement(KeyboardArrowDownIcon, {
        sx: (theme: Theme) => ({
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.grey[100],
          ...iconStyles,
        }),
      }),
    ),
    React.createElement(
      Menu,
      {
        id: "basic-menu",
        anchorEl: anchorEl,
        open: open,
        onClose: handleClose,
        MenuListProps: {
          "aria-labelledby": "basic-button",
        },
        ...menuProps,
      },
      children,
    ),
  );
}
