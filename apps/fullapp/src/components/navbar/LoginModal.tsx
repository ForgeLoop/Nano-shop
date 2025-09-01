import React, { useState } from "react";
import { Modal, Button, Input, Form, Typography, Divider, Space, DatePicker } from "antd";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

export const LoginModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const handleLogin = (values: any) => {
        setLoading(true);
        // Tu lógica de login
        setTimeout(() => {
            setLoading(false);
            onClose();
        }, 1500);
    };

    const handleRegister = (values: any) => {
        setLoading(true);
        // Tu lógica de registro
        setTimeout(() => {
            setLoading(false);
            onClose();
        }, 1500);
    };

    const handleGoogleLogin = () => {
        // Tu lógica de login/registro con Google
        window.open("https://accounts.google.com/signin", "_blank");
    };

    return (
        <Modal
            open={open}
            onCancel={() => {
                setIsRegister(false);
                onClose();
            }}
            footer={null}
            centered
            title={
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "normal" }}>
                    {isRegister ? "Registro" : "Iniciar sesión"}
                </Text>
            }
            width={350}
            styles={{
                header: {
                    color: "#fff",
                    backgroundColor: "#444",
                    borderBottom: "none",
                    padding: "16px"
                },
                content: {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "#444",
                    borderColor: "#555",
                    boxShadow: "none",
                    color: "#fff",
                    textAlign: "center",
                }
            }}
        >
            <Form layout="vertical" onFinish={isRegister ? handleRegister : handleLogin} style={{ width: "80%", margin: "0 auto" }}>
                {isRegister ? (
                    <>
                        <Form.Item
                            name="nombre"
                            rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nombre" />
                        </Form.Item>
                        <Form.Item
                            name="apellido"
                            rules={[{ required: true, message: "Por favor ingresa tu apellido" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Apellido" />
                        </Form.Item>
                        <Form.Item
                            name="fechaNacimiento"
                            rules={[{ required: true, message: "Por favor selecciona tu fecha de nacimiento" }]}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Fecha de nacimiento" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Por favor ingresa tu email" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                        </Form.Item>
                        <Form.Item
                            name="repeatPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Por favor repite tu contraseña" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Repetir contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                style={{ backgroundColor: "#555", boxShadow: "0 2px 8px rgba(85,85,85,0.25)", border: "none", color: "#fff" }}
                            >
                                Registrarse
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <div style={{ textAlign: "center", marginTop: 8 }}>
                                    <Text style={{ color: "#fff" }}>¿Ya tienes una cuenta? </Text>
                                    <Link style={{ color: "#1890ff" }} onClick={() => setIsRegister(false)}>
                                        Iniciar sesión
                                    </Link>
                                </div>
                                <Divider plain>o</Divider>
                                <Button
                                    icon={<GoogleOutlined />}
                                    block
                                    style={{ background: "#fff", color: "#444", border: "1px solid #ddd" }}
                                    onClick={handleGoogleLogin}
                                >
                                    Registrarse con Google
                                </Button>
                            </Space>
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Por favor ingresa tu email" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                style={{ backgroundColor: "#555", boxShadow: "0 2px 8px rgba(85,85,85,0.25)", border: "none", color: "#fff" }}
                            >
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Link style={{}} onClick={() => alert("Recuperar contraseña")}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                                <div style={{ textAlign: "center", marginTop: 8 }}>
                                    <Text style={{ color: "#fff" }}>¿Aún no tienes una cuenta? </Text>
                                    <Link style={{ color: "#1890ff" }} onClick={() => setIsRegister(true)}>
                                        Registrate
                                    </Link>
                                </div>
                                <Divider plain>o</Divider>
                                <Button
                                    icon={<GoogleOutlined />}
                                    block
                                    style={{ background: "#fff", color: "#444", border: "1px solid #ddd" }}
                                    onClick={handleGoogleLogin}
                                >
                                    Iniciar sesión con Google
                                </Button>
                            </Space>
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    );
};