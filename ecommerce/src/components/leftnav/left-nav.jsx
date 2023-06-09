import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Menu } from "antd";

import logo from "../../assets/images/logo.png";
import "./left-nav.css";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function LeftNav() {
  let location = useLocation();
  let path = location.pathname;
  // console.log(path);

  //determinar si el item esta en menu del usuario
  const hasAuth = (item) => {
    const { key } = item;
    const { permisos } = storageUtils.getUser();
    // console.log(permisos);
    /*
      1. si el usuario es admin
      2. si el usuario tiene permiso: key esta en permisos?
      */
    if (permisos.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      // 3. o si el hijo de item esta en menu
      return !!item.children.find(
        (child) => permisos.indexOf(child.key) !== -1
      );
    } else {
      return false;
    }
  };
  const getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if (hasAuth(item)) {
        if (!item.children) {
          // console.log(item.key)
          return getItem(
            <NavLink to={item.key}>{item.title}</NavLink>,
            item.key,
            item.icon
          );
        } else {
          return getItem(
            item.title,
            item.key,
            item.icon,
            getMenuNodes(item.children)
          );
        }
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="left-nav">
        <NavLink to="/admin" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>BookHut</h1>
        </NavLink>
      </div>
      <Menu
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[true]}
        mode="inline"
        theme="dark"
        style={{ height: 200 }}
        items={getMenuNodes(menuList)}
      />
    </>
  );
}
