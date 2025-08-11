# Nano-shop 🛒

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
[![Module Federation](https://img.shields.io/badge/Module%20Federation-Webpack%205-orange.svg)](https://webpack.js.org/concepts/module-federation/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-1890ff.svg)](https://ant.design/)

Una aplicación de ecommerce moderna construida con arquitectura de microfrontends, utilizando las últimas tecnologías web para crear una experiencia de compra escalable y mantenible.

## 🏗️ Arquitectura

Este proyecto implementa una arquitectura de microfrontends que permite:
- **Desarrollo independiente** de diferentes módulos del ecommerce
- **Despliegue independiente** de cada microfrontend
- **Escalabilidad** y mantenibilidad a largo plazo
- **Reutilización** de componentes entre diferentes aplicaciones

### Microfrontends Incluidos

- **🏠 Shell Application**: Aplicación principal que orquesta todos los microfrontends
- **🛍️ Product Catalog**: Catálogo de productos y búsqueda
- **🛒 Shopping Cart**: Carrito de compras y gestión de productos
- **👤 User Profile**: Gestión de perfil de usuario y autenticación
- **💳 Checkout**: Proceso de pago y finalización de compra
- **📊 Admin Dashboard**: Panel de administración para gestión de productos

## 🚀 Tecnologías

### Frontend
- **React 18**: Biblioteca principal para la interfaz de usuario
- **TypeScript**: Tipado estático para mayor robustez del código
- **Vite**: Build tool ultra-rápido para desarrollo
- **Module Federation**: Compartición de código entre microfrontends
- **Ant Design**: Sistema de diseño y componentes UI
- **React Router**: Navegación y routing
- **Zustand/Redux Toolkit**: Gestión de estado global

### Build & Dev Tools
- **ESLint**: Linting y calidad de código
- **Prettier**: Formateo de código
- **Husky**: Git hooks para pre-commit
- **Jest**: Testing unitario
- **Cypress**: Testing end-to-end

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/ForgeLoop/Nano-shop.git

# Navegar al directorio
cd Nano-shop

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia todos los microfrontends en modo desarrollo
pnpm dev:shell        # Solo la aplicación shell
pnpm dev:catalog      # Solo el catálogo de productos
pnpm dev:cart         # Solo el carrito de compras

# Build
pnpm build            # Build de producción para todos los microfrontends
pnpm build:shell      # Build solo del shell
pnpm preview          # Preview del build de producción

# Testing
pnpm test             # Ejecutar tests unitarios
pnpm test:e2e         # Ejecutar tests end-to-end
pnpm test:coverage    # Tests con reporte de cobertura

# Linting & Formatting
pnpm lint             # Ejecutar ESLint
pnpm lint:fix         # Corregir errores de linting automáticamente
pnpm format           # Formatear código con Prettier
```

## 🏃‍♂️ Desarrollo

### Estructura del proyecto

```
nano-shop/
├── apps/
│   ├── shell/                 # Aplicación principal
│   ├── product-catalog/       # Microfrontend de catálogo
│   ├── shopping-cart/         # Microfrontend de carrito
│   ├── user-profile/          # Microfrontend de perfil
│   ├── checkout/              # Microfrontend de checkout
│   └── admin-dashboard/       # Microfrontend de administración
├── packages/
│   ├── shared-components/     # Componentes compartidos
│   ├── shared-types/          # Tipos TypeScript compartidos
│   ├── shared-utils/          # Utilidades compartidas
│   └── design-system/         # Sistema de diseño basado en Ant Design
├── docs/                      # Documentación del proyecto
└── tools/                     # Herramientas de build y configuración
```

### Agregar un nuevo microfrontend

1. Crear nueva carpeta en `apps/`
2. Configurar `vite.config.ts` con Module Federation
3. Exponer los componentes necesarios
4. Registrar en la aplicación shell

### Convenciones de código

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useShoppingCart.ts`)
- **Utilidades**: camelCase (`formatPrice.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🎨 Sistema de Diseño

Utilizamos Ant Design como base de nuestro sistema de diseño, con customizaciones específicas:

- **Colores primarios**: Azul (#1890ff) para acciones principales
- **Colores secundarios**: Verde (#52c41a) para éxito, Rojo (#ff4d4f) para errores
- **Tipografía**: Inter como fuente principal
- **Espaciado**: Sistema de 8px como unidad base

## 🧪 Testing

### Testing Strategy
- **Unitarios**: Jest + React Testing Library para componentes
- **Integración**: Testing de comunicación entre microfrontends
- **E2E**: Cypress para flujos críticos del usuario

### Ejecutar tests

```bash
# Tests unitarios
pnpm test

# Tests en modo watch
pnpm test:watch

# Tests E2E
pnpm test:e2e

# Cobertura de tests
pnpm test:coverage
```

## 🚀 Despliegue

### Desarrollo
Cada microfrontend se puede desplegar independientemente en diferentes puertos para desarrollo local.

### Producción
- **Shell**: Puerto principal de la aplicación
- **Microfrontends**: Se sirven como módulos federados
- **CDN**: Assets estáticos servidos desde CDN

### Variables de entorno

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:3001
VITE_PAYMENT_GATEWAY_URL=https://api.payments.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Estándares de contribución
- Seguir las convenciones de código establecidas
- Incluir tests para nuevas funcionalidades
- Actualizar documentación cuando sea necesario
- Asegurar que todos los tests pasen

## 📚 Documentación

- [Guía de Arquitectura](./docs/architecture.md)
- [Configuración de Module Federation](./docs/module-federation.md)
- [Guía de Estilo](./docs/style-guide.md)
- [API Documentation](./docs/api.md)

## 🐛 Reportar Issues

Si encuentras un bug o tienes una sugerencia, por favor:
1. Revisa si ya existe un issue similar
2. Crea un nuevo issue con una descripción detallada
3. Incluye pasos para reproducir el problema
4. Agrega screenshots si es relevante

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

Desarrollado con ❤️ por el equipo de [ForgeLoop](https://github.com/ForgeLoop)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!