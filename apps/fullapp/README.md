# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# FullApp

Este módulo es el microfrontend principal de Nano-shop. Está construido con React, TypeScript, Vite y Ant Design, y se expone al shell mediante Module Federation.

## Estructura

- `src/FullApp.tsx`: Componente principal expuesto
- `src/components/`: Componentes reutilizables
- `src/pages/`: Páginas del módulo
- `src/hooks/`: Hooks personalizados
- `src/assets/`: Recursos estáticos

## Integración con el shell

En el shell, agrega la configuración de federation en `vite.config.ts`:

```ts
remotes: {
  fullapp: 'http://localhost:PORT/remoteEntry.js',
}
```

Luego, usa el loader de module federation para cargar el microfrontend `FullApp`.

## Desarrollo

- Instala dependencias: `pnpm install`
- Ejecuta en modo desarrollo: `pnpm dev`

## Propósito

Este módulo servirá como base para el desarrollo de la aplicación principal, permitiendo escalar y dividir funcionalidades en el futuro.
