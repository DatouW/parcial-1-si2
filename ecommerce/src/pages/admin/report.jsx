import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  message,
  Select,
  DatePicker,
  Divider,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { reqSales } from "../../api";
const { Option } = Select;
const { Text } = Typography;
const dateFormat = "YYYY-MM-DD";

export default function Report() {
  const [loading, setLoading] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [type, setType] = useState("date");
  const [start, setStart] = useState(moment().format(dateFormat));
  const [end, setEnd] = useState(moment().format(dateFormat));
  const [flag, setFlag] = useState(false);

  const columns = [
    {
      title: "Codigo",
      dataIndex: "cod_prod",
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
    },
    {
      title: "Cantidad Vendida",
      dataIndex: "cantidad",
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (total) => "Bs " + total,
    },
  ];

  useEffect(() => {
    const getVentas = async () => {
      setLoading(true);
      let result = (await reqSales(start, end)).data;
      setLoading(false);
      //   console.log(ventas);
      if (result.status === 0) {
        setVentas(result.data);
      } else {
        message.error(result.msg);
      }
    };
    if (flag) {
      getVentas();
      setFlag(false);
    }
  }, [start, end, flag]);

  const PickerWithType = ({ type, onChange }) => {
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const onChangePicker = (value) => {
    let start, end;
    if (type === "week") {
      let weekOfDay = parseInt(value.format("E")); //dia de la semana
      let s = value.startOf("day").subtract(weekOfDay - 1, "days");
      start = s.format(dateFormat);
      end = s.add(6, "days").format(dateFormat);
    } else if (type === "month") {
      start = value.startOf("month").format(dateFormat);
      end = value.endOf("month").format(dateFormat);
      //   console.log(start, end);
    } else if (type === "date") {
      start = value.format(dateFormat);
      end = value.format(dateFormat);
    } else {
      start = value.startOf("year").format(dateFormat);
      end = value.endOf("year").format(dateFormat);
    }
    // console.log(start, end);
    setStart(start);
    setEnd(end);
    setFlag(true);
  };

  const extra = (
    <Row>
      <Col xs={24} xl={18}>
        <Select value={type} onChange={setType}>
          <Option value="date">Diario</Option>
          <Option value="week">Semanal</Option>
          <Option value="month">Mensual</Option>
          <Option value="year">Anual</Option>
        </Select>
        <PickerWithType type={type} onChange={onChangePicker} />
      </Col>
    </Row>
  );

  const title = () => {
    let title1 = "Reporte De Ventas ";

    if (type === "week") {
      title1 += "Semanal: " + start + " ~ " + end;
      //   console.log(start, end);
    } else if (type === "month") {
      title1 += "Mensual: " + start.substring(0, 7);
    } else if (type === "date") {
      title1 += "Diario: " + start;
    } else {
      title1 += "Anual " + start.substring(0, 4);
    }

    return <p style={{ fontWeight: 700 }}>{title1}</p>;
  };

  return (
    <>
      <Divider
        orientation="left"
        orientationMargin="0"
        style={{ color: "white", fontSize: 20 }}
      >
        <span style={{ marginRight: 20 }}>REPORTE DE VENTAS</span>

        {extra}
      </Divider>

      <Table
        bordered={true}
        rowKey="cod_prod"
        loading={loading}
        dataSource={ventas}
        columns={columns}
        pagination={false}
        title={title}
        scroll={{
          x: 400,
        }}
        summary={(pageData) => {
          let ventas = 0;
          pageData.forEach(({ total }) => {
            ventas += parseFloat(total);
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>VENTAS</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <Text strong>Bs {ventas}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
}
