import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Select,
  message,
  Row,
  Col,
  Input,
} from "antd";
import {
  reqChangeEnvio,
  reqChangePago,
  reqOrderList,
  reqSearchOrders,
} from "../../api";

export default function Order() {
  const [isPago, setIsPago] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nro, setNro] = useState();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const expandedRowRender = (record) => {
    const columns = [
      {
        key: "titulo",
        title: "Titulo",
        render: (prod) => prod.titulo,
      },
      {
        key: "cantidad",
        title: "Cantidad",
        render: (prod) => prod.Detalle.cantidad,
      },
      {
        key: "precio",
        title: "Precio",
        render: (prod) => "Bs. " + prod.Detalle.precio,
      },
      {
        key: "subtotal",
        title: "Subtotal",
        render: (prod) => "Bs. " + prod.Detalle.cantidad * prod.Detalle.precio,
      },
    ];
    const data = record.Productos;

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(data) => data.cod_prod}
      />
    );
  };

  const columns = [
    {
      title: "Nro. pedido",
      dataIndex: "nro",
    },
    {
      title: "Fecha hora",
      render: (order) => order.fecha + " " + order.hora,
    },
    {
      title: "Destinatario",
      dataIndex: "destinatario",
    },
    {
      title: "Direccion",
      dataIndex: "direccion",
    },
    {
      title: "Usuario",
      dataIndex: "Cliente",
      render: (c) => c.username,
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
    },
    {
      title: "total",
      dataIndex: "total",
      render: (t) => "Bs. " + t,
    },
    {
      title: "Forma Pago",
      render: (order) => (
        <Button type="link" onClick={() => onClickPago(order)}>
          {order.estado_pago === "T" ? "Transferencia" : "Contra Entrega"}
        </Button>
      ),
    },
    {
      title: "Estado de envio",
      render: (order) => (
        <Button type="link" danger onClick={() => onClickEnvio(order)}>
          {order.estado_envio === "P"
            ? "En proceso"
            : order.estado_envio === "S"
            ? "Enviado"
            : "Entregado"}
        </Button>
      ),
    },
  ];

  const onClickPago = (pedido) => {
    setIsPago(true);
    showModal(pedido);
  };
  const onClickEnvio = (pedido) => {
    setIsPago(false);
    showModal(pedido);
  };

  const showModal = (order) => {
    setNro(order.nro);
    if (isPago) {
      form.setFieldsValue({
        estado_pago: order.estado_pago,
      });
    } else {
      form.setFieldValue({
        estado_envio: order.estado_envio,
      });
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const getData = async (response) => {
    if (response) {
      setLoading(false);
      // console.log("ok");
    } else {
      setLoading(true);
      response = await reqOrderList();
    }

    const result = response.data;

    // console.log(result.data);
    setLoading(false);
    if (result.status === 0) {
      setData(result.data);
      // console.log("ok --");
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (value) => {
    let result;
    value.nro = nro;
    // console.log(value);
    if (isPago) {
      result = (await reqChangePago(value)).data;
    } else {
      result = (await reqChangeEnvio(value)).data;
    }

    if (result.status === 0) {
      const index = data.findIndex((order) => order.nro === nro);
      data[index] = { ...data[index], ...value };
      setData([...data]);

      message.success(result.msg);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const onSearch = async (value) => {
    setLoading(true);
    const response = await reqSearchOrders(value);
    getData(response);
  };

  const title = (
    <Row>
      <Col sm={12} md={16} lg={12}>
        <Input.Search
          placeholder="Introducir nro pedido/destinatario"
          onSearch={onSearch}
          enterButton
        />
      </Col>
    </Row>
  );

  return (
    <Card title={title}>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        scroll={{
          x: 700,
        }}
        dataSource={data}
        rowKey="nro"
        bordered
        loading={loading}
      />
      <Modal
        title={isPago ? "Pago" : "Envio"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={isPago ? "Pago" : "Envio"}
            rules={[{ required: true }]}
            name={isPago ? "estado_pago" : "estado_envio"}
          >
            <Select>
              {isPago ? (
                <>
                  <Select.Option value="T">Transferencia</Select.Option>
                  <Select.Option value="C">Contra Entrega</Select.Option>
                </>
              ) : (
                <>
                  <Select.Option value="P">En Proceso</Select.Option>
                  <Select.Option value="S">Enviado</Select.Option>
                  <Select.Option value="D">Entregado</Select.Option>
                </>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
