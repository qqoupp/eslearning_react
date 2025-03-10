import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Close } from "@mui/icons-material";

type HeaderMenuProps = {
    onClick?: () => void;
    open?: boolean;
};

const HeaderMenu = (props:HeaderMenuProps) => {  

    const { onClick, open } = props;

    return (
        <div className="flex justify-between cursor-pointer pt-8 pl-8"
            onClick={onClick}
        >   
            {open ? <Close /> : <MenuIcon fontSize="large"/>}
            
        </div>
    );
    
};

export default HeaderMenu;