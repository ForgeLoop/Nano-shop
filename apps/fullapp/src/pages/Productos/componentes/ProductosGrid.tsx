import { Card, Button, Badge } from "antd";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { productosGrid } from "@/pages/Productos/styles/productos.styles";
import { useCart } from "@/context/CartContext";
import { message } from "antd";
import { useState } from "react";

const ProductosGrid = ({ productos }: any) => {
  const { addToCart, cart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (producto: any) => {
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });

    // Mostrar mensaje de confirmación
    message.success(`${producto.nombre} agregado al carrito`);

    // Mostrar feedback visual temporal
    setAddedItems((prev) => new Set(prev).add(producto.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(producto.id);
        return newSet;
      });
    }, 2000);
  };

  const getProductQuantityInCart = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  };

  return (
    <motion.div layout style={productosGrid.motionContainer}>
      {productos.map((p: any) => {
        const quantityInCart = getProductQuantityInCart(p.id);
        const isJustAdded = addedItems.has(p.id);

        return (
          <motion.div
            layout
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Badge
              count={quantityInCart}
              offset={[-10, 10]}
              style={{
                backgroundColor: "#52c41a",
                display: quantityInCart > 0 ? "block" : "none",
              }}
            >
              <Card
                hoverable
                bordered={false}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                styles={{
                  body: {
                    padding: "16px",
                  },
                }}
                cover={
                  <div                     
                    style={{
                      width: "100%",
                      height: "240px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                    }}>
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                }
                actions={[
                  <Button
                    type={isJustAdded ? "default" : "primary"}
                    icon={
                      isJustAdded ? <CheckOutlined /> : <ShoppingCartOutlined />
                    }
                    onClick={() => handleAddToCart(p)}
                    style={{
                      width: "90%",
                      backgroundColor: isJustAdded ? "#52c41a" : "#1890ff",
                      borderColor: isJustAdded ? "#52c41a" : "#1890ff",
                      color: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isJustAdded ? "¡Agregado!" : "Agregar al carrito"}
                  </Button>,
                ]}
              >
                <h4 style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
                  {p.nombre}
                </h4>
                <span
                  style={{
                    fontSize: 13,
                    opacity: 0.7,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {p.color.charAt(0).toUpperCase() + p.color.slice(1)}
                </span>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    margin: 0,
                    color: "#1890ff",
                  }}
                >
                  ${p.precio.toLocaleString()}
                </p>
              </Card>
            </Badge>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductosGrid;
