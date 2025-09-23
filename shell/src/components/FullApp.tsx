import { Suspense, lazy } from 'react';
import { lightTheme } from '@/theme';

const FullApp = lazy(() => import('fullapp/FullApp'));

const RemoteFullAppLoader = () => (
  <Suspense fallback={<div>Cargando FullApp...</div>}>
    <FullApp theme={lightTheme} />
  </Suspense>
);

export default RemoteFullAppLoader;