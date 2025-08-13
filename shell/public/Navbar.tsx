import React from 'react';
import dynamic from 'next/dynamic';
import { 
  Layout, 
  Input, 
  Button, 
} from 'antd';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
// Importaciones desde archivos separados
import {
  NAVBAR_HEIGHT,
  COLORS,
  navigateTo,
  openExternalLink,
} from './Navbar/navbar.constants';
import type { NavbarProps } from './Navbar/navbar.constants';
import { createSearchStyles, createButtonStyles, navbarStyles } from './Navbar/navbar.styles';
import { useIsMobile } from './Navbar/useWindowSize';
import { MobileDrawer } from './Navbar/MobileDrawer';
import { DesktopDropdown } from './Navbar/DesktopDropdown';
import { MobileSearchDropdown } from './Navbar/MobileSearchDropdown';
import { FloatingWhatsApp } from './Navbar/FloatingWhatsApp';

const { Header } = Layout;

// ==================== COMPONENT ====================

const Navbar: React.FC<NavbarProps> = () => {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = React.useState(false);
  const isMobile = useIsMobile();
  const searchButtonRef = React.useRef<HTMLButtonElement>(null);

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Handle mobile search
  const handleMobileSearchClick = () => {
    if (mobileSearchVisible) {
      // Si está visible, cerrarlo
      setMobileSearchVisible(false);
    } else {
      // Si no está visible, abrirlo
      setMobileSearchVisible(true);
    }
  };

  const closeMobileSearch = () => {
    setMobileSearchVisible(false);
  };

  // ==================== EVENT HANDLERS ====================
  const handleMouseEnter = (element: HTMLElement, hoverStyles: Partial<CSSStyleDeclaration>) => {
    Object.assign(element.style, hoverStyles);
  };

  const handleMouseLeave = (element: HTMLElement, defaultStyles: Partial<CSSStyleDeclaration>) => {
    Object.assign(element.style, defaultStyles);
  };

  // ==================== RENDER ====================

  return (
    <>
      <Header style={isMobile ? navbarStyles.navbarMobile : navbarStyles.navbar}>
        <div style={isMobile ? navbarStyles.containerMobile : navbarStyles.container}>
          
          {/* ==================== MOBILE VERSION ==================== */}
          {isMobile ? (
            <>
              {/* Left Section - Hamburger + Search */}
              <div style={navbarStyles.mobileLeftSection}>
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  style={navbarStyles.hamburgerButton}
                  onClick={toggleDrawer}
                />
                <Button
                  ref={searchButtonRef}
                  type="text"
                  icon={<SearchOutlined />}
                  style={navbarStyles.searchButtonMobile}
                  onClick={handleMobileSearchClick}
                />
              </div>

              {/* Center - Logo */}
              <div style={navbarStyles.mobileCenterLogo}>
                <a 
                  href="/" 
                  style={navbarStyles.logoLink}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/');
                  }}
                >
                  <img
                    src="/logonanoblanco.png"
                    alt="Nanoshop Logo"
                    
                    style={navbarStyles.logoImageMobile}
                  />
                </a>
              </div>

              {/* Right Section - Cart + User */}
              <div style={navbarStyles.mobileRightSection}>
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '22px',
                    width: '40px',
                    height: '40px',
                  }}
                  onClick={() => navigateTo('/cart')}
                />
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '22px',
                    width: '40px',
                    height: '40px',
                  }}
                  onClick={() => navigateTo('/profile')}
                />
              </div>
            </>
          ) : (
            /* ==================== DESKTOP VERSION ==================== */
            <>
              {/* ==================== LOGO ==================== */}
              <div style={navbarStyles.logo}>
                <a 
                  href="/" 
                  style={navbarStyles.logoLink}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { transform: 'scale(1.05)' })}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { transform: 'scale(1)' })}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/');
                  }}
                >
                  <img
                    src="/logoSinFondo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    style={navbarStyles.logoImage}
                  />
                </a>
              </div>

              {/* ==================== CENTER CONTENT ==================== */}
              <div style={navbarStyles.centerContent}>
                
                {/* Search Bar */}
                <div style={navbarStyles.searchContainer}>
                  <Input
                    placeholder="Buscar productos..."
                    style={createSearchStyles(searchFocused)}
                    styles={{
                      input: {
                        backgroundColor: 'transparent !important',
                        color: `${COLORS.white} !important`,
                        border: 'none !important',
                      }
                    }}
                    suffix={
                      <Button
                        type="text"
                        icon={<SearchOutlined />}
                        style={{
                          color: COLORS.overlay.dark,
                          border: 'none',
                          background: 'none',
                          padding: '4px',
                          borderRadius: '50%',
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { color: COLORS.white })}
                        onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { color: COLORS.overlay.dark })}
                      />
                    }
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                
                {/* Navigation Buttons */}
                <div style={navbarStyles.navigationButtons}>
                  <DesktopDropdown
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  
                  <Button 
                    type="text"
                    style={createButtonStyles()}
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { 
                      color: COLORS.white, 
                      backgroundColor: COLORS.overlay.light 
                    })}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { 
                      color: COLORS.overlay.dark, 
                      backgroundColor: COLORS.transparent 
                    })}
                    onClick={() => navigateTo('/about')}
                  >
                    Acerca de
                  </Button>
                  
                  <Button 
                    type="text"
                    style={createButtonStyles()}
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { 
                      color: COLORS.white, 
                      backgroundColor: COLORS.overlay.light 
                    })}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { 
                      color: COLORS.overlay.dark, 
                      backgroundColor: COLORS.transparent 
                    })}
                    onClick={() => navigateTo('/contact')}
                  >
                    Contacto
                  </Button>
                </div>
              </div>

              {/* ==================== RIGHT ICONS ==================== */}
              <div style={navbarStyles.rightIcons}>
                
                {/* Cart */}
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined />}
                  style={navbarStyles.iconButton}
                  onClick={() => navigateTo('/cart')}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { 
                    backgroundColor: COLORS.overlay.medium,
                    transform: 'scale(1.1)' 
                  })}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { 
                    backgroundColor: COLORS.overlay.light,
                    transform: 'scale(1)' 
                  })}
                />
                
                {/* User */}
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={navbarStyles.iconButton}
                  onClick={() => navigateTo('/profile')}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { 
                    backgroundColor: COLORS.overlay.medium,
                    transform: 'scale(1.1)' 
                  })}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { 
                    backgroundColor: COLORS.overlay.light,
                    transform: 'scale(1)' 
                  })}
                />
                
                {/* WhatsApp */}
                <Button
                  type="text"
                  style={navbarStyles.whatsappButton}
                  onClick={() => openExternalLink('https://wa.me/1234567890')}
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget, { 
                    backgroundColor: COLORS.whatsapp,
                    color: COLORS.white,
                    transform: 'scale(1.1)' 
                  })}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget, { 
                    backgroundColor: COLORS.white,
                    color: COLORS.whatsapp,
                    transform: 'scale(1)' 
                  })}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.488"/>
                  </svg>
                </Button>
              </div>
            </>
          )}
          
        </div>
      </Header>

      {/* ==================== MOBILE SEARCH DROPDOWN ==================== */}
      <MobileSearchDropdown 
        visible={mobileSearchVisible} 
        onClose={closeMobileSearch} 
        searchButtonRef={searchButtonRef}
      />

      {/* ==================== MOBILE DRAWER ==================== */}
      <MobileDrawer 
        visible={drawerVisible} 
        onClose={closeDrawer} 
      />

      {/* ==================== FLOATING WHATSAPP (MOBILE ONLY) ==================== */}
      {isMobile && <FloatingWhatsApp />}
    </>
  );
};

// Wrapper para evitar problemas de SSR con Ant Design
const NavbarWithNoSSR = dynamic(() => Promise.resolve(Navbar), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: NAVBAR_HEIGHT, 
      backgroundColor: COLORS.primary, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: COLORS.white,
      fontSize: '16px'
    }}>
      Cargando navegación...
    </div>
  )
});

export default NavbarWithNoSSR;
