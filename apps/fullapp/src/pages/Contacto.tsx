import type React from "react"
import { Typography, Image } from "antd"
import { useIsMobile } from "../hooks/useWindowSize"
import { Space } from "antd"
import { nosotrosStyles } from "./pages.styles"
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined } from "@ant-design/icons"
import { initialContacto } from "../components/admin/admin.constants";

const { Paragraph } = Typography

const Contacto: React.FC = () => {
    const isMobile = useIsMobile(768);

    return (
        <div
            style={nosotrosStyles.contactoWraper(isMobile)}
        >
            <div style={{ textAlign: "center" }}>
                <div>
                    <Image
                        src="/logonanoblanco.png"
                        alt="Nanoshop Logo"
                        style={nosotrosStyles.logoImage(isMobile)}
                        preview={false}
                    />
                </div>
                <Space direction="vertical" size="large" style={{ width: "100%", paddingBottom: "32px" }}>
                    {initialContacto.filter(item => item.key !== "mapa").map(item => (
                        <Space
                            key={item.key}
                            align="start"
                            style={nosotrosStyles.contactoDescription(isMobile)}
                        >
                            {item.key === "direccion" || item.key === "ciudad" ? (
                                <div>
                                    <div>
                                        <EnvironmentOutlined style={{ color: "#60a5fa" }} /> {initialContacto.find(i => i.key === "direccion")?.value}
                                    </div>
                                    <div>{initialContacto.find(i => i.key === "ciudad")?.value}</div>
                                </div>
                            ) : item.key === "horario" ? (
                                <div>
                                    <div>
                                        <ClockCircleOutlined style={{ color: "#60a5fa" }} /> {item.value}
                                    </div>
                                </div>
                            ) : item.key === "email" ? (
                                <span>
                                    <MailOutlined style={{ color: "#60a5fa" }} /> {item.value}
                                </span>
                            ) : null}
                        </Space>
                    ))}
                </Space>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.334927203064!2d-64.49327468485344!3d-31.42008338139951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bdfb7e6e3e0b%3A0x6e8e2e7e7e7e7e7e!2sRoque%20Saenz%20Pe%C3%B1a%20157%2C%20Villa%20Carlos%20Paz%2C%20C%C3%B3rdoba%2C%20Argentina!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: "8px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

            </div>
        </div>
    )
}

export default Contacto