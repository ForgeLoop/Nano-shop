import type React from "react"
import { useLayoutEffect, useRef, useState } from "react"
import { Card, Typography, Row, Col, Space } from "antd"
import {
    TruckOutlined,
    CreditCardOutlined,
    CustomerServiceOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    MailOutlined,
    InstagramOutlined,
    GlobalOutlined,
    StarOutlined,
} from "@ant-design/icons"
import { useIsMobile } from "../../hooks/useWindowSize"

const { Title, Text, Link } = Typography

const Footer: React.FC = () => {
    const isMobile = useIsMobile(768);
    const logoDivRef = useRef<HTMLDivElement>(null);
    const [logoDivHeight, setLogoDivHeight] = useState<number>(0);

    useLayoutEffect(() => {
        if (logoDivRef.current) {
            setLogoDivHeight(logoDivRef.current.offsetHeight);
        }
    }, [isMobile]);

    return (
        <footer style={{ backgroundColor: "#333", color: "white" }}>
            <div style={{ maxWidth: isMobile ? "100%" : "55%", margin: "0 auto", padding: isMobile ? "24px 4px 12px" : "32px 0px 24px" }}>
                <Row gutter={isMobile ? [4, 4] : [24, 24]} style={{ marginBottom: "28px" }}>
                    <Col xs={8} md={8}>
                        <Card
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#444",
                                borderColor: "#555",
                                textAlign: "center",
                                height: "100%",
                            }}
                            styles={{
                                body: {
                                    padding: isMobile ? 2 : undefined, // Ajusta según tu diseño
                                },
                            }}
                        >
                            <TruckOutlined style={{ fontSize: "32px", color: "#60a5fa", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "white", marginBottom: "8px", fontSize: isMobile ? "14px" : "22px" }}>
                                Realizamos Envíos
                            </Title>
                            <Text style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                Envíos a todo el país con seguimiento en tiempo real
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={8} md={8}>
                        <Card
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#444",
                                borderColor: "#555",
                                textAlign: "center",
                                height: "100%",
                            }}
                            styles={{
                                body: {
                                    padding: isMobile ? 2 : undefined, // Ajusta según tu diseño
                                },
                            }}
                        >
                            <CreditCardOutlined style={{ fontSize: "32px", color: "#60a5fa", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "white", marginBottom: "8px", fontSize: isMobile ? "14px" : "22px" }}>
                                Métodos de Pago
                            </Title>
                            <Text style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                Tarjetas, transferencias y financiación disponible
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={8} md={8}>
                        <Card
                            style={{
                                borderRadius: "5px",
                                backgroundColor: "#444",
                                borderColor: "#555",
                                textAlign: "center",
                                height: "100%",
                            }}
                            styles={{
                                body: {
                                    padding: isMobile ? 3 : undefined, // Ajusta según tu diseño
                                },
                            }}
                        >
                            <CustomerServiceOutlined style={{ fontSize: "32px", color: "#60a5fa", marginBottom: "16px" }} />
                            <Title level={4} style={{ color: "white", marginBottom: "8px", fontSize: isMobile ? "14px" : "22px" }}>
                                Soporte
                            </Title>
                            <Text style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                Atención personalizada y garantía en todos nuestros productos
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Main Footer Content */}
            <div style={{ maxWidth: isMobile ? "100%" : "55%", margin: "0 auto", padding: "12px 16px 36px" }}>
                <Row gutter={[32, 32]}>
                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={{ width: "100%", padding: "10px" }}  >
                            <div
                                ref={logoDivRef}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    height: '100%',
                                    marginBottom: '16px',
                                }}>
                                <Link href="/" style={{ textDecoration: 'none' }}>
                                    <img
                                        src="/logonanoblanco2.png"
                                        alt="Nanoshop Logo2"
                                        style={{
                                            objectFit: 'contain' as const,
                                            display: 'block',
                                            height: 'auto',
                                            width: '120px',
                                        }}
                                    />
                                </Link>
                            </div>
                            <Text style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px", lineHeight: "1.6" }}>
                                Tu tienda de confianza para tecnología de última generación. Productos originales con garantía y el
                                mejor servicio.
                            </Text>

                            <Space direction="vertical" size="small">
                                <Space align="start" style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    <EnvironmentOutlined style={{ color: "#60a5fa" }} />
                                    <div>
                                        <div>Roque Saenz Peña 157</div>
                                        <div>Villa Carlos Paz, Córdoba, Argentina</div>
                                    </div>
                                </Space>

                                <Space align="start" style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    <ClockCircleOutlined style={{ color: "#60a5fa" }} />
                                    <div>
                                        <div>Lunes a Sabado de:</div>
                                        <div>9:00 - 13:00 y 16:30 - 20:30</div>
                                    </div>
                                </Space>

                                <Space style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    <MailOutlined style={{ color: "#60a5fa" }} />
                                    <span>nanoshop.it@gmail.com</span>
                                </Space>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={{ width: "100%", padding: "10px", }}>
                            <Title level={4} style={{ color: "white", marginBottom: "16px", minHeight: logoDivHeight || undefined, display: "flex", alignItems: "flex-end" }}>
                                Categorías
                            </Title>
                            <Space direction="vertical" size="small">
                                {["iPhone", "iPad", "Apple Watch", "MacBook", "AirPods", "Samsung", "Xiaomi", "Accesorios"].map(
                                    (category) => (
                                        <Link
                                            key={category}
                                            href="#"
                                            style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}
                                            className="hover:text-blue-400"
                                        >
                                            {category}
                                        </Link>
                                    ),
                                )}
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={{ width: "100%", padding: "10px" }}>
                            <Title level={4} style={{
                                color: "white", marginBottom: "16px", minHeight: logoDivHeight || undefined, display: "flex", alignItems: "flex-end"
                            }}>
                                Información
                            </Title>
                            <Space direction="vertical" size="small">
                                <Link href="#" style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    Home
                                </Link>
                                <Link href="#" style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    Contacto
                                </Link>
                                <Link href="#" style={{ color: "#d1d5db", fontSize: isMobile ? "12px" : "14px" }}>
                                    Acerca de
                                </Link>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={{ width: "100%", padding: "10px" }}>
                            <Title level={4} style={{ color: "white", marginBottom: "16px", minHeight: logoDivHeight || undefined, display: "flex", alignItems: "flex-end" }}>
                                Seguinos en:
                            </Title>
                            <Space direction="vertical" size="middle">
                                <Space size="small">
                                    <Link
                                        href="https://instagram.com/nanoshop_it"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block" }}
                                    >
                                        <img
                                            src="/instagram.png" // Cambia por la ruta real de tu icono en public
                                            alt="instagram"
                                            style={{ width: "auto", height: "30px", marginRight: 8, verticalAlign: "middle" }}
                                        />
                                    </Link>
                                    <Link
                                        href="https://instagram.com/nanoshop_it"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block" }}
                                    >
                                        <img
                                            src="/google.png" // Cambia por la ruta real de tu icono en public
                                            alt="google"
                                            style={{ width: "auto", height: "30px", marginRight: 8, verticalAlign: "middle" }}
                                        />
                                    </Link>
                                </Space>

                                <Link
                                    href="https://www.google.com/search?q=nanoshop+reviews"
                                    target="_blank"
                                    style={{ color: "#9ca3af" }}
                                    className="hover:text-yellow-400"
                                >
                                    <Space>
                                        <img
                                            src="/google-reviews.png" // Cambia por la ruta real de tu icono en public
                                            alt="Google Reviews"
                                            style={{ width: "auto", height: "48px", marginRight: 8, verticalAlign: "middle" }}
                                        />
                                    </Space>
                                </Link>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
            {/* Copyright */}
            <div style={{ backgroundColor: "#222", borderTop: "1px solid #555" }}>
                <div style={{ maxWidth: isMobile ? "100%" : "55%", margin: "0 auto", padding: "16px", textAlign: "center" }}>
                    <Text style={{ fontSize: "14px", color: "#9ca3af" }}>
                        &copy; 2025 ForgeLoop. Todos los derechos reservados.
                    </Text>
                </div>
            </div>
        </footer >
    )
}

export default Footer