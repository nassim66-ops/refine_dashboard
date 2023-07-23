import { Button } from "@mui/material";
import { CustomButtonProps } from "interfaces/common";
import React from "react";

const CustomButton = (props: CustomButtonProps) => {
  const { backgroundColor, color } = props;

  return (
    <Button
      disabled={props.disabled}
      type={props.type === "submit" ? "submit" : "button"}
      sx={{
        flex: props.fullWidth ? 1 : "unset",
        padding: "10px 15px",
        width: props.fullWidth ? "100%" : "fit-content",
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: "10px",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.9,
          backgroundColor,
        },
      }}
      onClick={props.handleClick}
    >
      {props.icon}
      {props.title}
    </Button>
  );
};

export default CustomButton;
