// types/module-federation.d.ts

export {}; // Para que sea módulo y no conflicto global

declare global {
  interface Window {
    // Los contenedores remotos se exponen como propiedades dinámicas en window
    [key: string]: Container | unknown;
  }

  // Variable global que Webpack usa para compartir dependencias entre remotos
  const __webpack_share_scopes__: {
    default: ShareScope;
  };
}

// Define la forma del ShareScope (puede ser un objeto con cualquier estructura)
type ShareScope = Record<string, unknown>;

// Interfaz que tiene cada contenedor remoto de Module Federation
interface Container {
  // Inicializa el contenedor con el scope compartido
  init(shareScope: ShareScope): Promise<void>;

  // Obtiene un módulo remoto. Retorna una fábrica (factory) para ese módulo
  get(module: string): Promise<() => unknown>;
}
