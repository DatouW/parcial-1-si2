import React, { useEffect, useState } from "react";
import { Button, Card, Table, message, Input, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { reqBookList, reqSearchBooks } from "../../../api";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getLibros = async () => {
    setLoading(true);
    const result = (await reqBookList()).data;
    setLoading(false);
    if (result.status === 0) {
      setData(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getLibros();
  }, []);

  const extra = (
    <Button
      type="primary"
      onClick={() => navigate("/admin/producto/addupdate")}
    >
      <PlusOutlined /> Añadir Libro
    </Button>
  );

  const onSearch = async (value) => {
    setLoading(true);
    const result = (await reqSearchBooks(value)).data;
    setLoading(false);
    if (result.status === 0) {
      setData(result.data);
    } else {
      message.error(result.msg);
    }
  };

  const title = (
    <Row>
      <Col sm={12} md={16} lg={12}>
        <Input.Search
          placeholder="Introducir código/título/autor"
          onSearch={onSearch}
          enterButton
        />
      </Col>
    </Row>
  );

  const columns = [
    {
      title: "Título",
      dataIndex: "titulo",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      render: (precio) => "Bs " + precio,
    },
    {
      title: "Stock",
      dataIndex: "cantidad",
    },
    {
      title: "Acción",
      render: (book) => (
        <>
          <Button
            type="primary"
            style={{ margin: "0 5px 5px 0" }}
            onClick={() =>
              navigate("/admin/producto/detalles", { state: { book } })
            }
          >
            Detalles
          </Button>
          <Button
            type="primary"
            onClick={() =>
              navigate("/admin/producto/addupdate", { state: { book } })
            }
          >
            Modificar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered={true}
        rowKey="cod_prod"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: 4 }}
        scroll={{
          x: 700,
        }}
      />
    </Card>
  );
}
