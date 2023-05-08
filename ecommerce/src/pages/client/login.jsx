import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom/dist";

const title = (
  <div
    style={{
      textAlign: "center",
      fontWeight: "bold",
      color: "rgb(22, 119, 255)",
    }}
  >
    Log In
  </div>
);
export default function LoginC() {
  const onFinish = (value) => {};

  return (
    <Row>
      <Col
        xs={{
          span: 20,
          offset: 2,
        }}
        lg={{
          span: 8,
          offset: 8,
        }}
      >
        <Card
          // bordered={false}
          title={title}
          style={{
            marginTop: "100px",
            marginBottom: "50px",
            boxShadow: "5px 5px 10px #ccc",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre Usuario"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
              O <NavLink to="/bookhut/signup">Registrar ahora!</NavLink>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
