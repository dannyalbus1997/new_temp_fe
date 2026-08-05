"use client";
import React, { useState, ReactNode, MouseEvent, JSX } from "react";
import { Box, IconButton, Menu } from "@mui/material";
import type { ButtonProps, MenuProps } from "@mui/material";

interface TableIconActionProps {
  children: ReactNode;
  selectButtonProps?: Omit<ButtonProps, "loading">;
  menuProps?: MenuProps;
  icon?: ReactNode | JSX.Element;
  disabled?: boolean;
}

export function TableIconActions({
  children,
  menuProps,
  selectButtonProps,
  icon,
  disabled,
}: TableIconActionProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...selectButtonProps}
        disabled={disabled}
      >
        {icon}
      </IconButton>
      <Menu
        sx={{ "& ._list > li": { fontSize: "14px", pr: "40px" } }}
        classes={{ list: "_list" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        {...menuProps}
      >
        {children}
      </Menu>
    </Box>
  );
}
