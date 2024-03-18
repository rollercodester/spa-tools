import { isRecord } from '../../utilities/src/conditionals/is-record';
import { deepClone } from '../../utilities/src/data/deep-clone';
import { PathMatcher, parseRoute } from './utils';

export const INVALID_ROUTE_REQUEST_CB_VALUE_WARNING = 'WARNING: Invalid route request callback value';
export const INVALID_STATE_WARNING =
  'WARNING: Invalid navigaion state detected; router navigation state can only be a plain object or array';

/**
 * Factory method that returns a function which will create a typed set of routes for the CoreRouter.
 */
export function routesFactory<P extends CoreRoute = CoreRoute>() {
  return <T extends Record<string, P>>(arg: T): T => {
    return arg;
  };
}

export class CoreRouter<R extends CoreRoute = CoreRoute> {
  private readonly options;
  private readonly routes;
  private lastRenderedRoute: R | null | undefined = undefined;
  private lastRenderedState: UnknownState = undefined;
  private routeToRender: R | null | undefined = undefined;
  private stateToRender: UnknownState = undefined;
  private hashForReplace: string | null | undefined = undefined;

  private constructor(routes: Record<string, R>, options?: CoreRouterOptions<R>) {
    const normOptions = deepClone<CoreRouterOptions<R>>(options || {});

    this.routes = routes;
    this.options = normOptions;

    window.addEventListener('popstate', this.processNextUrl);

    // process initial route
    this.processNextUrl();
  }

  public static initialize<R extends CoreRoute = CoreRoute>(routes: Record<string, R>, options?: CoreRouterOptions<R>) {
    const coreRouter = new CoreRouter<R>(routes, options);
    return coreRouter;
  }

  /**
   * Navigates to the respective route while optionally applying provided state and hash.
   */
  public navigate = (route: R | string, state?: Record<string, unknown>, hash?: string) => {
    let routeState = state;

    if (state && !isRecord(state)) {
      routeState = undefined;
      console.error(INVALID_STATE_WARNING);
    }

    const [normRoute, normState] = this.getRouteAndState(route, routeState);

    if (!normRoute) {
      // EARLY EXIT because no route found and no backup route configured
      return;
    }

    const popStateEvent = new PopStateEvent('popstate', { state: normState });

    const normUrl = parseRoute(normRoute, normState || {}, this.options.basePath, {
      addUnusedStateToQueryString: normRoute.addUnusedStateToQueryString,
      discardOrphanedQueryStringPlaceholders: normRoute.removeUnusedQueryParams,
      preEncodeQueryStringValuesForKeys: normRoute.preEncodeQueryStringValues,
    });

    const path = normUrl.pathname + normUrl.search;
    const normHash = normalizeHash(hash);
    const newURL = path.includes(normHash) ? path : `${path}${normHash}`;

    window.history.pushState(normState, '', newURL);
    window.dispatchEvent(popStateEvent);

    if (normHash) {
      let intervalId = 0;
      let tries = 0;
      const scrollToHashElem = () => {
        tries += 1;
        const hashElem = document.querySelector(normHash);

        if (hashElem) {
          window.clearInterval(intervalId);
          // try block is purely so that we can test this function
          // in NodeJS without worrying about mocking scrollIntoView
          try {
            hashElem.scrollIntoView({ behavior: normRoute.hashScrollBehavior || 'auto' });
            // eslint-disable-next-line no-empty
          } catch {}
        }

        if (tries > 20) {
          window.clearInterval(intervalId);
        }
      };

      intervalId = window.setInterval(() => scrollToHashElem(), 100);
    }
  };

  private getRouteAndState = (routeOrPath: string | R, state: UnknownState): [R | undefined, UnknownState] => {
    if (typeof routeOrPath !== 'string') {
      return [routeOrPath, state];
    }

    const pathRoute = Object.values(this.routes).find((r) => r.path === routeOrPath) || this.options.fallbackRoute;

    if (!pathRoute) {
      console.error(`WARNING: No route found for path: ${routeOrPath} and no fallback route provided.`);
    }

    return [pathRoute, pathRoute ? state : this.options.fallbackState];
  };

  private parsePath = (path: string): ParsedCoreRoute<R> => {
    const { basePath, fallbackRoute } = this.options;
    const normPath = basePath ? path.split(basePath)[1] || path : path;

    let state: Record<string, unknown> = {};

    const route = Object.values(this.routes).find((r) => {
      const pattern = new PathMatcher(r.path);
      const matchState = pattern.match(normPath);
      if (matchState) {
        state = matchState;
      }
      return matchState !== null;
    });

    if (!route) {
      return { route: fallbackRoute as R, state: history.state };
    }

    if (route && history.state) {
      state = { ...history.state, ...state };
    }

    return { route, state };
  };

