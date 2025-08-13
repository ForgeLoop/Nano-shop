import { Suspense, lazy } from 'react';

const FullApp = lazy(() => import('fullapp/FullApp'));

const RemoteFullAppLoader = () => (
  <Suspense fallback={<div>Cargando FullApp...</div>}>
    <FullApp />
  </Suspense>
);

export default RemoteFullAppLoader;