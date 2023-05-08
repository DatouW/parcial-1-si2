import React from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

import { Avatar } from "antd";
import storageUtils from "../../utils/storageUtils";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();

  const getUserName = () => {
    const { username } = storageUtils.getUser();
    return username;
  };

  const logout = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "¿Estás seguro de que quieres cerrar la sesión?",
      onOk: () => {
        // eliminar los datos guardados en localstorage
        storageUtils.removeUser();
        //redirect to login page
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="header">
      <div className="header-top">
        <Button type="link" onClick={logout} style={{ position: "relative" }}>
          <Avatar
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
            size={"large"}
          >
            {getUserName().charAt(0).toUpperCase()}
          </Avatar>
        </Button>
        <span style={{ color: "#f56a00" }}>{getUserName()}</span>
      </div>
    </div>
  );
}
