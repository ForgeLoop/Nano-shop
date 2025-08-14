import React from 'react';
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
  COLORS,
  navigateTo,
  openExternalLink,
} from './navbar.constants' ;
import type { NavbarProps } from './navbar.constants';
import { createSearchStyles, createButtonStyles, navbarStyles, searchSuffixButton } from './navbar.styles';
import { useIsMobile } from '../../hooks/useWindowSize';
import { MobileDrawer } from './MobileDrawer';
import { DesktopDropdown } from './DesktopDropdown';
import { MobileSearchDropdown } from './MobileSearchDropdown';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { WhatsAppLogo } from '../../assets/icons/WhatsAppLogo';

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
                  style={navbarStyles.iconButton}
                  onClick={() => navigateTo('/cart')}
                />
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={navbarStyles.iconButton}
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
                    src="/logonanoblanco.png"
                    alt="Logo"
                    width={150}
                    height={150}
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
                        style={searchSuffixButton}
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
                  <WhatsAppLogo width={20} height={20} />
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

export default Navbar;