import { Button, Card, Table, message, Form, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { reqAddCate, reqCateList, reqUpdateCate } from "../../../api";

export default function Categoria() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async (response) => {
    setLoading(true);
    if (response) {
    } else {
      response = await reqCateList();
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
      title: "Género",
      dataIndex: "nombre",
    },
    {
      title: "Acción",
      render: (cate) => (
        <Button
          type="primary"
          onClick={() => {
            setId(cate.id_cate);
            setIsUpdate(true);
            showModal(cate, true);
          }}
        >
          Modificar
        </Button>
      ),
    },
  ];

  const showModal = (genero, isUpdate) => {
    if (isUpdate) {
      form.setFieldsValue({
        nombre: genero.nombre,
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

  const onFinish = async (value) => {
    let result;
    if (isUpdate) {
      value.id_cate = id;
      result = (await reqUpdateCate(value)).data;
      // console.log(value);
    } else {
      result = (await reqAddCate(value.nombre)).data;
    }
    if (result.status === 0) {
      if (result.data) {
        setData([...data, result.data]);
      } else {
        let index = data.findIndex((cate) => cate.id_cate === id);
        data[index] = { ...data[index], ...value };
        // console.log(data);
        setData([...data]);
      }
      message.success(result.msg);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const extra = (
    <Button
      type="primary"
      onClick={() => {
        setIsUpdate(false);
        showModal();
      }}
    >
      <PlusOutlined /> Añadir Género
    </Button>
  );
  return (
    <Card extra={extra}>
      <Table
        bordered={true}
        rowKey="id_cate"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: 6 }}
      />
      <Modal
        title={isUpdate ? "Modificar Género" : "Añadir Género"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Género"
            name="nombre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
