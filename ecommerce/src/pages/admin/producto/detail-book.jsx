import React from "react";
import { Button, Descriptions } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function DetailBook() {
  const navigate = useNavigate();
  const location = useLocation();

  const { book } = location.state;
  //   console.log(book);

  const title = (
    <span>
      <Button type="link">
        <ArrowLeftOutlined
          style={{ marginRight: 10, fontSize: 20 }}
          onClick={() => navigate(-1)}
        />
      </Button>
      <span>Detalles del Libro</span>
    </span>
  );
  return (
    <Descriptions
      title={title}
      bordered
      column={{
        xl: 2,
        lg: 2,
        md: 2,
        sm: 2,
        xs: 1,
      }}
    >
      <Descriptions.Item label="Código">{book.cod_prod}</Descriptions.Item>
      <Descriptions.Item label="Título">{book.titulo}</Descriptions.Item>
      <Descriptions.Item label="Autor">{book.autor}</Descriptions.Item>
      <Descriptions.Item label="Editorial">{book.editorial}</Descriptions.Item>
      <Descriptions.Item label="Descripción" span={2}>
        {book.descripcion}
      </Descriptions.Item>
      <Descriptions.Item label="Géneros" span={2}>
        {book.categoria.map((cate) => cate["nombre"] + " | ")}
      </Descriptions.Item>
      <Descriptions.Item label="Año publicación">
        {book.año_pub}
      </Descriptions.Item>
      <Descriptions.Item label="Precio">{book.precio}</Descriptions.Item>
      <Descriptions.Item label="Stock">{book.cantidad}</Descriptions.Item>
      <Descriptions.Item label="Estado">
        {book.en_venta === true ? "En venta" : "No disponible"}
      </Descriptions.Item>
      <Descriptions.Item label="Imagenes" span={2}>
        <span style={{ border: "2px", height: "80px" }}>imagenes</span>
      </Descriptions.Item>
    </Descriptions>
  );
}
