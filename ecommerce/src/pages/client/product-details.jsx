import { Card, Col, Row, Image, Button, Carousel, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import book from "../../assets/images/book1.png";
const { Meta } = Card;

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Implementar la lógica para agregar el producto al carrito
  };

  const onChange = () => {};
  return (
    <div className="container-fluid" style={{ padding: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Carousel afterChange={onChange}>
            <div style={{ width: "100%", height: 300 }}>
              <img src={book} alt="book" />
            </div>
          </Carousel>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Meta
              title="Don Quijote de la Mancha"
              description="Esta obra es considerada una obra maestra de la literatura española y mundial, y ha tenido un impacto duradero en la cultura popular."
            />
            <br />
            <h3>Genero: Novela</h3>
            <br />
            <h3>Autor: Miguel de Cervantes</h3>
            <br />
            <h3>Precio: Bs. 49.99</h3>
            <br />
            <Space>
              <h3>Cantidad:</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  shape="circle"
                  size="small"
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  -
                </Button>
                <div style={{ padding: "0 1rem" }}>{quantity}</div>
                <Button
                  shape="circle"
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </Space>
            <br />
            <br />
            <Button
              type="primary"
              block
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
