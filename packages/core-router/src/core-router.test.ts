import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../mocks';
import { deepClone } from '../../utilities/src/data/deep-clone';
import { CoreRoute, CoreRouter, CoreRouterOptions, routesFactory } from './core-router';

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
  beforeEach(() => {
    mockWindowHistory();
    mockWindowLocation('http://localhost:3000');
  });

  afterEach(() => {
    restoreWindowHistory();
    restoreWindowLocation();
    vi.clearAllMocks();
  });

  it('should initialize with the correct options', () => {
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    expect(router['routes']).toBe(routes);
    expect(router['options']).toBe(options);
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
    const options = deepClone(baseOptions);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports, undefined, 'section-1');

    await new Promise((resolve) => setTimeout(resolve, 200));

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

  it('should navigate with null callback feedback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(null);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '123' });
  });

  it('should redirect navigate when route and state is provided with callback feedback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue([routes.user, { id: '789' }]);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.reports);

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.user);
    expect(router['stateToRender']).toEqual({ id: '789' });
  });

  it('should redirect navigate when route and no state is provided with callback feedback', async () => {
    const options = deepClone(baseOptions);
    options.onRouteRequest = vi.fn().mockResolvedValue(routes.reports);
    const router = CoreRouter.initialize(routes, options);

    router.navigate(routes.user, { id: '123' });

    await new Promise((resolve) => setTimeout(resolve, 200));

    expect(router['routeToRender']).toEqual(routes.reports);
    expect(router['stateToRender']).toEqual({});
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
});
