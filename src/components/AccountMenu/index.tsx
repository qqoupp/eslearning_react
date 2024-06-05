import React from "react";
import { Close } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../../providers/userProvider";
import { Avatar } from "@mui/material";

type AccountMenuProps = {
  onClick?: () => void;
  open?: boolean;
};

const AccountMenu = (props: AccountMenuProps) => {
  const { onClick, open } = props;
  const { user, isLoggedIn } = React.useContext(UserContext);

  return (
    <div
      className="flex justify-between cursor-pointer pt-8 pr-8"
      onClick={onClick}
    >
      {!isLoggedIn ? (
        open ? (
          <Close />
        ) : (
          <AccountCircleIcon fontSize="large" />
        )
      ) : open ? (
        <Close />
      ) : (
        <Avatar style={{ backgroundColor: "#001524" }}>
          {user?.email[0].toUpperCase()}
        </Avatar>
      )}
    </div>
  );
};

export default AccountMenu;
