import type React from "react"
import { Typography, Image } from "antd"
import { useIsMobile } from "../hooks/useWindowSize"
import { Space } from "antd"
import { nosotrosStyles } from "./pages.styles"

const {  Paragraph } = Typography

const Nosotros: React.FC = () => {
    const isMobile = useIsMobile(768);

    return (
        <div
            style={nosotrosStyles.wrapper(isMobile)}
        >
            <div style={{ textAlign: "center" }}>
                <div>
                    <div>
                        <Image
                            src="/logonanoblanco.png"
                            alt="Nanoshop Logo"
                            style={nosotrosStyles.logoImage(isMobile)}
                            preview={false}
                        />
                    </div>
                        <Image
                            //recomendacion imagen que tenga mas ancho que alto
                            src="/local.jpeg"
                            alt="Equipo de TechStore"
                            style={nosotrosStyles.image}
                            preview={false}
                      />
                </div>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Paragraph
                        style={nosotrosStyles.description(isMobile)}
                    >
                        Somos un equipo completamente distribuido de 3 personas apasionadas por la tecnología, trabajando desde
                        Argentina. Nos dedicamos a construir los mejores productos para ayudar a nuestros clientes a hacer crecer
                        sus negocios con tecnología de vanguardia.
                    </Paragraph>

                    <Paragraph
                        style={nosotrosStyles.description(isMobile)}
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