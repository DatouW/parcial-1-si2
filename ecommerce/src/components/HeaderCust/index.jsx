import React, { useState } from "react";

import { Anchor, Drawer, Button, Badge, Avatar } from "antd";
import { NavLink } from "react-router-dom/dist";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
const { Link } = Anchor;

function HeaderC() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <img src={logo} alt="logo"></img>
          <NavLink to="">BookHut</NavLink>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <NavLink to="cart">
              <Badge size="default" count={4}>
                MI COMPRA
                <ShoppingCartOutlined style={{ fontSize: 25, color: "red" }} />
              </Badge>
            </NavLink>

            <span style={{ fontWeight: "bold", margin: "0 10px 0 10px" }}>
              |
            </span>
            <NavLink to="login">
              <span style={{ color: "black" }}>CUENTA</span>
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
            </NavLink>
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <Anchor targetOffset="65">
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />
              <Link href="#feature" title="Features" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default HeaderC;
