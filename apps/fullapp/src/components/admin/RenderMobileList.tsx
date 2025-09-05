import { Row, Col, Card, Image, Button, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

type RenderMobileListProps<T> = {
    title: string;
    items: T[];
    getTitle: (item: T) => React.ReactNode;
    getDescription: ((item: T) => React.ReactNode) | null;
    getPrice: ((item: T) => React.ReactNode) | null;
    getImage: ((item: T) => string | undefined | null) | null;
    defaultIcon: React.ReactNode;
    onEdit: (item: T) => void;
    onDelete?: (item: T) => void | null;
    adminStyles: any;
    imagePreview?: React.ReactNode;
    onEditImage?: () => void;
};

export default function RenderMobileList<T>({
    title,
    items,
    getTitle,
    getDescription,
    getPrice,
    getImage,
    defaultIcon,
    onEdit,
    onDelete,
    adminStyles,
    imagePreview,
    onEditImage,
}: RenderMobileListProps<T>) {
    return (
        <div style={adminStyles.menuContentContainerMobile}>
            <Title level={3} style={adminStyles.menuTitle}>{title}</Title>
            {imagePreview && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0 auto 16px",
                }}>
                    {imagePreview}
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
            )}
            <Row gutter={[16, 16]}>
                {items.map((item) => (
                    <Col span={24} key={(item as any).key}>
                        <Card style={adminStyles.cardItem} styles={{ body: { padding: "16px" } }}>
                            <div style={adminStyles.cardItemContent}>
                                {getImage && getImage(item) ? (
                                    <Image
                                        src={getImage(item) || "/placeholder.svg"}
                                        alt={String(getTitle(item))}
                                        style={adminStyles.imgItem}
                                    />
                                ) : defaultIcon ? (
                                    <div style={adminStyles.noImgItem}>
                                        {defaultIcon}
                                    </div>
                                ) : null}
                                <div style={{ flex: 1 }}>
                                    <Text strong style={adminStyles.itemTitle}>{getTitle(item)}</Text>
                                    {getDescription && (
                                        <Text type="secondary" style={adminStyles.itemDescription}>{getDescription(item)}</Text>
                                    )}
                                    {getPrice && (
                                        <Text style={adminStyles.itemPrice}> {getPrice(item)}</Text>
                                    )}
                                </div>
                                <Space>
                                    <Button
                                        type="text"
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={() => onEdit(item)}
                                        style={{ color: "#1890ff" }}
                                    />
                                    {onDelete && (
                                        <Button
                                            type="text"
                                            size="large"
                                            icon={<DeleteOutlined />}
                                            onClick={() => onDelete(item)}
                                            style={{ color: "#ff4d4f" }}
                                        />
                                    )}
                                </Space>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}