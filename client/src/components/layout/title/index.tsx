import React from "react";
import { useRouterContext } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, yariga } from "assets";

type TitleProps = {
  collapsed: any;
};

export const Title = (props: TitleProps) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {props.collapsed ? (
          <img src={logo} alt="Yariga" width="28px" />
        ) : (
          <img src={yariga} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
