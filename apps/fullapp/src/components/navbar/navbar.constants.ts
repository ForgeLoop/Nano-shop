// ==================== NAVBAR CONSTANTS ====================

export const NAVBAR_HEIGHT = '120px';

export const COLORS = {
  primary: '#333',
  white: 'white',
  whatsapp: '#25D366',
  transparent: 'transparent',
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(255, 255, 255, 0.8)',
  }
} as const;

export const PRODUCT_CATEGORIES = [
  { name: 'Smartphones', description: 'Últimos modelos con tecnología avanzada' },
  { name: 'Laptops', description: 'Computadoras portátiles de alto rendimiento' },
  { name: 'Tablets', description: 'Dispositivos táctiles versátiles' },
  { name: 'Accesorios', description: 'Complementos y periféricos' },
  { name: 'Audio', description: 'Auriculares y sistemas de sonido' },
  { name: 'Gaming', description: 'Productos para gamers' },
] as const;

// ==================== UTILITY FUNCTIONS ====================

export const navigateTo = (url: string) => {
  window.location.href = url;
};

export const openExternalLink = (url: string) => {
  window.open(url, '_blank');
};

// ==================== TYPES ====================

export interface NavbarProps {
  // Props opcionales para configuración futura
}
