import { Suspense, lazy } from 'react';
import { lightTheme } from '@/theme';

const App = lazy(() => import('fullapp/App'));

const RemoteFullAppLoader = () => (
  <Suspense fallback={<div>Cargando App...</div>}>
    <App theme={lightTheme} />
  </Suspense>
);

export default RemoteFullAppLoader;