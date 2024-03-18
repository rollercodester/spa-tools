import { ReactElement, cloneElement, createContext, useCallback, useEffect, useRef, useState } from 'react';
import {
  CoreRoute,
  CoreRouteResponse,
  CoreRouter,
  CoreRouterOptions,
  OnCoreRouteChange,
  OnCoreRouteRequest,
  UnknownState,
} from '../core-router';

/**
 * Factory method that returns a function which will create a typed set of routes for the CoreReactRouter.
 */
export function reactRoutesFactory<P extends CoreReactRoute>() {
  return <T extends Record<string, P>>(arg: T): T => {
    return arg;
  };
}

export const INVALID_CONTEXT_ACCESS = `An upstream <CoreReactRouter> component is missing`;

/* v8 ignore start because this is covered from hook test */
export const navigateStub = (): never => {
  throw new Error(INVALID_CONTEXT_ACCESS);
};
/* v8 ignore end */

export const CoreReactRouterContext = createContext<CoreReactRouterCtx>({
  activeHash: '',
  activeRoute: null,
  activeState: undefined,
  basePath: '',
  navigate: navigateStub,
});

export function CoreReactRouter<R extends CoreReactRoute = CoreReactRoute>(options: CoreReactRouterOptions<R>) {
  const routerRef = useRef<CoreRouter<R> | null>(null);
  const optionsRef = useRef<CoreReactRouterOptions<R>>();
  const [routeToRender, setRouteToRender] = useState<R | null>(null);
  const [stateToRender, setStateToRender] = useState<UnknownState>();
  const [componentToRender, setComponentToRender] = useState<JSX.Element | null>(null);

  const handleOnRouteChange = useCallback<OnCoreRouteChange<R>>(
    (changePayload) => {
      const { route, state } = changePayload;
      const nextComponentToRender = cloneElement(route.component, state);
      setComponentToRender(nextComponentToRender);
      setRouteToRender(route);
      setStateToRender(state);

      if (options.onRouteChange) {
        options.onRouteChange(changePayload);
      }
    },
    [options]
  );

  useEffect(() => {
    const { routes, ...routerOpts } = options;

    if (!routerRef.current || optionsRef.current !== options) {
      routerRef.current = CoreRouter.initialize<R>(options.routes, {
        ...routerOpts,
        onRouteChange: handleOnRouteChange,
      });
      optionsRef.current = options;
    }
  }, [handleOnRouteChange, options]);

  // create and return a context provider and respective React component via route and state with optional layout
  return (
    <CoreReactRouterContext.Provider
      value={{
        activeHash: window.location.hash,
        activeRoute: routeToRender,
        activeState: stateToRender,
        basePath: options.basePath || '',
        navigate: (routerRef.current?.navigate as CoreReactRouterNavigate<CoreReactRoute>) || navigateStub,
      }}
    >
      {routeToRender?.Layout ? <routeToRender.Layout>{componentToRender}</routeToRender.Layout> : componentToRender}
    </CoreReactRouterContext.Provider>
  );
}

//
//
// types
//
//

/**
 * Represents a route managed by a @spa-tools Core Router.
 */
export type CoreReactRoute<CustomProps = unknown> = CoreRoute<CustomProps> & {
  /**
   * Optional React component that will be used to wrap the component of the active route.
   */
  Layout?: ({ children }: { children: JSX.Element | null }) => ReactElement;
  /**
   * React component that will be rendered when the route is active.
   */
  component: ReactElement;
};

export type CoreReactRouteResponse<R extends CoreReactRoute = CoreReactRoute> = CoreRouteResponse<R>;

export interface CoreReactRouterCtx<R extends CoreReactRoute = CoreReactRoute> {
  activeHash: string;
  activeRoute: R | null;
  activeState: UnknownState;
  basePath: string;
  navigate: CoreReactRouterNavigate<R>;
}

export type CoreReactRouterNavigate<R extends CoreReactRoute = CoreReactRoute> = (
  route: R | string,
  state?: UnknownState,
  hash?: string
) => void;

export interface CoreReactRouterOptions<R extends CoreReactRoute = CoreReactRoute>
  extends Pick<CoreRouterOptions<R>, 'basePath' | 'fallbackState'> {
  /**
   * Optional route to use when no route is matched.
   */
  fallbackRoute?: R;
  /**
   * Optional callback that will be called when a route change is requested. See `OnCoreRouteChange` for more details.
   */
  onRouteChange?: OnCoreReactRouteChange<R>;
  /**
   * Optional callback that will be called when a route change is requested. See `OnCoreRouteRequest` for more details.
   */
  onRouteRequest?: OnCoreReactRouteRequest<R>;
  /**
   * The routes that are to be managed by the @spa-tools router.
   */
  routes: Record<string, R>;
}

export type OnCoreReactRouteRequest<R extends CoreReactRoute = CoreReactRoute> = OnCoreRouteRequest<R>;
export type OnCoreReactRouteChange<R extends CoreReactRoute = CoreReactRoute> = OnCoreRouteChange<R>;
