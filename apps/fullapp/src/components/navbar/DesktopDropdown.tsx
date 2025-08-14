import React from 'react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { COLORS, PRODUCT_CATEGORIES, navigateTo } from './navbar.constants';
import { createButtonStyles, desktopDropdownStyles } from './navbar.styles';

interface DesktopDropdownProps {
  onMouseEnter: (element: HTMLElement, hoverStyles: Partial<CSSStyleDeclaration>) => void;
  onMouseLeave: (element: HTMLElement, defaultStyles: Partial<CSSStyleDeclaration>) => void;
}

export const DesktopDropdown: React.FC<DesktopDropdownProps> = ({ onMouseEnter, onMouseLeave }) => {
  // ==================== DROPDOWN MENU ====================
  const createProductMenu = (): MenuProps['items'] => [
    {
      key: 'categories',
      label: (
        <div style={desktopDropdownStyles.menuContainer}>
          <div style={desktopDropdownStyles.grid}>
            {PRODUCT_CATEGORIES.map((category, index) => (
              <div 
                key={index}
                style={desktopDropdownStyles.category}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#e9ecef';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.transparent;
                  e.currentTarget.style.borderColor = COLORS.transparent;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => navigateTo(`/productos/${category.name.toLowerCase()}`)}
              >
                <h3 style={desktopDropdownStyles.categoryTitle}>
                  {category.name}
                </h3>
                <p style={desktopDropdownStyles.categoryDescription}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: createProductMenu() }}
      placement="bottom"
      trigger={['hover']}
      overlayStyle={desktopDropdownStyles.overlayStyle}
    >
      <Button 
        type="text"
        style={createButtonStyles(true)}
        onMouseEnter={(e) => onMouseEnter(e.currentTarget, { backgroundColor: COLORS.overlay.light })}
        onMouseLeave={(e) => onMouseLeave(e.currentTarget, { backgroundColor: COLORS.transparent })}
      >
        Productos
      </Button>
    </Dropdown>
  );
};
