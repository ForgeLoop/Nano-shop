import { Tag, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useProductosStore } from "../store/useProductosStore";
import { filtrosActivos } from  "@/pages/Productos/styles/productos.styles"

const FiltrosActivos = ({ onOpenMobile }: any) => {
  const { filtros, clearFiltro } = useProductosStore();

  return (
    <div style={filtrosActivos.container}>
      <Button icon={<FilterOutlined />} onClick={onOpenMobile}>
        Filtros
      </Button>

      {Object.entries(filtros).map(([k, v]) => (
        <Tag key={k} closable onClose={() => clearFiltro(k as any)} >
          {k}: {String(v)}
        </Tag>
      ))}
    </div>
  );
};

export default FiltrosActivos;
