import { EditOutlined, DeleteOutlined, TagsOutlined } from "@ant-design/icons";
import { Table, Button, Space, Row, Col, Card, Image, Typography } from "antd";
import { Category } from "@/services/categoryService";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

type CategoryListProps = {
    categories: Category[];
    onEdit: (id: number) => void;
    onDelete?: (category: Category) => void;
    adminStyles: any;
    onEditImage?: () => void;
    onCreate?: () => void;
    isMobile: boolean;
};

export default function CategoryList({
    onEdit,
    onDelete,
    adminStyles,
    onEditImage,
    categories,
    onCreate,
    isMobile
}: CategoryListProps) {
    const title = "Categorías";

    // Columnas para desktop
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, category: Category) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(Number(category.id))}
                        style={{ color: '#1890ff' }}
                    >
                        Editar
                    </Button>
                    {onDelete && (
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(category)}
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
                    {categories.map((category) => (
                        <Col span={24} key={category.id}>
                            <Card style={adminStyles.cardItem} styles={{ body: { padding: "16px" } }}>
                                <div style={adminStyles.cardItemContent}>
                                    {category.image ? (
                                        <Image
                                            src={category.image || "/placeholder.svg"}
                                            alt={String(category.name)}
                                            style={adminStyles.imgItem}
                                        />
                                    ) : (
                                        <div style={adminStyles.noImgItem}>
                                            <TagsOutlined style={adminStyles.iconItem} />
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <Text strong style={adminStyles.itemTitle}>{category.name}</Text>
                                    </div>
                                    <Space>
                                        <Button
                                            type="text"
                                            size="large"
                                            icon={<EditOutlined />}
                                            onClick={() => onEdit(Number(category.id))}
                                            style={{ color: "#1890ff" }}
                                        />
                                        {onDelete && (
                                            <Button
                                                type="text"
                                                size="large"
                                                icon={<DeleteOutlined />}
                                                onClick={() => onDelete(category)}
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
                        Crear nueva categoría
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
                dataSource={categories}
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