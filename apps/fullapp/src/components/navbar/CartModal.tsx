import React from "react";
import { Modal, List, Button, Badge, Typography } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface CartItem {
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    imagen: string;
}

interface CartModalProps {
    open: boolean;
    onClose: () => void;
    cart: CartItem[];
    onRemove: (id: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ open, onClose, cart, onRemove }) => {
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Genera el mensaje para WhatsApp
    const getWhatsappMessage = () => {
        let message = "¡Hola! Quiero finalizar mi compra:%0A";
        cart.forEach(item => {
            message += `• ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}%0A`;
        });
        message += `Total: $${total}`;
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
            title={<Text style={{ color: "#fff", fontSize: 16, fontWeight: "normal" }}>Mi Carrito</Text>}
            width={400}
            styles={{
                header: { backgroundColor: "#444", borderBottom: "none", textAlign: "center", padding: "16px" },
                content: {
                    backgroundColor: "#444",
                    borderColor: "#555",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    color: "#fff",
                    borderRadius: "5px",
                },
            }}
        >
            {cart.length === 0 ? (
                <Text style={{ color: "#fff" }}>Tu carrito está vacío.</Text>
            ) : (
                <>
                    <List
                        itemLayout="horizontal"
                        dataSource={cart}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button
                                        icon={<DeleteOutlined />}
                                        style={{ color: "#fff", borderColor: "#555" }}
                                        type="text"
                                        onClick={() => onRemove(item.id)}
                                    />
                                ]}
                                style={{ color: "#fff" }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <img
                                            src={item.imagen}
                                            alt={item.nombre}
                                            style={{
                                                width: 48,
                                                height: 48,
                                                objectFit: "cover",
                                                borderRadius: 5,
                                                background: "#fff",
                                            }}
                                        />
                                    }
                                    title={<span style={{ color: "#fff" }}>{item.nombre}</span>}
                                    description={
                                        <span style={{ color: "#fff" }}>
                                            Cantidad: {item.cantidad} &nbsp;|&nbsp; ${item.precio * item.cantidad}
                                        </span>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <div style={{ textAlign: "right", marginTop: 16 }}>
                        <Text strong style={{ color: "#fff", fontSize: 16 }}>Total: ${total}</Text>
                    </div>
                    <Button type="primary" block style={{ marginTop: 16, background: "#1890ff", color: "#fff" }} onClick={handleFinish}>
                        Finalizar compra
                    </Button>
                </>
            )}
        </Modal>
    );
};