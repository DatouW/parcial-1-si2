import { Card, Table, message, Input, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { reqCustomerList, reqSearchCustomer } from "../../../api";

export default function Customer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async (response) => {
    if (response) {
      setLoading(false);
    } else {
      setLoading(true);
      response = await reqCustomerList();
    }

    const result = response.data;

    setLoading(false);
    if (result.status === 0) {
      setData(result.data);
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Nombre de Usuario",
      dataIndex: "username",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
  ];

  const onSearch = async (value) => {
    setLoading(true);
    const response = await reqSearchCustomer(value);
    getData(response);
  };

  const title = (
    <Row>
      <Col sm={12} md={16} lg={12}>
        <Input.Search
          placeholder="Introducir usuario/nombre"
          onSearch={onSearch}
          enterButton
        />
      </Col>
    </Row>
  );

  return (
    <Card title={title}>
      <Table
        bordered={true}
        rowKey="id_cl"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: 4 }}
        scroll={{
          x: 550,
        }}
      />
    </Card>
  );
}
