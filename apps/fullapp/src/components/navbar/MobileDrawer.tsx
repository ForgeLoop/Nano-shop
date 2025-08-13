import React from 'react';
import { Drawer } from 'antd';
import { PRODUCT_CATEGORIES, navigateTo } from './navbar.constants';
import { mobileDrawerStyles, navbarStyles } from './navbar.styles';

interface MobileDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ visible, onClose }) => {
  return (
    <Drawer
      title="Categorías"
      placement="left"
      onClose={onClose}
      open={visible}
      className="mobile-drawer"
      width={280}
    >
      <div style={mobileDrawerStyles.drawerContent}>
        {PRODUCT_CATEGORIES.map((category, index) => (
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
              <p style={mobileDrawerStyles.categoryDescription}>
                {category.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Drawer>
  );
};
