import { CSSProperties } from 'react';
import { CAROUSEL_COLORS } from './carousel.constants';

// ==================== CAROUSEL STYLES ====================

export const carouselStyles: Record<string, CSSProperties> = {
  // Container principal
  carouselContainer: {
    width: '100%',
    position: 'relative' as const,
    backgroundColor: CAROUSEL_COLORS.background,
    overflow: 'hidden',
  },

  // Carousel wrapper
  carouselWrapper: {
    width: '100%',
    height: '500px', // Vuelvo a 300px que era cuando funcionaba
    position: 'relative' as const,
  },

  // Imagen del carousel
  carouselImage: {
    width: '100%',
    height: '100%', // Volver a 100% para que ocupe todo el contenedor
    objectFit: 'cover',
    objectPosition: 'center' as const,
    display: 'block',
  },
};

// Estilos responsive
export const getResponsiveHeight = (isMobile: boolean): string => {
  return isMobile ? '150px' : '500px';
};
