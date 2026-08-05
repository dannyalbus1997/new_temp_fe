"use client";
import { useTheme } from "@mui/material/styles";
import React, { useState, useMemo, ChangeEvent } from "react";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import { SearchIcon } from "../../icons";

interface TableHeaderProps {
  onSearch: (value: string) => void;
  position?: "start" | "end";
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onSearch,
  position = "start",
}) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((value: string) => onSearch(value), 300),
    [onSearch],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedSearch(value);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "280px" },
        height: "30px",
        padding: "8px 0 0 0",
        gap: "16px",
        opacity: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: position === "start" ? "flex-start" : "flex-end",
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search"
        variant="outlined"
        autoComplete="off"
        sx={{
          minWidth: 240,
          backgroundColor: "transparent",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "16px",
            height: "40px",
            "& fieldset": {
              textAlign: "right",
              borderColor: theme?.palette?.primary[500],
              borderRadius: "6px",
            },
            "&:hover fieldset": {
              borderColor: theme?.palette?.primary[500],
            },
            "& .MuiInputBase-input": {
              color: theme?.palette?.common?.black,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme?.palette?.primary[500],
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "16px",
            },
          },
        }}
        slotProps={{
          input: {
            [`${position}Adornment`]: (
              <InputAdornment position={position}>
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default TableHeader;
