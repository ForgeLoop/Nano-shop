import { Card, Button, Modal, message } from "antd";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { productosGrid } from "@/pages/Productos/styles/productos.styles";
import { useCartStore } from "@/components/cart/store/useCartStore";
import { useState, useEffect } from "react";
import { ProductModalContent } from "./ProductoModal";
export interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descuento: number;
}

interface Props {
  productos: Product[];
}

const ProductosGrid: React.FC<Props> = ({ productos }) => {
  const { addToCart, cart } = useCartStore();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] =
  useState<Product | null>(null);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleAddToCart = (producto: Product, cantidad: number = 1) => {
    addToCart(
      {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        descuento: producto.descuento,
      },
      cantidad
    );

    message.success(
      `${cantidad} ${producto.nombre} agregado(s) al carrito`
    );

     setAddedItems((prev) => new Set(prev).add(producto.id));

    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(producto.id);
        return newSet;
      });
    }, 2000);

    setTimeout(() => {
      setIsModalOpen(false)
    }, 1000);
  };
  
  const getProductQuantityInCart = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  };
  const handleDescuento = (product: Product) => {
    const descuento = product.descuento;
    const precioOriginal: number = product.precio;
    const precioFinal: number = Math.round(
      precioOriginal - (precioOriginal * descuento) / 100
    );

    return (
      <div style={{ marginBottom: 8 }}>
        {/* Precio original */}
        <div
          style={{
            textDecoration: "line-through",
            color: "#999",
            fontSize: 16,
            marginBottom: 4,
          }}
        >
          USD {precioOriginal.toLocaleString()}
        </div>

        {/* Precio final + descuento */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#222",
            }}
          >
            USD {precioFinal.toLocaleString()}
          </span>

          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#00a650",
            }}
          >
            {descuento}% OFF
          </span>
        </div>
      </div>
    );
  };


  return (
    <motion.div layout style={productosGrid.motionContainer}>
      {productos.map((p) => {
        const isJustAdded = addedItems.has(p.id);

        return (
          <motion.div
            layout
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >

              <Card
                hoverable
                bordered={false}
                onClick={() => {
                  setSelectedProduct(p);
                  setIsModalOpen(true);
                }}
                style={{ 
                  width: "100%", 
                  borderRadius: "12px",
                  overflow: "hidden", 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }} 
                styles={{ body: { padding: "16px", minHeight: "140px"}}}
                cover={ 
                  <div 
                    style={{ width: "100%", 
                      height: "240px", 
                      overflow: "hidden", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      backgroundColor: "#f5f5f5"
                    }}> 
                    <img 
                      src={p.imagen} 
                      alt={p.nombre} 
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", 
                        transition: "transform 0.3s ease"
                      }} 
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)") } 
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)") } 
                      /> 
                    </div> 
                  }
                actions={[ 
                  <Button 
                    type="default"
                    icon={ isJustAdded ? <CheckOutlined /> : <ShoppingCartOutlined /> } 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p)} 
                    }
                    style={{ 
                      width: "90%", 
                      background: isJustAdded ? "linear-gradient(135deg, #14332a, #1f4d3d)" : "linear-gradient(135deg, #1f2a44, #2e3a59)", 
                      border: "none",
                      color: "#fff", transition: "all 0.3s ease", }} 
                    > 
                    {isJustAdded ? "¡Agregado!" : "Agregar al carrito"} 
                  </Button>,
                ]}
                >
                <h4 
                  style={{ 
                    marginBottom: 8, 
                    fontSize: 16, 
                    fontWeight: 600 
                  }}> 
                  {p.nombre} 
                </h4> 
                {/* Precio con descuento */}
                {
                  p.descuento != 0 ? (
                    handleDescuento(p)            
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                      }}
                    >
                    <span
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#222",
                        marginTop: "14%",
                      }}
                    >
                      USD {p.precio.toLocaleString()}
                    </span>
                    </div>
                  )
                }
              </Card>
          </motion.div>
        );
      })}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered={!isMobile}
        width={isMobile ? "100%" : 950}
      >
        {selectedProduct && (
          <ProductModalContent
            product={selectedProduct}
            handleAddToCart={handleAddToCart}
            onClose={() => setIsModalOpen(false)}
            cartQuantity={getProductQuantityInCart(selectedProduct.id)}
          />
        )}
      </Modal>
    </motion.div>
  );
};

export default ProductosGrid;
