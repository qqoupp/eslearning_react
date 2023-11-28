import React from "react";
import { Close } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type AccountMenuProps = {
    onClick?: () => void;
    open?: boolean;
};

const AccountMenu = (props:AccountMenuProps) => {  

    const { onClick, open } = props;

    return (
        <div className="flex justify-between cursor-pointer pt-4"
            onClick={onClick}
        >   
            {open ? <Close /> : <AccountCircleIcon/>}
            
        </div>
    );
    
};

export default AccountMenu;