import { Button, Col, Input, Row, Select, Space } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const products = [
  {
    key: "1",
    image: require("../../assets/images/book1.png"),
    title:
      "Fairy Clean & Fresh Washing Up Liquid Pomegranate &amp; Honeysuckle 520 ml",
    price: "Bs 70.00",
  },
  {
    key: "2",
    image: require("../../assets/images/book4.jpg"),
    title: "Colgate Triple Action Toothpaste 100ml",
    price: "Bs 50.00",
  },
  {
    key: "3",
    image: require("../../assets/images/book7.jpg"),
    title: "Breeze Toilet Tissue Soft White 24 Roll",
    price: "Bs 340.00",
  },
  {
    key: "4",
    image: require("../../assets/images/book1.png"),
    title: "Comfort intense Fresh Sky Fabric Conditioner Liquid 60 Wash 900 ML",
    price: "Bs 40.00",
  },
  {
    key: "5",
    image: require("../../assets/images/book2.jpg"),
    title:
      "Fairy Clean & Fresh Washing Up Liquid Pomegranate &amp; Honeysuckle 520 ml",
    price: "Bs 70.00",
  },
  {
    key: "6",
    image: require("../../assets/images/book3.jpg"),
    title: "Colgate Triple Action Toothpaste 100ml",
    price: "Bs 50.00",
  },
  {
    key: "7",
    image: require("../../assets/images/book6.jpg"),
    title: "Breeze Toilet Tissue Soft White 24 Roll",
    price: "Bs 340.00",
  },
  {
    key: "8",
    image: require("../../assets/images/book1.png"),
    title: "Comfort intense Fresh Sky Fabric Conditioner Liquid 60 Wash 900 ML",
    price: "Bs 40.00",
  },
];

export default function HomeC() {
  const [searchType, setSearchType] = useState("TODO");

  const onSearch = async (value) => {
    console.log(value);
  };

  return (
    <div className="container-fluid">
      <Space>
        <Select value={searchType} onChange={(value) => setSearchType(value)}>
          <Option value="todo">TODO</Option>
          <Option value="nro_pedido">Según nro</Option>
          <Option value="fecha">Según fecha</Option>
        </Select>

        <Input.Search
          placeholder="Introducir el autor/editorial/titulo..."
          onSearch={onSearch}
          enterButton
          style={{ width: 300 }}
        />
      </Space>
      <br />
      <br />
      <h2>Libros</h2>
      <Row gutter={[24, 24]}>
        {products.map((product) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              lg={{ span: 6 }}
              key={product.key}
            >
              <div className="content">
                <div className="image">
                  <img src={product.image} alt="product" />
                </div>
                <h3>{product.title}</h3>
                <div className="price">{product.price}</div>
                <Button type="primary">Detalle</Button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
