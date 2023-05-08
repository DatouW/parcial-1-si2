import {
  Card,
  Col,
  Divider,
  Row,
  Statistic,
  Grid,
  Button,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Chart, Interval, LineAdvance, Tooltip, getTheme } from "bizcharts";
import { reqAll, reqBooksGraph, reqSalesGraph } from "../../api";

const style = { borderColor: "black" };
const { useBreakpoint } = Grid;

const tabList = [
  {
    key: "tab1",
    tab: "Ventas",
  },
  {
    key: "tab2",
    tab: "Libros más vendidos",
  },
];

export default function Home() {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [sales, setSales] = useState([]);
  const [books, setBooks] = useState([]);
  const [all, setAll] = useState({});

  const { md } = useBreakpoint();

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
    if (key === "tab1") {
      setSales([...sales]);
    } else {
      setBooks([...books]);
    }
  };

  const getInitData = async () => {
    const ventas = (await reqSalesGraph(7, "Day")).data;
    const libros = (await reqBooksGraph(7)).data;
    const a = (await reqAll()).data;
    if (a.status === 0) {
      setAll(a.data);
    }
    // console.log(ventas, libros);
    if (ventas.status === 0 && libros.status === 0) {
      const data1 = ventas.data.map((d) => {
        d.total = parseFloat(d.total);
        return d;
      });
      const data2 = libros.data.map((d) => {
        d.cantidad = parseInt(d.cantidad);
        return d;
      });
      setSales(data1);
      setBooks(data2);
    } else {
      message.error(libros.msg);
    }
  };
  useEffect(() => {
    getInitData();
  }, []);

  const onClick = async (inter, uni) => {
    if (activeTabKey1 === "tab1") {
      const result = (await reqSalesGraph(inter, uni)).data;
      if (result.status === 0) {
        const data1 = result.data.map((d) => {
          d.total = parseFloat(d.total);
          return d;
        });
        setSales(data1);
      } else {
        message.error(result.msg);
      }
    } else {
      const result = (await reqBooksGraph(inter)).data;
      if (result.status === 0) {
        const data1 = result.data.map((d) => {
          d.cantidad = parseInt(d.cantidad);
          return d;
        });
        setSales(data1);
      } else {
        message.error(result.msg);
      }
    }
  };

  const extra = (
    <>
      {md ? (
        <>
          <Button type="text" onClick={() => onClick(7, "Day")}>
            Últimos 7 días
          </Button>
          <Button
            type="text"
            danger
            disabled={activeTabKey1 === "tab1"}
            onClick={() => onClick(30)}
          >
            Últimos 30 días
          </Button>
          <Button type="text" onClick={() => onClick(365, "Month")}>
            Últimos 12 meses
          </Button>
        </>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
          <Card style={{ ...style }}>
            <Statistic
              title="Total de Ventas"
              value={all.totalAll}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix="Bs. "
            />
            <Divider style={{ margin: 10, color: "black" }} />
            <span>
              <strong>Ventas del día: </strong> Bs.
              {all.totalToday === null ? 0 : all.totalToday}
            </span>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
          <Card style={{ ...style }}>
            <Statistic
              title="Número de Transacciones"
              value={all.TransAll}
              valueStyle={{
                color: "#3f8600",
              }}
            />
            <Divider style={{ margin: 10 }} />
            <span>
              <strong>Transacciones del día: </strong>
              {all.TransToday}
            </span>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
          <Card style={{ ...style }}>
            <Statistic
              title="Número de Pedidos en Proceso"
              value={all.OrderAll}
              valueStyle={{
                color: "#3f8600",
              }}
            />
            <Divider style={{ margin: 10 }} />
            <span>
              <strong>Pedidos del día : </strong>
              {all.OrderToday}
            </span>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}>
          <Card style={{ ...style }}>
            <Statistic
              title="Número de Usuarios"
              value={all.userAll}
              valueStyle={{
                color: "#3f8600",
              }}
            />
            <Divider style={{ margin: 10 }} />
            <span>
              <strong>Usuarios Nuevos: </strong>
              {all.userToday}
            </span>
          </Card>
        </Col>
      </Row>
      <br />
      <Card
        style={{ ...style, width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        tabBarExtraContent={extra}
      >
        {activeTabKey1 === "tab1" ? (
          <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={sales}>
            <LineAdvance shape="smooth" point area position="dia*total" />
          </Chart>
        ) : (
          <Chart height={300} autoFit data={books}>
            <Interval
              position="titulo*cantidad"
              style={{ lineWidth: 4, stroke: getTheme().colors10[0] }}
            />
            <Tooltip shared />
          </Chart>
        )}
      </Card>
    </>
  );
}
