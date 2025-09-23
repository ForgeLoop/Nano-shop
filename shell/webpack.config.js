import { container } from 'webpack';
const { ModuleFederationPlugin } = container;

export default {
  // ...otras configuraciones webpack...
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      exposes: {
        './theme': './src/theme/index.ts', // <-- Aquí expones tu theme
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    // ...otros plugins si tienes...
  ],
  // ...resto de la configuración...
};