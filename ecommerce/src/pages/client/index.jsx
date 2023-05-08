import React from "react";
import HeaderC from "../../components/HeaderCust";
import { Outlet } from "react-router-dom";
import "./index.css";
import { Layout } from "antd";
import FooterC from "../../components/Footer";
const { Header, Content, Footer } = Layout;

export default function Main() {
  return (
    <Layout className="mainLayout">
      <Header>
        <HeaderC />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>
        <FooterC />
      </Footer>
    </Layout>
  );
}
