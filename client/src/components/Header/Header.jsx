import React from "react";
import Logo from "../../assets/Logo.png";
import { Image } from "antd";
const Header = () => {
  return (
    <div style={{ backgroundColor: "#F1ECE6", padding: 10 }}>
      <Image src={Logo} style={{ width: 100 }} />
    </div>
  );
};

export default Header;
