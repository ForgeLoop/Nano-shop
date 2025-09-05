import { Button, Space, Image } from "antd";
import type { Product } from "./admin.constants";

export const productColumns = (
  onEdit: (prod: Product) => void,
  onDelete: (prod: Product) => void,
  adminStyles: any
) => [
  {
    title: "Imagen",
    dataIndex: "imagen",
    key: "imagen",
    render: (img: string) =>
      img ? (
        <Image src={img} alt="prod" style={adminStyles.imgItem} />
      ) : null,
  },
  { title: "Nombre", dataIndex: "nombre", key: "nombre" },
  { title: "Categoría", dataIndex: "categoria", key: "categoria" },
  { title: "Precio", dataIndex: "precio", key: "precio", render: (v) => `$${v}` },
  {
    title: "Acciones",
    key: "acciones",
    render: (_: any, record: Product) => (
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