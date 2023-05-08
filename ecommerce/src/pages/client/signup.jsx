import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import { formItemLayout, tailFormItemLayout } from "../../utils/constant";

export default function SignUp() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const title = (
    <div
      style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "rgb(22, 119, 255)",
      }}
    >
      Sign Up
    </div>
  );

  return (
    <>
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
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              <Form.Item
                name="username"
                label="Nombre de Usuario"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                  },
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirmar contraseña"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Las dos contraseñas introducidas no coinciden!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="telefono"
                label="Telefono"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Registrar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
