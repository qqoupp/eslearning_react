import { Typography } from "@mui/material";
import React from "react";

const Label = ({
  text,
  className,
}: {
  text: string;

  className?: string;
}) => {
  return (
    <Typography
      variant="h4"
      component="div"
      className={
        `flex items-center pt-2 pb-2 ${className}`
      }
    >
      {text}
    </Typography>
  );
};

export default Label;
