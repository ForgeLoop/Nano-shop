import React from "react";
import { Modal, List, Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface CartItem {
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    imagen: string;
}

export interface CartModalProps {
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
            styles={{
                header: { backgroundColor: "transparent",   borderBottom: "none", textAlign: "center"},
                content: {
                    backgroundColor: "#444",
                    background: 'linear-gradient(135deg, #1a1a1aff 0%, #333 100%)',
                    borderColor: "#555",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    color: "#fff",
                    borderRadius: "5px"
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
                    <div style={{ textAlign: "right", padding: "16px 0" }}>
                        <Text strong style={{ color: "#fff", fontSize: 16 }}>Total: ${total}</Text>
                    </div>
                    <Button
                        type="primary"
                        style={{ background: "#1890ff", color: "#fff", width: "80%", margin: "16px auto", display: "block" }} onClick={handleFinish}>
                        Finalizar compra
                    </Button>
                </>
            )}
        </Modal>
    );
};