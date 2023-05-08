import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { tailFormItemLayout } from "../../utils/constant";
import book1 from "../../assets/images/book1.png";
import book2 from "../../assets/images/book2.jpg";
import book3 from "../../assets/images/book6.jpg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Don Quijote de la mancha",
      price: 59.99,
      quantity: 1,
      src: book1,
    },
    {
      id: 2,
      name: "Matar a un ruiseñor",
      price: 70.0,
      quantity: 2,
      src: book2,
    },
    {
      id: 3,
      name: "El señor de los anillos",
      price: 199.99,
      quantity: 1,
      src: book3,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

  const onFinish = () => {};
  return (
    <div className="container-fluid">
      {/* <Badge count={cartItems.length}>
      <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} />
    </Badge> */}

      {/* <Card title="Carrito de Compra"> */}
      <div style={{ fontWeight: "bold", fontSize: 20, margin: "20px 0px" }}>
        <ShoppingCartOutlined style={{ marginRight: 10 }} />
        Carrito de Compra
      </div>
      <List
        dataSource={cartItems}
        renderItem={(product) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              />,
            ]}
            style={{ backgroundColor: "white" }}
          >
            <List.Item.Meta
              avatar={<img src={product.src} alt={product.name} width={64} />}
              title={product.name}
              description={`$${product.price.toFixed(2)}`}
            />
            <Space>
              <InputNumber
                min={1}
                max={10}
                defaultValue={product.quantity}
                onChange={handleQuantityChange}
              />
              {product.quantity * product.price}
            </Space>
          </List.Item>
        )}
      />
      <p>Total: ${cartTotal.toFixed(2)}</p>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Realizar Compra
      </Button>
      <Drawer
        title="Comprar"
        width={400}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Destinatario"
            name="destinatario"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[
              {
                required: true,
              },
              { min: 8, message: "" },
              { max: 8, message: "" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Direccion"
            name="direccion"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input addonBefore="Santa Cruz" />
          </Form.Item>
          <Form.Item label="Nota" name="nota">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Drawer>
      {/* <Button type="primary" onClick={showModal}>
        Realizar Compra
      </Button> */}
      {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Destinatario"
            name="destinatario"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[
              {
                required: true,
              },
              { min: 8, message: "" },
              { max: 8, message: "" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Direccion"
            name="direccion"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input addonBefore="Santa Cruz" />
          </Form.Item>
          <Form.Item label="Nota" name="nota">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default Cart;
