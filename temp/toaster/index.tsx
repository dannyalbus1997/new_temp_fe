import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system/colorManipulator";
import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster(): JSX.Element {
  const {
    palette: { common, neutral,success,error },
  } = useTheme();

  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2800,
        success: {
          icon: <CheckCircleIcon sx={{ color: success[500] }} />,
          style: {
            background: common.white,
            color: success[500],
            borderRadius: "16px",
            fontSize: "13px",
          },
        },
        error: {
          icon: <ErrorIcon sx={{ color: error[500] }} />,
          style: {
            background: common.white,
            color: error[500],
            fontSize: "13px",
            borderRadius: "16px",
          },
        },
        style: {
          borderRadius: "16px",
          background: common.white,
          color: neutral[900],
          boxShadow: `0px 6px 20px 0px ${alpha(common.black, 0.15)}`,
          padding: "12px 16px 12px 16px",
          fontSize: "16px",
          fontWeight: 600,
          wordBreak: "break-word",
          overflow: "auto",
        },
      }}
    />
  );
}
