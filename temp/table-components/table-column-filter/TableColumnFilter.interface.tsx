import React from "react";
import { MenuProps, SxProps, Theme } from "@mui/material";

export interface TableColumnI {
  id: string;
  header: string;
  [key: string]: any;
}

export interface TableColumnFilterPropsI {
  columns: TableColumnI[];
  visibleColumns?: string[];
  onColumnVisibilityChange?: (visibleColumns: string[]) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  menuProps?: Partial<MenuProps>;
  iconButtonStyles?: SxProps<Theme>;
  showAllLabel?: string;
  resetAllLabel?: string;
  defaultVisibleColumns?: string[];
  permanentColumns?: string[];
}
