import React from "react";
import { Modal, Button, Typography, Divider, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";

const { Text } = Typography;

export interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const totalDescuento = cart.reduce((acc, item) => {
    const descuentoItem =
      (item.precio * item.descuento) / 100 * item.cantidad;
    return acc + descuentoItem;
  }, 0);

  const totalFinal = subtotal - totalDescuento;

  const formatPrice = (value: number) =>
    value.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
    });

  const getWhatsappMessage = () => {
    let message = "¡Hola! Quiero finalizar mi compra:%0A%0A";

    cart.forEach((item) => {
      const subtotalItem =
        item.precio * item.cantidad;

      message += `• ${item.nombre}%0A`;
      message += `Precio unitario: $${formatPrice(item.precio)}%0A`;
      message += `Cantidad: ${item.cantidad}%0A`;
      message += `Subtotal: $${formatPrice(subtotalItem)}%0A%0A`;
    });

    message += `Subtotal: $${formatPrice(subtotal)}%0A`;
    message += `Descuentos: -$${formatPrice(totalDescuento)}%0A`;
    message += `Total final: $${formatPrice(totalFinal)}`;

    return message;
  };

  const handleFinish = () => {
    const url = `https://wa.me/543541214015?text=${getWhatsappMessage()}`;
    window.open(url, "_blank");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      title={
        <Text style={{ color: "#fff", fontSize: 18 }}>
          🛒 Mi Carrito
        </Text>
      }
      styles={{
        header: {
          backgroundColor: "transparent",
          borderBottom: "1px solid #333",
        },
        content: {
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
          borderRadius: "14px",
          border: "1px solid #333",
          color: "#fff",
        },
      }}
    >
      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "30px 0" }}
        >
          <Text style={{ color: "#aaa" }}>
            Tu carrito está vacío.
          </Text>
        </motion.div>
      ) : (
        <>
          {/* HEADER COLUMNAS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
              gap: 12,
              paddingBottom: 10,
              borderBottom: "1px solid #333",
              marginBottom: 10,
              fontSize: 13,
              color: "#888",
              fontWeight: 600,
            }}
          >
            <div>Producto</div>
            <div>Precio U.</div>
            <div>Cantidad</div>
            <div>Subtotal</div>
            <div></div>
          </div>

          {/* ITEMS */}
          <AnimatePresence>
            {cart.map((item) => {
              const subtotalItem =
                item.precio * item.cantidad;

              const precioFinal =
                item.precio -
                (item.precio * item.descuento) / 100;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "2fr 1fr 1fr 1fr 40px",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 0",
                    borderBottom:
                      "1px solid #2f2f2f",
                  }}
                >
                  {/* PRODUCTO */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{
                        width: 55,
                        height: 55,
                        objectFit: "cover",
                        borderRadius: 8,
                        background: "#fff",
                      }}
                    />
                    <Text style={{ color: "#fff" }}>
                      {item.nombre}
                    </Text>
                  </div>

                  {/* PRECIO UNITARIO */}
                  <div>
                    {item.descuento > 0 ? (
                      <>
                        <div
                          style={{
                            textDecoration:
                              "line-through",
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          $
                          {formatPrice(
                            item.precio
                          )}
                        </div>
                        <Text
                          style={{
                            color: "#52c41a",
                          }}
                        >
                          $
                          {formatPrice(
                            precioFinal
                          )}
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={{ color: "#aaa" }}
                      >
                        $
                        {formatPrice(
                          item.precio
                        )}
                      </Text>
                    )}
                  </div>

                  {/* CANTIDAD */}
                  <InputNumber
                    min={1}
                    value={item.cantidad}
                    onChange={(value) =>
                      updateQuantity(
                        item.id,
                        value || 1
                      )
                    }
                    size="small"
                  />

                  {/* SUBTOTAL */}
                  <Text
                    strong
                    style={{ color: "#fff" }}
                  >
                    $
                    {formatPrice(
                      subtotalItem
                    )}
                  </Text>

                  {/* BORRAR */}
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    danger
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <Divider style={{ borderColor: "#333" }} />

          {/* RESUMEN */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Subtotal
              </Text>
              <Text style={{ color: "#fff" }}>
                $
                {formatPrice(subtotal)}
              </Text>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginTop: 6,
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Descuentos
              </Text>
              <Text
                style={{
                  color: "#52c41a",
                }}
              >
                -$
                {formatPrice(
                  totalDescuento
                )}
              </Text>
            </div>

            <Divider style={{ borderColor: "#333" }} />

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <Text
                strong
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                Total
              </Text>
              <Text
                strong
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                $
                {formatPrice(
                  totalFinal
                )}
              </Text>
            </div>
          </div>

          {/* BOTONES */}
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: 20,
              height: 48,
              fontWeight: 600,
            }}
            onClick={handleFinish}
          >
            Finalizar compra por WhatsApp
          </Button>

          <Button
            danger
            type="text"
            style={{
              width: "100%",
              marginTop: 8,
            }}
            onClick={clearCart}
          >
            Vaciar carrito
          </Button>
        </>
      )}
    </Modal>
  );
};