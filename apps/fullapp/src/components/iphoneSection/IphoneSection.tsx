import { Card, Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { iphoneStyles } from "./iphones.styles";
import type { Producto } from "@/pages/Productos/types/producto";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

interface Props {
  productos: Producto[];
}

const IphoneSection = ({ productos }: Props) => {
  const {
    sectionStyle,
    bannerStyle,
    categoryStyle,
    titleStyle,
    exploreRowStyle,
    exploreLabelStyle,
    arrowsStyle,
    cardStyle,
    imageContainerStyle,
    imageStyle,
    priceContainerStyle,
    priceStyle,
    oldPriceStyle,
    containerPriceWithDiscount
  } = iphoneStyles;

  // 🔥 Solo iphones
  const iphones = productos.filter((p) =>
    p.nombre.toLowerCase().includes("iphone")
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll manual
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const width = 300;

    carouselRef.current.scrollBy({
      left: direction === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  // 🔁 Auto scroll infinito
  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;

      const el = carouselRef.current;

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={sectionStyle}>
      {/* Banner */}
      <div style={bannerStyle}>
        <Text style={categoryStyle}>CATEGORIA</Text>
        <Title level={1} style={titleStyle}>
          IPHONE
        </Title>
      </div>

      {/* Explore */}
      <div style={exploreRowStyle}>
        <div>
          <Text style={exploreLabelStyle}>EXPLORA</Text>
          <Title level={4} style={{ margin: 0 }}>
            Ver todos
          </Title>
        </div>

        <div style={arrowsStyle}>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => scroll("left")}
          />
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => scroll("right")}
          />
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        ref={carouselRef}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {iphones.map((producto) => {
          const precioFinal = producto.descuento
            ? Math.round(
                producto.precio -
                  (producto.precio * producto.descuento) / 100
              )
            : producto.precio;

          return (
            <motion.div
              key={producto.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                minWidth: 260,
                scrollSnapAlign: "start",
                cursor: "grab",
              }}
            >
                <Card
                  hoverable
                  style={cardStyle}
                  bodyStyle={{ padding: 16 }}
                  cover={
                    <div style={imageContainerStyle}>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={imageStyle}
                      />
                    </div>
                  }
                >
                  <Title level={5} style={{ marginBottom: 4 }}>
                    {producto.nombre}
                  </Title>

                  <div style={priceContainerStyle}>
                    {producto.descuento ? (
                      <>
                        <div style={containerPriceWithDiscount}>
                            <Title level={4} style={priceStyle}>
                            USD {precioFinal.toLocaleString()}
                            </Title>
                            
                                <span
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#00a650",
                                }}
                            >
                                {producto.descuento}% OFF
                            </span>
                        </div>

                        <Text
                            delete
                            style={{
                            ...oldPriceStyle,
                            marginRight: 8,
                            }}
                        >
                            USD {producto.precio.toLocaleString()}
                        </Text>

                      </>
                    ) : (
                      <Title level={4} style={priceStyle}>
                        USD {producto.precio.toLocaleString()}
                      </Title>
                    )}
                  </div>
                </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default IphoneSection;
