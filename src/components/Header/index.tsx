import React from "react";
import Logo from "../Logo";
import HeaderMenu from "../HeaderMenu";

const Header: React.FC = () => {
  return (
    <div className="py-6 border-b flex flex-row justify-between">
      <HeaderMenu />
      <Logo />
      <div></div>
    </div>
  );
};

export default Header;
