import { useContext } from 'react';
import { CoreReactRouterContext } from './core-react-router';

export function useCoreRouter() {
  return useContext(CoreReactRouterContext);
}
