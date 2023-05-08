import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { formLayout } from "../../../utils/constant";
import { reqAddBook, reqCateList, reqUpdateBook } from "../../../api";

const { Item } = Form;
const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 18,
      offset: 6,
    },
    sm: {
      span: 14,
      offset: 10,
    },
  },
};

export default function AddUpdateBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cate, setCate] = useState([]);

  let book = location.state;
  //   console.log(book);
  const isUpdate = !!book;
  book = isUpdate ? location.state.book : {};

  const getCate = async () => {
    const result = (await reqCateList()).data;

    if (result.status === 0) {
      setCate(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getCate();
  }, []);

  const onFinish = async (fieldsValue) => {
    let response;
    fieldsValue.en_venta = fieldsValue.en_venta === "En venta" ? true : false;
    if (isUpdate) {
      fieldsValue.cod_prod = book.cod_prod;
      response = await reqUpdateBook(fieldsValue);
    } else {
      response = await reqAddBook(fieldsValue);
    }
    console.log(fieldsValue);
    const result = response.data;
    if (result.status === 0) {
      message.success(result.msg);
      navigate("/admin/producto");
    } else {
      message.error(result.msg);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Subir
      </div>
    </div>
  );

  const title = (
    <span>
      <Button type="link" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} />
      </Button>
      <span>{isUpdate ? "Modificar Libro" : "Añadir nuevo libro"}</span>
    </span>
  );
  return (
    <Card title={title}>
      <Form {...formLayout} labelWrap onFinish={onFinish}>
        <Item
          label="Título"
          name="titulo"
          initialValue={book.titulo}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>
        <Item
          label="Autor"
          name="autor"
          initialValue={book.autor}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>
        <Item
          label="Editorial"
          name="editorial"
          initialValue={book.editorial}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>
        <Item
          name="categoria"
          label="Género"
          initialValue={
            book.categoria ? book.categoria.map((c) => c.id_cate) : null
          }
          rules={[
            {
              required: true,
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Seleccione">
            {cate.map((c) => (
              <Option key={c.id_cate} value={c.id_cate}>
                {c.nombre}
              </Option>
            ))}
          </Select>
        </Item>

        <Item
          label="Año publicación"
          name="año_pub"
          initialValue={book.año_pub}
          rules={[
            { required: true },
            {
              pattern: /^(1[0-9]{3}|[2-9][0-9]{3})$/,
              message: "caracteres inválidos",
            },
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Precio"
          name="precio"
          initialValue={book.precio}
          rules={[
            { required: true },
            {
              pattern: /^[1-9][0-9]*(\.[0-9]+)?$/,
              message: "caracteres inválidos",
            },
          ]}
        >
          <InputNumber addonBefore="Bs" />
        </Item>
        <Item
          label="Stock"
          name="cantidad"
          initialValue={book.cantidad}
          rules={[
            { required: true },
            { pattern: /^[1-9]\d*$/, message: "caracteres inválidos" },
          ]}
        >
          <InputNumber />
        </Item>
        <Item
          label="Estado"
          name="en_venta"
          initialValue={book.en_venta === true ? "En venta" : "No disponible"}
          rules={[{ required: true }]}
        >
          <Select>
            <Option value={true}>En venta</Option>
            <Option value={false}>No disponible</Option>
          </Select>
        </Item>

        <Item
          label="Descripción"
          name="descripcion"
          initialValue={book.descripcion}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Item>

        <Form.Item label="Imagenes" valuePropName="fileList">
          <Upload
            action="/upload.do"
            accept="image/*"
            listType="picture-card"
            maxCount={3}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {isUpdate ? "Guardar" : "Añadir"}
          </Button>
        </Item>
      </Form>
    </Card>
  );
}
