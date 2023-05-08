import React from "react";

import { BackTop } from "antd";
import { NavLink } from "react-router-dom/dist";

function FooterC() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="logo">
          <i className="fas fa-bolt"></i>
          <NavLink to="">BookHut</NavLink>
        </div>
        <div className="copyright">Copyright &copy; 2023 BookHut</div>
        <BackTop>
          <div className="goTop">
            <i className="fas fa-arrow-circle-up"></i>
          </div>
        </BackTop>
      </div>
    </div>
  );
}

export default FooterC;
