import type React from "react"
import { Typography, Image } from "antd"
import { useIsMobile } from "@/hooks/useWindowSize"
import { Space } from "antd"
import { nosotrosStyles } from "@/pages/pages.styles"
import { initialNosotros } from "@/components/admin/admin.constants"

const { Paragraph } = Typography

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
                    {initialNosotros.map(parrafo => (
                        <Paragraph key={parrafo.key} style={nosotrosStyles.description(isMobile)}>
                            {parrafo.value}
                        </Paragraph>
                    ))}
                </Space>
            </div>
        </div>
    )
}

export default Nosotros