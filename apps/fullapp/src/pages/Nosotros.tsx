import type React from "react"
import { Typography, Image } from "antd"
import { useIsMobile } from "../hooks/useWindowSize"
import { Space } from "antd"

const {  Paragraph } = Typography

const Nosotros: React.FC = () => {
    const isMobile = useIsMobile(768);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: isMobile ? `linear-gradient(to bottom, #333 0%, #333 21%, #eeeeeeff 21%, #eeeeeeff 100%)` : `linear-gradient(to bottom, #333 0%, #333 35%, #eeeeeeff 35%, #eeeeeeff 100%)`,
                display: "flex",
                justifyContent: "center",
                padding: "0px 24px 50px",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <div>
                    <div
                        style={{ marginBottom: 0}}
                    >
                        <Image
                            src="/logonanoblanco.png"
                            alt="Nanoshop Logo"
                            style={{ width: isMobile ? "40%" : "50%" }}
                            preview={false}
                        />
                    </div>
                        <Image
                            //recomendacion imagen que tenga mas ancho que alto
                            src="/local.jpeg"
                            alt="Equipo de TechStore"
                            style={{
                                maxHeight: "400px",
                                maxWidth: "%",
                                borderRadius: "5px",
                                marginBottom: "48px",
                                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                            }}
                            preview={false}
                      />
                </div>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Paragraph
                        style={{
                            fontSize: isMobile ? "14px" : "18px",
                            lineHeight: "1.7",
                            color: "#2c3e50",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Somos un equipo completamente distribuido de 3 personas apasionadas por la tecnología, trabajando desde
                        Argentina. Nos dedicamos a construir los mejores productos para ayudar a nuestros clientes a hacer crecer
                        sus negocios con tecnología de vanguardia.
                    </Paragraph>

                    <Paragraph
                        style={{
                            fontSize: isMobile ? "14px" : "18px",
                            lineHeight: "1.7",
                            color: "#2c3e50",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        Desde nuestros inicios, siempre hemos tenido el objetivo de hacer las cosas de manera diferente en
                        TechStore. Nos enfocamos en crear una de las experiencias de compra más únicas y satisfactorias, repensando
                        muchas de las prácticas tradicionales del retail.
                    </Paragraph>
                </Space>
            </div>
        </div>
    )
}

export default Nosotros