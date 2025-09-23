import { EditOutlined, DeleteOutlined, TagsOutlined } from "@ant-design/icons";
import { Table, Button, Space, Row, Col, Card, Image, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { Product } from "@/services/productService";

const { Text } = Typography;

type ProductsListProps = {
    products: Product[] | any[];
    onEdit: (id: number) => void;
    onDelete?: (product: Product) => void;
    adminStyles: any;
    onEditImage?: () => void;
    onCreate?: () => void;
    isMobile: boolean;
};

export default function ProductsList({
    onEdit,
    onDelete,
    adminStyles,
    onEditImage,
    products,
    onCreate,
    isMobile
}: ProductsListProps) {
    const title = "Productos";

    // Columnas para desktop
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price?.toFixed(2) || '0.00'}`,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, product: Product) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(Number(product.id))}
                        style={{ color: '#1890ff' }}
                    >
                        Editar
                    </Button>
                    {onDelete && (
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(product)}
                            style={{ color: '#ff4d4f' }}
                        >
                            Eliminar
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    // Vista Mobile
    if (isMobile) {
        return (
            <div style={adminStyles.menuContentContainerMobile}>
                <Title level={3} style={adminStyles.menuTitle}>{title}</Title>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0 auto 16px",
                }}>
                    Imagen
                </div>
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col span={24} key={product.id}>
                            <Card style={adminStyles.cardItem} styles={{ body: { padding: "16px" } }}>
                                <div style={adminStyles.cardItemContent}>
                                    {product.image ? (
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={String(product.name)}
                                            style={adminStyles.imgItem}
                                        />
                                    ) : (
                                        <div style={adminStyles.noImgItem}>
                                            <TagsOutlined style={adminStyles.iconItem} />
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <Text strong style={adminStyles.itemTitle}>{product.name}</Text>
                                        <br />
                                        <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                                            ${product.price?.toFixed(2) || '0.00'}
                                        </Text>
                                    </div>
                                    <Space>
                                        <Button
                                            type="text"
                                            size="large"
                                            icon={<EditOutlined />}
                                            onClick={() => onEdit(Number(product.id))}
                                            style={{ color: "#1890ff" }}
                                        />
                                        {onDelete && (
                                            <Button
                                                type="text"
                                                size="large"
                                                icon={<DeleteOutlined />}
                                                onClick={() => onDelete(product)}
                                                style={{ color: "#ff4d4f" }}
                                            />
                                        )}
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                {onCreate && (
                    <Button
                        onClick={onCreate}
                        style={adminStyles.createItemButton}
                    >
                        Crear nuevo producto
                    </Button>
                )}
            </div>
        );
    }

    // Vista Desktop
    return (
        <div style={adminStyles.menuContentContainer}>
            <Title level={3} style={adminStyles.menuTitle}>{title}</Title>
            <Table
                dataSource={products}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
            {onCreate && (
                <Button
                    onClick={onCreate}
                    style={adminStyles.createItemButton}
                >
                    Crear nueva categoría
                </Button>
            )}
            <div style={{
                marginBottom: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 16
            }}>
                Imagen
                {onEditImage && (
                    <Button
                        type="text"
                        size="large"
                        icon={<EditOutlined />}
                        style={{ color: "#1890ff", marginTop: 8 }}
                        onClick={onEditImage}
                    >
                        Editar imagen
                    </Button>
                )}
            </div>
        </div>
    );
}