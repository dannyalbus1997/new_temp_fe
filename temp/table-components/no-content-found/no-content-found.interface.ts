import { SxProps } from "@mui/material";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface INoContentFoundProps {
  height?: string;
  sx?: SxProps;
  imageVisibility?: boolean;
  src?: StaticImageData;
  messageVisibility?: boolean;
  message?: string | ReactNode;
  subMessage?: string | ReactNode;
  children?: ReactNode;
  buttonVisibility?: boolean;
  buttonText?: string;
  buttonClick?: () => void;
  buttonProps?: any;
}
