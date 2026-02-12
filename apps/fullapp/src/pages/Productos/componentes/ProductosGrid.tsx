import { Card } from "antd";
import { motion } from "framer-motion";
import {productosGrid} from "@/pages/Productos/styles/productos.styles"
const ProductosGrid = ({ productos }: any) => {

  return (
    <motion.div
      layout
      style={productosGrid.motionContainer}>
      {productos.map((p: any) => (
        <motion.div
          layout
          key={p.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card
            hoverable
            cover={
              <div style={productosGrid.card.cover.divContainer}>
                <img
                  src={p.imagen}
                  style={productosGrid.card.cover.img}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            }
          >
            <h4>{p.nombre}</h4>
              <span style={{ fontSize: 13, opacity: 0.7 }}>
                {p.color.charAt(0).toUpperCase() + p.color.slice(1)}
              </span>
            <p>${p.precio}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductosGrid;
