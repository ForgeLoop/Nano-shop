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
  { name: 'Iphone', description: 'Nuevos y usados, con garantía y variedad de modelos.', image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=MjUrdW9rK0I3Y0hBcFdUR2pNVTRtUFpIU2c1QXYxN1o5THJsVFdubi8vdWo1ZjMweU1kRzVLbG1rVXpHeUhrekM5eTNXTVZyTHIwdUZhZkhwMUhFcDF6UEJkKzg5UTZqNmZVWkpNeWtMWmwzTnQ3S2NXcklFcHlIS3FvK1FqcEU" },
  { name: 'Ipad', description: 'Tabletas de alto rendimiento' , image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=MjUrdW9rK0I3Y0hBcFdUR2pNVTRtUFpIU2c1QXYxN1o5THJsVFdubi8vdWo1ZjMweU1kRzVLbG1rVXpHeUhrekM5eTNXTVZyTHIwdUZhZkhwMUhFcDF6UEJkKzg5UTZqNmZVWkpNeWtMWmwzTnQ3S2NXcklFcHlIS3FvK1FqcEU"},
  { name: 'Apple Watch', description: 'Relojes inteligentes de última generación', image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-iphone16prohero-202409?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=MjUrdW9rK0I3Y0hBcFdUR2pNVTRtUFpIU2c1QXYxN1o5THJsVFdubi8vdWo1ZjMweU1kRzVLbG1rVXpHeUhrekM5eTNXTVZyTHIwdUZhZkhwMUhFcDF6UEJkKzg5UTZqNmZVWkpNeWtMWmwzTnQ3S2NXcklFcHlIS3FvK1FqcEU" },
  { name: 'Airpods', description: 'Auriculares inalámbricos de alta calidad', image: "https://store.storeimages.cdn-apple.com/1/as-image…pPczBocnFKR3FYSlo5L1FXZEdHNUFPR0hYUU12cjI0VlFzM1A" },
  { name: 'Macbook', description: 'Computadoras portátiles de Apple', image: "https://store.storeimages.cdn-apple.com/1/as-image…pPczBocnFKR3FYSlo5L1FXZEdHNUFPR0hYUU12cjI0VlFzM1A"},
  { name: 'Pencil', description: 'Lápiz óptico para iPad', image: "https://store.storeimages.cdn-apple.com/1/as-image…RHU3BEaEVISG4vR2NHalJOdUZTK2hyNlk4dTdFSXp2TXpTMnc" },
  { name: 'JBL', description: 'Altavoces y auriculares JBL', image: "https://store.storeimages.cdn-apple.com/1/as-image…RHU3BEaEVISG4vR2NHalJOdUZTK2hyNlk4dTdFSXp2TXpTMnc" },
  { name: 'PS5', description: 'Consola de videojuegos PlayStation 5' , image: "https://store.storeimages.cdn-apple.com/1/as-image…RHU3BEaEVISG4vR2NHalJOdUZTK2hyNlk4dTdFSXp2TXpTMnc"},
  { name: 'Xiaomi', description: 'Productos electrónicos de Xiaomi' , image: "https://s3-sa-east-1.amazonaws.com/saasargentina/vvQ3JKkNT9BrnRREcmPv/imagen"},
  { name: 'Samsung', description: 'Dispositivos y accesorios Samsung', image: "https://vstorearg.vtexassets.com/arquivos/ids/1652…8809276315330000&width=800&height=450&aspect=true" },
  { name: 'Perfumes', description: 'Fragancias de las mejores marcas', image: "	https://http2.mlstatic.com/D_Q_NP_2X_812768-MLA77121480727_062024-E.webp" },
  { name: 'Stanley', description: 'Termos y botellas Stanley' , image: "https://http2.mlstatic.com/D_Q_NP_2X_812768-MLA77121480727_062024-E.webp"},
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
