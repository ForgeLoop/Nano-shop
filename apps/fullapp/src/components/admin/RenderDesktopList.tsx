import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Typography } from "antd";

type RenderDesktopListProps<T> = {
    title: string;
    items: T[];
    columns: (args: { onEdit: (item: T | null) => void; onDelete?: (item: T) => void; adminStyles: any }) => any[];
    onEdit: (item: T | null) => void;
    onDelete?: (item: T) => void;
    adminStyles: any;
    createButtonText: string;
    imagePreview?: React.ReactNode;
    onEditImage?: () => void;
};

const { Title } = Typography;

export default function RenderDesktopList<T>({
    title,
    items,
    columns,
    onEdit,
    onDelete,
    adminStyles,
    createButtonText,
    imagePreview,
    onEditImage,
}: RenderDesktopListProps<T>) {
    console.log(items, "items");
    return (
        <div style={adminStyles.menuContentContainer}>
            <Title level={3} style={adminStyles.menuTitle}>{title}</Title>
            <Table
                dataSource={items}
                columns={columns({ onEdit, onDelete, adminStyles })}
                pagination={false}
            />
            <Button
                onClick={() => onEdit(null)}
                style={adminStyles.createItemButton}
            >
                {createButtonText}
            </Button>
            {imagePreview && (
                <div style={{
                    marginBottom: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 16
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
        </div>
    );
}