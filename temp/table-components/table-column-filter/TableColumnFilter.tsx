"use client";

import React from "react";
import { Menu } from "@mui/material";
import {
  BoxLayout,
  StackLayout,
  CustomTypography,
  SingleCheckboxField,
  TableActionIcon,
} from "@root/components";
import {
  TableColumnFilterPropsI,
  TableColumnI,
} from "./TableColumnFilter.interface";
import { tableColumnFilterStyles } from "./TableColumnFilter.styles";
import { useTableColumnFilter } from "./useTableColumnFilter";

export const TableColumnFilter: React.FC<TableColumnFilterPropsI> = (props) => {
  const {
    columns = [],
    icon,
    disabled = false,
    menuProps,
    iconButtonStyles,
    showAllLabel = "Show All Columns",
    resetAllLabel = "Reset All",
    permanentColumns = [],
  } = props;

  const {
    anchorEl,
    open,
    visibleColumns,
    allColumnsVisible,
    handleClick,
    handleClose,
    handleColumnToggle,
    handleShowAll,
    handleResetAll,
  } = useTableColumnFilter(props);

  return (
    <>
      <BoxLayout
        onClick={disabled ? undefined : handleClick}
        customStyles={{
          cursor: disabled ? "not-allowed" : "pointer",
          display: "inline-flex",
          opacity: disabled ? 0.5 : 1,
          ...iconButtonStyles,
        }}
      >
        {icon || <TableActionIcon hoverColor="primary.main" />}
      </BoxLayout>
      <Menu
        id="table-column-filter-menu"
        aria-labelledby="table-column-filter-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": tableColumnFilterStyles.menuPaper,
        }}
        {...menuProps}
      >
        <BoxLayout customStyles={tableColumnFilterStyles.headerContainer}>
          <StackLayout
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            customStyles={{ width: "100%" }}
          >
            <BoxLayout customStyles={{ flex: 1 }}>
              <SingleCheckboxField
                name="show-all-columns"
                label={showAllLabel}
                value={allColumnsVisible}
                onChangeHandler={(checked) => {
                  if (checked) {
                    handleShowAll();
                  } else {
                    handleResetAll();
                  }
                }}
              />
            </BoxLayout>
            <BoxLayout
              onClick={handleResetAll}
              customStyles={tableColumnFilterStyles.resetLink}
            >
              <CustomTypography variant="subtitle1" color="primary.main">
                {resetAllLabel}
              </CustomTypography>
            </BoxLayout>
          </StackLayout>
        </BoxLayout>
        {columns.map((column: TableColumnI) => {
          const isVisible = visibleColumns.includes(column.id);
          const isPermanent = permanentColumns.includes(column.id);
          return (
            <BoxLayout
              key={column.id}
              customStyles={{
                ...tableColumnFilterStyles.checkboxContainer,
                cursor: isPermanent ? "not-allowed" : "default",
              }}
            >
              <SingleCheckboxField
                name={`column-${column.id}`}
                label={column.header}
                value={isVisible}
                disabled={isPermanent}
                onChangeHandler={(checked) =>
                  handleColumnToggle(column.id, checked)
                }
              />
            </BoxLayout>
          );
        })}
      </Menu>
    </>
  );
};

export default TableColumnFilter;
