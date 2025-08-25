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
} from "@ant-design/icons"
import { useIsMobile } from "../../hooks/useWindowSize"
import { footerStyles } from "./footer.styles"
import { Image } from "antd"

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
        <footer style={footerStyles.wrapper}>
            <div style={footerStyles.container(isMobile)}>
                <Row gutter={isMobile ? [4, 4] : [24, 24]} >
                    <Col xs={8} md={8}>
                        <Card
                            style={footerStyles.card}
                            styles={{
                                body: {
                                    padding: footerStyles.cardBody(isMobile).padding,
                                },
                            }}
                        >
                            <TruckOutlined style={footerStyles.icon} />
                            <Title level={4} style={footerStyles.cardTitle(isMobile)}>
                                Realizamos Envíos
                            </Title>
                            <Text style={footerStyles.description(isMobile)}>
                                Envíos a todo el país con seguimiento en tiempo real
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={8} md={8}>
                        <Card
                            style={footerStyles.card}
                            styles={{
                                body: {
                                    padding: footerStyles.cardBody(isMobile).padding,
                                },
                            }}
                        >
                            <CreditCardOutlined style={footerStyles.icon} />
                            <Title level={4} style={footerStyles.cardTitle(isMobile)}>
                                Métodos de Pago
                            </Title>
                            <Text style={footerStyles.description(isMobile)}>
                                Tarjetas, transferencias y financiación disponible
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={8} md={8}>
                        <Card
                            style={footerStyles.card}
                            styles={{
                                body: {
                                    padding: footerStyles.cardBody(isMobile).padding,
                                },
                            }}
                        >
                            <CustomerServiceOutlined style={footerStyles.icon} />
                            <Title level={4} style={footerStyles.cardTitle(isMobile)}>
                                Soporte
                            </Title>
                            <Text style={footerStyles.description(isMobile)}>
                                Atención personalizada y garantía en todos nuestros productos
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Main Footer Content */}
            <div style={footerStyles.container(isMobile)}>
                <Row gutter={[32, 32]}>
                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={footerStyles.mainContentSpace}  >
                            <div
                                ref={logoDivRef}
                                style={footerStyles.logoDiv}>
                                <Link href="/" style={{ textDecoration: 'none' }}>
                                    <Image
                                        src="/logonanoblanco2.png"
                                        alt="Nanoshop Logo2"
                                        style={footerStyles.logoImg}
                                        preview={false}
                                    />
                                </Link>
                            </div>
                            <Text style={footerStyles.description(isMobile)}>
                                Tu tienda de confianza para tecnología de última generación. Productos originales con garantía y el
                                mejor servicio.
                            </Text>

                            <Space direction="vertical" size="small">
                                <Space align="start" style={footerStyles.description(isMobile)}>
                                    <EnvironmentOutlined style={{ color: "#60a5fa" }} />
                                    <div>
                                        <div>Roque Saenz Peña 157</div>
                                        <div>Villa Carlos Paz, Córdoba, Argentina</div>
                                    </div>
                                </Space>

                                <Space align="start" style={footerStyles.description(isMobile)}>
                                    <ClockCircleOutlined style={{ color: "#60a5fa" }} />
                                    <div>
                                        <div>Lunes a Sabado de:</div>
                                        <div>9:00 - 13:00 y 16:30 - 20:30</div>
                                    </div>
                                </Space>

                                <Space style={footerStyles.description(isMobile)}>
                                    <MailOutlined style={{ color: "#60a5fa" }} />
                                    <span>nanoshop.it@gmail.com</span>
                                </Space>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={footerStyles.mainContentSpace}>
                            <Title level={4} style={footerStyles.sectionTitle(isMobile, logoDivHeight || undefined)}>
                                Categorías
                            </Title>
                            <Space direction="vertical" size="small">
                                {["iPhone", "iPad", "Apple Watch", "MacBook", "AirPods", "Samsung", "Xiaomi", "Accesorios"].map(
                                    (category) => (
                                        <Link
                                            key={category}
                                            href="#"
                                            style={footerStyles.link(isMobile)}
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
                        <Space direction="vertical" size="middle" style={footerStyles.mainContentSpace}>
                            <Title level={4} style={footerStyles.sectionTitle(isMobile, logoDivHeight || undefined)}>
                                Información
                            </Title>
                            <Space direction="vertical" size="small">
                                <Link href="#" style={footerStyles.link(isMobile)}>
                                    Home
                                </Link>
                                <Link href="#" style={footerStyles.link(isMobile)}>
                                    Contacto
                                </Link>
                                <Link href="/nosotros" style={footerStyles.link(isMobile)}>
                                    Acerca de
                                </Link>
                            </Space>
                        </Space>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Space direction="vertical" size="middle" style={footerStyles.mainContentSpace}>
                            <Title level={4} style={footerStyles.sectionTitle(isMobile, logoDivHeight || undefined)}>
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
                                        <Image
                                            src="/instagram.png" // Cambia por la ruta real de tu icono en public
                                            alt="instagram"
                                            style={{...footerStyles.mediaIcons, height: "30px" }}
                                            preview={false}
                                        />
                                    </Link>
                                    <Link
                                        href="https://instagram.com/nanoshop_it"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block" }}
                                    >
                                        <Image
                                            src="/google.png" // Cambia por la ruta real de tu icono en public
                                            alt="google"
                                            style={{ ...footerStyles.mediaIcons, height: "30px" }}
                                            preview={false}
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
                                        <Image
                                            src="/google-reviews.png" // Cambia por la ruta real de tu icono en public
                                            alt="Google Reviews"
                                            style={{ ...footerStyles.mediaIcons, height: "48px" }}
                                            preview={false}
                                        />
                                    </Space>
                                </Link>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
            {/* Copyright */}
            
                <div style={footerStyles.copyright}>
                    <Text style={footerStyles.copyrightText}>
                        &copy; 2025 ForgeLoop. Todos los derechos reservados.
                    </Text>
                </div>
           
        </footer >
    )
}

export default Footer