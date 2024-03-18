import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../mocks';
import { deepClone } from '../../utilities/src/data/deep-clone';
import {
  CoreRoute,
  CoreRouter,
  CoreRouterOptions,
  INVALID_ROUTE_REQUEST_CB_VALUE_WARNING,
  INVALID_STATE_WARNING,
  routesFactory,
} from './core-router';

const createRoutes = routesFactory<CoreRoute>();

const routes = createRoutes({
  home: { path: '/home' },
  reports: { path: '/reports' },
  user: { path: '/users/:id' },
});

const baseOptions: CoreRouterOptions<CoreRoute> = {
  basePath: '/app',
  fallbackRoute: routes.home,
  onRouteRequest: vi.fn(),
};

describe('Core Router', () => {
  const consoleErrorSpy = vi.spyOn(console, 'error');

  consoleErrorSpy.mockImplementation(() => null);

  beforeEach(() => {
    mockWindowHistory();
    mockWindowLocation('http://localhost:3000');
  });

  afterEach(() => {
    restoreWindowHistory();
    restoreWindowLocation();
    vi.clearAllMocks();
    consoleErrorSpy.mockClear();
    document.body.innerHTML = '<div></div>';
  });

  it('should initialize with the correct options', () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    expect(router['routes']).toBe(routes);
    expect(router['options']).toStrictEqual(options);
  });

  it('should initialize with default options', () => {
    const router = CoreRouter.initialize(routes);

    expect(router['routes']).toBe(routes);
    expect(router['options']).toStrictEqual({});
  });

  it('should initially render default route', async () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.home);
    expect(router['stateToRender']).toEqual({});
  });

  it('should navigate with requested route and state', async () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '123' });
  });

  it('should navigate with requested route with no state', async () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
  });

  it('should navigate with requested route and hash', async () => {
    document.body.innerHTML = '<div id="section-1"></div>';
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports, undefined, 'section-1');

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
    expect(window.location.hash).toEqual('#section-1');
  });

  it('should handle hash navigation when there is no element matching hash', async () => {
    document.body.innerHTML = '<div id="section-2"></div>';
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports, undefined, 'section-1');

    // give plenty of time for hash to be checked
    await new Promise((resolve) => setTimeout(resolve, 2500));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
    expect(window.location.hash).toEqual('#section-1');
  });

  it('should navigate with requested route and hash with # included in hash with no base path', async () => {
    const options = deepClone(baseOptions);
    options.basePath = '';
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports, undefined, '#section-1');

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
    expect(window.location.hash).toEqual('#section-1');
  });

  it('should navigate with null callback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(null);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '123' });
  });

  it('should redirect navigate when route and state is returned as tuple', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue([routes.user, { id: '789' }, 'section-1']);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '789' });
  });

  it('should redirect navigate when route and no state is returned as tuple', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue([routes.reports, undefined]);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual(undefined);
  });

  it('should redirect navigate when tuple returned with path string and state on route request', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(['/users/:id', { id: '123' }]);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '123' });
  });

  it('should redirect navigate when tuple returned with path string and no state on route request', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(['/reports']);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
  });

  it('should redirect navigate when tuple returned with path string and hash on route request', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(['/reports', 'section-1']);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
  });

  it('should redirect navigate when just route is returned in callback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(routes.reports);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
  });

  it('should redirect navigate when just path string is returned in callback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue('/reports');
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
  });

  it('should console an error when navigating with invalid state', async () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, 'invalid-state' as unknown as Record<string, unknown>);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(INVALID_STATE_WARNING);
    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: ':id' });
  });

  it('should handle navigating to invalid route', async () => {
    const router = CoreRouter.initialize(routes);

    router.navigate('bad-route');

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toBeUndefined();
  });

  it('should handle cancelled route change', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(false);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.home);
    expect(router['stateToRender']).toEqual({});
  });

  it('should handle invalid tuple returned on route request', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue([1, { id: '123' }]);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(console.error).toHaveBeenCalledWith(INVALID_ROUTE_REQUEST_CB_VALUE_WARNING);

    expect(router['routeToRender']).toEqual(routes.home);
    expect(router['stateToRender']).toEqual({});
  });
});
