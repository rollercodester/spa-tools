import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../../mocks';
import { CoreReactRouter, reactRoutesFactory } from './core-react-router';

const Layout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const createReactRoutes = reactRoutesFactory();

const routes = createReactRoutes({
  homeRoute: {
    Layout,
    component: <div>Home</div>,
    path: '/',
  },
  loginRoute: {
    component: <div>Login</div>,
    path: '/login',
  },
  postRoute: {
    component: <div>Post</div>,
    path: '/posts/:id',
  },
  userRoute: {
    component: <div>User</div>,
    path: '/users/:id',
  },
});

describe('Core React Router', () => {
  const consoleErrSpy = vi.spyOn(console, 'error');

  afterAll(() => {
    consoleErrSpy.mockRestore();
  });

  beforeEach(() => {
    mockWindowHistory();
    mockWindowLocation('https://spatools');
    consoleErrSpy.mockImplementationOnce(() => null);
  });

  afterEach(() => {
    restoreWindowHistory();
    restoreWindowLocation();
    consoleErrSpy.mockClear();
  });

  it('should render the default route', async () => {
    act(() => {
      window.location.pathname = '/';

      render(
        <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Home'));
    });
  });

  it('should render the route with state', async () => {
    act(() => {
      window.location.pathname = '/posts/1';

      render(
        <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Post'));
    });
  });
});
