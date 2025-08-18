import type React from "react"
import { Row, Col, Card, Typography } from "antd"
import { productCategories } from "./grid.constants"
import { useIsMobile } from "../../hooks/useWindowSize"
import { gridStyles } from "./grid.styles"

const ProductCategoriesGrid: React.FC = () => {
    const isMobile = useIsMobile(768);
    return (
        <div style={gridStyles.wrapper(isMobile)}>
            <div style={gridStyles.inner(isMobile)}>
                <Row gutter={[8, 8]}>
                    {productCategories.map((category) => (
                        <Col
                            key={category.id}
                            xs={12} // 2 columnas en móvil
                            sm={12} // 2 columnas en tablet pequeño
                            md={8} // 3 columnas en tablet
                            lg={6} // 4 columnas en desktop
                            xl={6} // 4 columnas en desktop grande
                        >
                            <Card
                                hoverable
                                cover={
                                    <div style={gridStyles.cardCover(isMobile)}>
                                        <img
                                            alt={category.name}
                                            src={category.image || "/placeholder.svg?height=200&width=200&query=product category"}
                                            style={gridStyles.cardImage}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)"
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)"
                                            }}
                                        />
                                    </div>
                                }
                                style={gridStyles.card}
                                styles={{
                                    body: gridStyles.cardBody(isMobile),
                                }}
                            >
                                <Card.Meta
                                    title={
                                        <span style={gridStyles.cardTitle(isMobile)}>
                                            {category.name}
                                        </span>
                                    }
                                    description={
                                        <span style={gridStyles.cardDescription(isMobile)}>
                                            {category.description}
                                        </span>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default ProductCategoriesGrid
