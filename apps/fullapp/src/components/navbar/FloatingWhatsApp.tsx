import React from 'react';
import { Button } from 'antd';
import { openExternalLink } from './navbar.constants';
import { floatingWhatsAppButton } from './navbar.styles';
import { WhatsAppLogo } from '../../assets/icons/WhatsAppLogo';

export const FloatingWhatsApp: React.FC = () => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleWhatsAppClick = () => {
    openExternalLink('https://wa.me/1234567890');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setIsPressed(false);
    if (!isPressed) {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
    }
  };

  const handlePressStart = () => {
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    // Mantener el efecto presionado un poco más para que sea más visible
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  return (
    <Button
      type="text"
      onClick={handleWhatsAppClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{
        ...floatingWhatsAppButton,
        boxShadow: isPressed 
          ? '0 2px 6px rgba(37, 211, 102, 0.6)' 
          : '0 4px 12px rgba(37, 211, 102, 0.4)',
        transform: isPressed ? 'scale(0.85)' : 'scale(1)',
      }}
      onMouseEnter={(e) => {
        if (!isPressed) {
          e.currentTarget.style.transform = isPressed ? 'scale(0.95)' : 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.6)';
        }
      }}
    >
      <WhatsAppLogo width={30} height={30} />
    </Button>
  );
};
