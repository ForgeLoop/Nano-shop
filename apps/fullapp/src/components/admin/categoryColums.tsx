import { Button, Space, Image } from "antd";
import type { Category } from "./admin.constants";

export const categoryColumns = (
  onEdit: (cat: Category) => void,
  onDelete: (cat: Category) => void,
  adminStyles: any
) => [
  {
    title: "Imagen",
    dataIndex: "imagen",
    key: "imagen",
    render: (img: string) =>
      img ? (
        <Image src={img} alt="cat" style={adminStyles.imgItem} />
      ) : null,
  },
  { title: "Nombre", dataIndex: "nombre", key: "nombre" },
  {
    title: "Acciones",
    key: "acciones",
    render: (_: any, record: Category) => (
      <Space>
        <Button type="link" onClick={() => onEdit(record)}>
          Editar
        </Button>
        {onDelete && (
          <Button type="link" danger onClick={() => onDelete(record)}>
            Eliminar
          </Button>
        )}
      </Space>
    ),
  },
];