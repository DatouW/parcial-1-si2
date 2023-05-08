import { Layout, theme } from "antd";
import React from "react";
import LeftNav from "../../components/leftnav/left-nav";
import Header from "../../components/HeaderAdmin/header";
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const Admin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={250}
          // onBreakpoint={(broken) => {
          //   // console.log(broken);
          // }}
        >
          <div className="logo" />
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              // minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Admin;
