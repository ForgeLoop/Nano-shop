import type React from "react"
import { Row, Col, Card } from "antd"
import { productCategories } from "./grid.constants"

const { Meta } = Card

const ProductCategoriesGrid: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: "80px"
                // Opcional, para mejor visual
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <Row gutter={[24, 24]}>
                    {productCategories.map((category) => (
                        <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <div
                                        style={{
                                            height: "250px",
                                            overflow: "hidden",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#f8fafc",
                                        }}
                                    >
                                        <img
                                            alt={category.name}
                                            src={category.image || "/placeholder.svg"}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                transition: "transform 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)"
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)"
                                            }}
                                        />
                                    </div>
                                }
                                style={{
                                    width: "258px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.3s ease",
                                }}
                                bodyStyle={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                            >
                                <Meta
                                    title={
                                        <span
                                            style={{
                                                fontSize: "1.1rem",
                                                fontWeight: "600",
                                                color: "#1f2937",
                                            }}
                                        >
                                            {category.name}
                                        </span>
                                    }
                                    description={
                                        <span
                                            style={{
                                                color: "#6b7280",
                                                fontSize: "0.9rem",
                                            }}
                                        >
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