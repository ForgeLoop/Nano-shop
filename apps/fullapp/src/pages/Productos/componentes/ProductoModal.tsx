import { useState } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { Divider, InputNumber, Tag, Badge, Button } from "antd";
import {
  ShoppingCartOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Product } from "./ProductosGrid";

interface ProductModalProps {
  product: Product;
  handleAddToCart: (product: Product, cantidad?: number) => void;
  onClose?: () => void;
  cartQuantity?: number;
}

export const ProductModalContent: React.FC<ProductModalProps> = ({
  product,
  handleAddToCart,
  onClose,
  cartQuantity
}) => {
  const [selectedImage] = useState<string>(product.imagen);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);
  const stockDisponible: number = 5;

const handleAdd = () => {
  if (stockDisponible <= 0) return;

  handleAddToCart(product, quantity);

  setJustAdded(true);

  setTimeout(() => {
    setJustAdded(false);
  }, 2000);

  if (onClose) {
    setTimeout(() => {
      setQuantity(1);
      onClose();
    }, 2000);
  }
};

const handleDescuento = (product: Product) => {
  const descuento = product.descuento;
  const precioOriginal: number = product.precio;
  const precioFinal: number = Math.round(
    precioOriginal - (precioOriginal * descuento) / 100
  );

  return (
    <div style={{ marginBottom: 16 }}>
      <span
        style={{
          textDecoration: "line-through",
          color: "#999",
          marginRight: 12,
          fontSize: 18,
        }}
      >
        ${precioOriginal.toLocaleString()}
      </span>

      <span
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#1677ff",
        }}
      >
        ${precioFinal.toLocaleString()}
      </span>

      <Tag color="red" style={{ marginLeft: 12 }}>
        -{descuento}%
      </Tag>
    </div>
  );
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        gap: 48,
        flexWrap: "wrap",
      }}
    >
      {/* IMAGEN */}
      <div style={{ flex: "1 1 420px" }}>
        <div
          style={{
            background: "#f5f5f7",
            padding: 32,
            borderRadius: 20,
            marginBottom: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.img
            src={selectedImage}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              maxHeight: 400,
              objectFit: "contain",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* INFO */}
      <div style={{ flex: "1 1 380px" }}>
        <Badge
          count={
            stockDisponible > 0
              ? `En stock (${stockDisponible})`
              : "Sin stock"
          }
          style={{
            backgroundColor:
              stockDisponible > 0 ? "#52c41a" : "#ff4d4f",
            marginBottom: 16,
          }}
        />

        <h2 style={{ fontSize: 30, marginBottom: 8 }}>
          {product.nombre}
        </h2>

        {/* Precio con descuento */}
        {
          product.descuento != 0 ? (
            handleDescuento(product)            
          ) : (
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1677ff",
              }}
            >
              ${product.precio.toLocaleString()}
            </span>
          )
        }

        <Divider />

        <p style={{ color: "#555", lineHeight: 1.7 }}>
          Potencia, diseño y rendimiento en un solo dispositivo.
          Pantalla avanzada, cámaras profesionales y batería
          optimizada para todo el día.
        </p>

        {/* Cantidad */}
        <div style={{ marginTop: 24 }}>
          <h4>Cantidad</h4>
          <InputNumber
            min={1}
            max={stockDisponible}
            value={quantity}
            onChange={(value) => setQuantity(value ?? 1)}
            style={{ width: 120 }}
            disabled={stockDisponible <= 0}
          />
        </div>
        <AnimatePresence>
          {(cartQuantity ?? 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ marginTop: 12 }}
            >
              <Tag
                color="green"
                style={{
                  fontSize: 14,
                  padding: "4px 10px",
                  borderRadius: 8,
                }}
              >
                ✔ Agregado al carrito ({cartQuantity})
              </Tag>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          type={justAdded ? "default" : "primary"}
          icon={
            justAdded ? <CheckOutlined /> : <ShoppingCartOutlined />
          }
          onClick={handleAdd}
          disabled={stockDisponible <= 0}
          style={{
            marginTop: 24,
            width: "100%",
            backgroundColor: justAdded ? "#52c41a" : "#1890ff",
            borderColor: justAdded ? "#52c41a" : "#1890ff",
            color: "#fff",
            transition: "all 0.3s ease",
          }}
        >
          {justAdded
            ? "¡Agregado!"
            : `Agregar ${quantity} al carrito`}
        </Button>
      </div>
    </motion.div>
  );
};