  private processNextUrl = async () => {
    const url = new URL(window.location.href);
    const { route, state } = this.parsePath(url.pathname);
    const normState = { ...state, ...(window.history.state || {}) };

    let feedback: CoreRouteResponse<R> = true;

    if (this.options.onRouteRequest) {
      feedback = await this.options.onRouteRequest({
        newRoute: route,
        newState: normState,
        oldRoute: this.lastRenderedRoute,
        oldState: this.lastRenderedState,
      });
    }

    if (feedback === false) {
      //
      // consumer has cancelled the route change
      //
      this.routeToRender = this.lastRenderedRoute || this.options.fallbackRoute;
      this.stateToRender = this.lastRenderedState || this.options.fallbackState || {};
      this.replaceLastHistoryEntry(true);
    } else {
      // store the current route and state as the last rendered
      // so we can compare and avoid re-rendering the same route
      this.lastRenderedRoute = this.routeToRender;
      this.lastRenderedState = this.stateToRender;

      if (feedback === true || feedback === undefined || feedback === null) {
        //
        // consumer has approved the route change
        //
        this.routeToRender = route;
        this.stateToRender = normState;
      } else if (feedback instanceof Array) {
        //
        // consumer has requested a route change with state and/or a hash
        //
        if (typeof feedback[0] !== 'string' && !(feedback[0] instanceof Object)) {
          //
          // consumer has responded with an invalid tuple
          //
          console.error(INVALID_ROUTE_REQUEST_CB_VALUE_WARNING);
          this.routeToRender = this.lastRenderedRoute || this.options.fallbackRoute;
          this.stateToRender = this.lastRenderedState || this.options.fallbackState || {};
          this.replaceLastHistoryEntry(true);
        } else {
          if (typeof feedback[0] === 'string') {
            const feedbackState = feedback[1] instanceof Object ? feedback[1] : {};
            const [normRoute, normState] = this.getRouteAndState(feedback[0], feedbackState);
            this.routeToRender = normRoute;
            this.stateToRender = normState;
          } else {
            this.routeToRender = feedback[0] as R;
            this.stateToRender = feedback[1] instanceof Object ? feedback[1] : undefined;
          }

          const hashToRender = typeof feedback[1] === 'string' ? feedback[1] : feedback[2];
          const normHash = normalizeHash(hashToRender);
          if (normHash && this.routeToRender) {
            this.hashForReplace = normHash;
          }
          this.replaceLastHistoryEntry();
        }
      } else if (feedback instanceof Object && 'path' in feedback) {
        //
        // consumer has requested a route change without state by providing a route
        //
        this.routeToRender = feedback;
        this.stateToRender = {};
        this.replaceLastHistoryEntry();
      } else if (typeof feedback === 'string') {
        //
        // consumer has requested a route change without state by providing a path
        //
        const [normRoute, normState] = this.getRouteAndState(feedback, {});
        this.routeToRender = normRoute;
        this.stateToRender = normState;
        this.replaceLastHistoryEntry();
      }

      if (this.options.onRouteChange) {
        this.options.onRouteChange({
          route: this.routeToRender as R,
          state: this.stateToRender,
        });
      }
    }
  };

  private replaceLastHistoryEntry = (goBackInstead = false) => {
    if (window.history.length > 1) {
      if (goBackInstead) {
        window.history.back();
      } else {
        const path =
          !this.hashForReplace || this.routeToRender?.path.includes(this.hashForReplace)
            ? this.routeToRender?.path
            : `${this.routeToRender?.path}${this.hashForReplace}`;
        window.history.replaceState(this.stateToRender, '', path);
      }
    }
  };
}

//
//
// helpers
//
//

function normalizeHash(hash?: string) {
  const normHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return normHash;
}

//
//
// types
//
//

/**
 * Represents a route managed by a @spa-tools Core Router.
 */
export type CoreRoute<CustomProps = unknown> = CustomProps & {
  /**
   * Optional setting to enable adding unused param state to the query string. Defaults to false.
   */
  addUnusedStateToQueryString?: boolean;
  /**
   * Optional setting to enable smooth scrolling when a hash is present in the URL.
   */
  hashScrollBehavior?: ScrollBehavior;
  /**
   * The path that will be used to match the route.
   */
  path: string;
  /**
   * Optional setting to enable pre-encoding query string values for specific keys.
   */
  preEncodeQueryStringValues?: string[];
  /**
   * Optional setting to enable removing orphaned query string placeholders. Defaults to true.
   */
  removeUnusedQueryParams?: boolean;
};

export interface CoreRouteChangePayload<R extends CoreRoute = CoreRoute> {
  route: R;
  state: UnknownState;
}

export interface CoreRouteRequestPayload<R extends CoreRoute = CoreRoute> {
  newRoute: R;
  newState: UnknownState;
  oldRoute: R | null | undefined;
  oldState: UnknownState;
}

export type CoreRouteResponse<R extends CoreRoute = CoreRoute> =
  | boolean
  | string
  | [R, UnknownState]
  | [R, UnknownState, string]
  | [R, string]
  | [string, UnknownState]
  | [string, string]
  | R
  | void;

export interface CoreRouterOptions<R extends CoreRoute = CoreRoute> {
  /**
   * Optional base path used to build the full URL for each route. An example of a base path is `/app` which would be used to build the full URL for a route with a path of `/home` as `/app/home`.
   */
  basePath?: string;
  /**
   * Optional route to use when no route is matched.
   */
  fallbackRoute?: R;
  /**
   * Optional state to use when no route is matched.
   */
  fallbackState?: UnknownState;
  /**
   * Optional callback that is invoked when a route change has been processed.
   *
   * Returns the active route, state, seoTitle, and seoDescription.
   */
  onRouteChange?: OnCoreRouteChange<R>;
  /**
   * Optional callback that is invoked when a route change is ready to act on.
   *
   * The callback must return a promise whose return is checked as follows:
   *
   * - If `true` | `null` | `undefined` (aka void), the route change will proceed.
   * - If `false`, the route change will cancel and current route will persist.
   * - If a `route`, then the given route will be redirected to.
   * - If a `[route, state]` tuple, then the given route will be redirected to with provided state.
   */
  onRouteRequest?: OnCoreRouteRequest<R>;
}

export type OnCoreRouteChange<R extends CoreRoute = CoreRoute> = (payload: CoreRouteChangePayload<R>) => void;

export type OnCoreRouteRequest<R extends CoreRoute = CoreRoute> = (
  payload: CoreRouteRequestPayload<R>
) => Promise<CoreRouteResponse<R>> | void;

export interface ParsedCoreRoute<R extends CoreRoute = CoreRoute> {
  route: R;
  state: UnknownState;
}

export type UnknownState = Record<string, unknown> | undefined;
