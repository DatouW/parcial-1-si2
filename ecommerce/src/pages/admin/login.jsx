import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Col, Row, message } from "antd";
import "./style.css";
import logo from "../../assets/images/bookhut.png";
import { useNavigate } from "react-router-dom";
import { reqLoginAdmin } from "../../api";
import storageUtils from "../../utils/storageUtils";
const { Item } = Form;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, password } = values;
    // console.log(username, password);
    const result = (await reqLoginAdmin(username, password)).data;
    if (result.status === 0) {
      message.success("Inicio de sesión con éxito");
      //guardar datos del usuario
      const user = result.data;
      storageUtils.saveUser(user); // guardar en localStorage
      navigate("/admin", { replace: true });
    } else {
      message.error(result.msg);
    }
  };

  const title = (
    <div style={{ textAlign: "center" }}>
      <img src={logo} alt="" style={{ height: "200px" }}></img>
    </div>
  );

  return (
    <div className="login-page">
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
            title={title}
            // bordered={false}
            style={{
              marginTop: "100px",
              boxShadow: "5px 5px 10px #ccc",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Item
                name="username"
                rules={[
                  {
                    required: true,
                    // message: "Este campo no puede ser vacío!",
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]+$/,
                  },
                  { max: 40 },
                  { min: 4 },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nombre de Usuario"
                />
              </Item>
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                  },
                  { max: 30 },
                  { min: 6 },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Item>
              <Item
                wrapperCol={{
                  offset: 7,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Iniciar Sesión
                </Button>
              </Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
