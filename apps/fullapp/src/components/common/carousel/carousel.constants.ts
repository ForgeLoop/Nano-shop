// ==================== CAROUSEL CONSTANTS ====================

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
}

// Imágenes del carousel (puedes reemplazar con tus propias imágenes)
export const CAROUSEL_IMAGES: CarouselImage[] = [
  {
    id: '1',
    src: 'https://firebasestorage.googleapis.com/v0/b/foxtienda-ee7dc.appspot.com/o/1209%2Fbannerprincipal%2F91582-banner-banner-mesa-de-trabajo-1.jpg?alt=media&token=feab4c66-4312-4e1c-9b2d-92f6affe24ec',
    alt: 'Promoción 1',
    title: 'Oferta Especial',
    description: 'Descuentos increíbles en todos nuestros productos',
    link: '/ofertas'
  },
  {
    id: '2', 
    src: 'https://firebasestorage.googleapis.com/v0/b/foxtienda-ee7dc.appspot.com/o/1209%2Fbannerprincipal%2F29849-banner-banner-2-02-02.jpg?alt=media&token=0b783154-719d-4bc7-ae5d-8e737979c8ed',
    alt: 'Promoción 2',
    title: 'Nueva Colección',
    description: 'Descubre los últimos productos que tenemos para ti',
    link: '/coleccion'
  }
];

// Configuración del carousel
export const CAROUSEL_CONFIG = {
  autoplaySpeed: 5000, // 5 segundos
  effect: 'fade' as const,
  dots: true,
  infinite: true,
  autoplay: true,
  pauseOnHover: true,
  dotPosition: 'bottom' as const,
};

// Colores para el carousel
export const CAROUSEL_COLORS = {
  background: '#f5f5f5',
};

// Función de navegación (similar a la del navbar)
export const navigateTo = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

// Props del componente
export interface CarouselProps {
  images?: CarouselImage[];
  autoplaySpeed?: number;
  height?: number | string;
}
