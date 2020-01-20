import React, { Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';

interface ILoadableProps {
  lazyComponent: ReturnType<typeof React.lazy>;
}

const Loadable: React.FC<ILoadableProps> = props => {
  const Lazy = props.lazyComponent;
  return (
    <Suspense fallback={<CircularProgress />}>
      <Lazy />
    </Suspense>
  );
};

export default Loadable;
