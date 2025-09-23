import React from 'react';
import { Drawer } from 'antd';
import { PRODUCT_CATEGORIES, navigateTo, menuItems } from '@/components/layout/navbar/navbar.constants';
import { mobileDrawerStyles } from '@/components/layout/navbar/navbar.styles';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

interface MobileDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ visible, onClose }) => {
  const isAdmin = window.location.pathname.startsWith("/admin");
  const navigate = useNavigate();
  const [iphoneOpen, setIphoneOpen] = React.useState(false);
  const handleIphoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIphoneOpen((prev) => !prev);
  };

  return (
    <Drawer
      title={isAdmin ? "Opciones admin" : "Categorías"}
      placement="left"
      onClose={onClose}
      open={visible}
      className="mobile-drawer"
      width={220}
    >
      <div>
        {isAdmin ? (
          menuItems.map((option) => (
            <a
              key={option.key}
              href="#"
              style={mobileDrawerStyles.categoryItem}
              className="category-item"
              onClick={e => {
                e.preventDefault();
                navigate(`/admin/${option.key}`); // <-- Navega con React Router
                onClose();
              }}
            >
              <div>
                <h4 style={mobileDrawerStyles.categoryTitle}>
                  {option.label}
                </h4>
              </div>
            </a>
          ))
        ) : (
          // Categorías normales
          PRODUCT_CATEGORIES.map((category, index) => (
            category.name === 'Iphone' ? (
              <div key={index}>
                <a
                  href="#"
                  style={mobileDrawerStyles.categoryItem}
                  className="category-item"
                  onClick={handleIphoneClick}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={mobileDrawerStyles.categoryTitle}>
                      {category.name}
                    </h4>
                    <RightOutlined />
                  </div>
                </a>
                {iphoneOpen && (
                  <div style={mobileDrawerStyles.isIphoneOpenContent}>
                    <a
                      href="/productos/iphone/nuevo"
                      style={mobileDrawerStyles.categoryItem}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/productos/iphone/nuevo');
                        onClose();
                      }}
                    >
                      <span style={mobileDrawerStyles.isIphoneOpenText}>Nuevo</span>
                    </a>
                    <a
                      href="/productos/iphone/usados"
                      style={mobileDrawerStyles.categoryItem}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('/productos/iphone/usados');
                        onClose();
                      }}
                    >
                      <span style={mobileDrawerStyles.isIphoneOpenText}>Usados</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={index}
                href={`/productos/${category.name.toLowerCase()}`}
                style={mobileDrawerStyles.categoryItem}
                className="category-item"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/productos/${category.name.toLowerCase()}`);
                  onClose();
                }}
              >
                <div>
                  <h4 style={mobileDrawerStyles.categoryTitle}>
                    {category.name}
                  </h4>
                </div>
              </a>
            )
          ))
        )}
      </div>
    </Drawer>
  );
};