import { styled, Switch, Theme } from "@mui/material";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 18,
  padding: 0,
  "& .MuiSwitch-track": {
    borderRadius: 32 / 2,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    backgroundColor: theme.palette.grayscale[300],
  },
  "& .MuiSwitch-thumb": {
    width: 13,
    height: 13.5,
    boxSizing: "border-box",
    color: theme.palette.common.white,
  },
  "& .MuiSwitch-switchBase": {
    padding: "1px 3px 0 3px",
    margin: "1px -1px",
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.grayscale[800],
      opacity: "inherit",
    },
    "&.MuiSwitch-switchBase.Mui-disabled+.MuiSwitch-track": {
      opacity: "unset",
      background: theme.palette.grayscale[400],
    },
  },
}));

export const StyledDateRangePicker = styled("div")(({ theme }) => ({
  "& .rdrDateDisplayWrapper": {
    display: "none",
  },
  "& .rdrDateRangeWrapper .rdrNextPrevButton.rdrPrevButton": {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      // boxShadow: theme?.customShadows?.[1],
    },
  },
  "& .rdrDateRangeWrapper .rdrNextPrevButton": {
    color: theme.palette.grayscale[800],
    backgroundColor: theme.palette.common.white,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      // boxShadow: theme?.customShadows?.[1],
    },
  },
  "& .rdrMonthPicker": {
    background: "unset",
    backgroundColor: theme.palette.common.white,
  },
  "& .rdrMonthAndYearPickers select": {
    background: "unset",
    fontSize: "16px",
    color: theme.palette.text.primary,
    borderRadius: "8px",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      // boxShadow: theme?.customShadows?.[1],
      color: theme.palette.text.secondary,
      borderRadius: "8px",
    },
  },
  "& .rdrDay": {
    border: "none !important",
    borderRadius: "8px",
    boxShadow: "none",

    "&:hover": {
      backgroundColor: theme.palette.common.white,
      // boxShadow: theme?.customShadows?.[1],
      color: theme.palette?.primary?.dark,
      border: "none !important",
      borderRadius: "8px",
    },
    "&.rdrDayActive": {
      boxShadow: "none !important",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      border: "none !important",
      borderRadius: "8px",
    },
    "&:focus": {
      border: "none !important",
    },
  },
  "& .rdrDay .rdrDayWeekend.rdrDayEndOfWeek.rdrDayHovered": {
    border: "unset",
    width: "36px",
    height: "36px",
  },
  "& .rdrDayStartPreview.rdrDayEndPreview": {
    border: "unset",
  },
  "& .rdrStartEdge.rdrEndEdge": {
    border: "unset",
    margin: "unset",
    height: "38px",
    width: "42px",
    position: "absolute",
    top: "0px",
    left: "0px",
    borderRadius: "8px",
  },
  "& .rdrDay rdrDayToday": {
    textDecoration: "none",
  },
  "& .rdrDayNumber": { 
    color: theme.palette.common.white,
  },

  "& .rdrWeekDay": {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
  },
}));

export const slotPropsStyles = (theme: Theme) => ({
  calendarHeader: {
    sx: {
      "& .MuiPickersCalendarHeader-label": {
        opacity: "0.5",
        color: theme.palette.text.secondary,
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.grayscale[800],
      },
    },
  },

  popper: {
    sx: {
      "& .MuiPickersDay-root.Mui-selected": {
        borderRadius: "10px !important",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersDay-root:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme.customShadows[1],
        },
      },
      "& .MuiDayCalendar-weekDayLabel": {
        fontSize: "1rem",
        color: theme.palette.text.primary,
      },
    },
  },
  day: {
    sx: {
      "&.MuiPickersDay-today": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
      },
    },
  },
  desktopPaper: {
    sx: {
      "& .MuiPickersYear-yearButton.Mui-selected": {
        borderRadius: "8px",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersYear-yearButton:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme.customShadows[1],
        },
      },
      "& .MuiPickersYear-yearButton:not(.Mui-selected):focus": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
        "&:hover": {
          // boxShadow: theme.customShadows[1],
          backgroundColor: theme.palette.common.white,
        },
      },
      "& .MuiPickersMonth-monthButton.Mui-selected": {
        borderRadius: "8px",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersMonth-monthButton:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme.customShadows[1],
        },
      },
      "& .MuiPickersMonth-monthButton:not(.Mui-selected):focus": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
        "&:hover": {
          // boxShadow: theme.customShadows[1],
          backgroundColor: theme.palette.common.white,
        },
      },
    },
  },
});
export const slotTimePickerPropsStyles = (theme: Theme) => ({
  popper: {
    sx: {
      "& .MuiPickersDay-root.Mui-selected": {
        borderRadius: "10px !important",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersDay-root:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme?.customShadows?.[1],
        },
      },
      "& .MuiClock-clock.css-182xs1g-MuiClock-clock": {
        marginTop: "3rem",
      },
      "& .MuiDayCalendar-weekDayLabel": {
        fontSize: "1rem",
        color: theme.palette.text.primary,
      },
    },
  },
  day: {
    sx: {
      "&.MuiPickersDay-today": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
      },
    },
  },
  desktopPaper: {
    sx: {
      "& .MuiPickersYear-yearButton.Mui-selected": {
        borderRadius: "8px",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersYear-yearButton:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme?.customShadows?.[1],
        },
      },
      "& .MuiPickersYear-yearButton:not(.Mui-selected):focus": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
        "&:hover": {
          // boxShadow: theme?.customShadows?.[1],
          backgroundColor: theme.palette.common.white,
        },
      },
      "& .MuiPickersMonth-monthButton.Mui-selected": {
        borderRadius: "8px",
        background: theme.palette.grayscale[800],
        color: theme.palette.common.white,
        fontSize: "1rem",
        lineHeight: "26px",
        "&:hover": {
          color: theme.palette.common.white,
        },
      },
      "& .MuiPickersMonth-monthButton:not(.Mui-selected)": {
        borderRadius: "10px",
        "&:hover": {
          color: theme.palette.grayscale[800],
          backgroundColor: theme.palette.common.white,
          // boxShadow: theme?.customShadows?.[1],
        },
      },
      "& .MuiPickersMonth-monthButton:not(.Mui-selected):focus": {
        backgroundColor: theme.palette.primary[200],
        color: theme.palette.grayscale[800],
        border: "unset",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: "26px",
        "&:hover": {
          // boxShadow: theme?.customShadows?.[1],
          backgroundColor: theme.palette.common.white,
        },
      },
    },
  },
  calendarHeader: {
    sx: {
      "& .MuiPickersCalendarHeader-label": {
        opacity: "0.5",
        color: theme.palette.text.secondary,
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.grayscale[800],
      },
    },
  },
});
