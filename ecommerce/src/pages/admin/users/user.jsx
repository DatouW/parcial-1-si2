import {
  Button,
  Card,
  Table,
  message,
  Form,
  Modal,
  Input,
  Switch,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import {
  reqChangePwd,
  reqDisableUser,
  reqRegisterUser,
  reqRoleList,
  reqUserList,
} from "../../../api";
import { formItemLayout } from "../../../utils/constant";
import storageUtils from "../../../utils/storageUtils";

const { Option } = Select;

export default function User() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);

  const [isAdd, setIsAdd] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [form] = Form.useForm();

  const getData = async () => {
    setLoading(true);

    let result = (await reqUserList(storageUtils.getUser().id_rol)).data;
    // console.log(result);
    setLoading(false);
    if (result.status === 0) {
      setData(result.data);

      result = (await reqRoleList()).data;
      if (result.status === 0) {
        setRoles(result.data);
      }
    } else {
      message.error(result.msg);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChange = async (checked, _) => {
    // console.log(id, checked);
    const result = (await reqDisableUser(id, checked)).data;
    if (result.status === 0) {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const columns = [
    {
      title: "Nombre de Usuario",
      dataIndex: "username",
    },
    {
      title: "Estado",
      dataIndex: "habilitado",
      ellipsis: {
        showTitle: false,
      },
      render: (habilitado) => {
        if (habilitado === true) {
          return (
            <>
              <Switch
                checkedChildren="Habilitado"
                unCheckedChildren="Deshabilitado"
                defaultChecked
                onChange={onChange}
              />
            </>
          );
        } else
          return (
            <>
              <Switch
                checkedChildren="Habilitado"
                unCheckedChildren="Deshabilitado"
                onChange={onChange}
              />
            </>
          );
      },
    },
    {
      title: "Acción",
      ellipsis: true,
      render: (user) => (
        <Button
          type="primary"
          onClick={() => {
            setId(user.id_user);
            setIsAdd(false);
            showModal();
          }}
        >
          Cambiar contraseña
        </Button>
      ),
    },
  ];

  const showModal = () => {
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
    // console.log(value);
    let result;
    if (isAdd) {
      result = (await reqRegisterUser(value)).data;
      // console.log(value);
    } else {
      value.id_user = id;
      result = (await reqChangePwd(value)).data;
    }
    if (result.status === 0) {
      if (result.data) {
        setData([...data, result.data]);
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
        setIsAdd(true);
        showModal();
      }}
    >
      <PlusOutlined /> Registar Usuario
    </Button>
  );

  return (
    <Card extra={extra}>
      <Table
        bordered={true}
        rowKey="id_user"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ defaultPageSize: 4 }}
        scroll={{
          x: 550,
        }}
        onRow={(record, _) => {
          return {
            onMouseEnter: (_) => {
              setId(record.id_user);
            },
          };
        }}
      />
      <Modal
        title={isAdd ? "Registrar Usuario" : "Cambiar contraseña"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isAdd ? (
          <Form form={form} onFinish={onFinish} {...formItemLayout}>
            <Form.Item
              label="Nombre de Usuario"
              name="username"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^[a-zA-Z0-9_-]+$/,
                },
                { max: 40 },
                { min: 4 },
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
              name="id_rol"
              label="Rol"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="seleccione el rol">
                {roles.map((rol) => (
                  <Option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} onFinish={onFinish} {...formItemLayout}>
            <Form.Item
              name="newpwd"
              label="Nueva contraseña"
              rules={[
                {
                  required: true,
                },
                {
                  min: 6,
                },
                {
                  max: 30,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirmar contraseña"
              dependencies={["newpwd"]}
              hasFeedback
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newpwd") === value) {
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
          </Form>
        )}
      </Modal>
    </Card>
  );
}
