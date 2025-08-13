import React from 'react';
import { Carousel as AntdCarousel, ConfigProvider } from 'antd';
import { 
  CAROUSEL_IMAGES, 
  CAROUSEL_CONFIG, 
  type CarouselProps,
} from './carousel.constants';
import { carouselStyles, getResponsiveHeight } from './carousel.styles';
import { useIsMobile } from '../../hooks/useWindowSize';

// ==================== COMPONENT ====================

const Carousel: React.FC<CarouselProps> = ({ 
  images = CAROUSEL_IMAGES,
  autoplaySpeed = CAROUSEL_CONFIG.autoplaySpeed,
  height = 'auto'
}) => {
  const isMobile = useIsMobile();
  
  // FUNCIONALIDAD DE HOVER/CLICK COMENTADA PARA USO FUTURO
  // const [hoveredSlide, setHoveredSlide] = React.useState<string | null>(null);
  // const handleSlideClick = (image: CarouselImage) => {
  //   if (image.link) {
  //     navigateTo(image.link);
  //   }
  // };

  const carouselHeight = height === 'auto' ? getResponsiveHeight(isMobile) : height;

  // Configuración de tokens para los dots
  const carouselTokens = {
    components: {
      Carousel: {
        dotWidth: isMobile ? 10 : 12,        // Ancho del dot
        dotHeight: isMobile ? 10 : 12,       // Alto del dot  
        dotActiveWidth: isMobile ? 10 : 12,  // Ancho del dot activo
        dotGap: isMobile ? 4 : 6,            // Espacio entre dots
        dotOffset: 5,                        // Distancia del borde
        colorBgContainer: '#333',
        colorPrimary: '#333', 
      },
    },
  };

  return (
    <ConfigProvider theme={carouselTokens}>
      <div style={carouselStyles.carouselContainer}>
        <AntdCarousel
          {...CAROUSEL_CONFIG}
          dots={true}
          autoplaySpeed={autoplaySpeed}
          style={{ 
            ...carouselStyles.carouselWrapper,
            height: carouselHeight 
          }}
        >
          {images.map((image) => (
            <div key={image.id}>
              <div
                style={{
                  ...carouselStyles.carouselWrapper,
                  height: carouselHeight,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={carouselStyles.carouselImage}
                />
              </div>
            </div>
          ))}
        </AntdCarousel>
      </div>
    </ConfigProvider>
  );
};

export default Carousel;