import { Tag, Button } from "antd";
import {
  FilterOutlined,
  BgColorsOutlined,
  CheckCircleOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useProductosStore } from "../store/useProductosStore";
import { filtrosActivos } from "@/pages/Productos/styles/productos.styles";

const MotionTag = motion(Tag);

const FiltrosActivos = ({ onOpenMobile }: any) => {
  const {
    filtros,
    toggleCategoria,
    toggleColor,
    setStock,
    setOrden,
    setPrecio
  } = useProductosStore();

  return (
    <div style={filtrosActivos.container}>
      <Button icon={<FilterOutlined />} onClick={onOpenMobile}>
        Filtros
      </Button>

      <AnimatePresence>

        {filtros.categorias.map((cat) => (
          <MotionTag
            style={filtrosActivos.tags}
            key={`cat-${cat}`}
            closable
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClose={(e) => {
              e.preventDefault();
              toggleCategoria(cat);
            }}
          >
            {cat}
          </MotionTag>
        ))}

        {filtros.colores.map((c) => (
          <MotionTag
            key={`color-${c}`}
            closable
            icon={<BgColorsOutlined />}
            style={{
              borderColor: c.toLowerCase(),
              color: c.toLowerCase()
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClose={(e) => {
              e.preventDefault();
              toggleColor(c);
            }}
          >
            {c}
          </MotionTag>
        ))}

        {filtros.soloStock && (
          <MotionTag
            closable
            icon={<CheckCircleOutlined />}
            color="green"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClose={(e) => {
              e.preventDefault();
              setStock(false);
            }}
          >
            En stock
          </MotionTag>
        )}

        {filtros.ordenPrecio && (
          <MotionTag
            key="orden-precio"
            closable
            icon={<SwapOutlined />}
            color="blue"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClose={(e) => {
              e.preventDefault();
              setOrden(undefined);
            }}
          >
            {filtros.ordenPrecio === "asc"
              ? "Precio ↑"
              : "Precio ↓"}
          </MotionTag>
        )}

        {(filtros.precio[0] !== 0 ||
          filtros.precio[1] !== 999999) && (
          <MotionTag
            key="precio-range" 
            closable
            color="purple"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClose={(e) => {
              e.preventDefault();
              setPrecio([0, 999999]);
            }}
          >
            ${filtros.precio[0]} - ${filtros.precio[1]}
          </MotionTag>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FiltrosActivos;
