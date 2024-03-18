import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockWindowHistory, mockWindowLocation, restoreWindowHistory, restoreWindowLocation } from '../../../../mocks';
import { CoreReactRouter, reactRoutesFactory } from './core-react-router';
import { NavLink } from './nav-link';

const onClickSpy = vi.fn();

const RedundantNavLink = () => (
  <NavLink route={routes.postsRoute}>
    <p>Go to Posts</p>
  </NavLink>
);

const BadNavLink = () => (
  <NavLink>
    <p>Bad Link</p>
  </NavLink>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <NavLink route={routes.loginRoute}>
      <p>Go to Login</p>
    </NavLink>
    <NavLink route={[routes.loginRoute, routes.userRoute]} staticContent={<p>Multi-Route is Active</p>}>
      <p>Multi Routes</p>
    </NavLink>
    <NavLink onClick={onClickSpy}>
      <p>On Click Nav</p>
    </NavLink>
    <div>{children}</div>
  </div>
);

const createReactRoutes = reactRoutesFactory();

const routes = createReactRoutes({
  badLinkRoute: {
    component: (
      <div>
        <div>Invalid Link Test</div>
        <BadNavLink />
      </div>
    ),
    path: '/bad-link',
  },
  homeRoute: {
    Layout,
    component: <div>Home</div>,
    path: '/',
  },
  loginRoute: {
    Layout,
    component: (
      <div>
        <div>Login</div>
      </div>
    ),
    path: '/login',
  },
  postsRoute: {
    component: (
      <div>
        <div>Posts</div>
        <RedundantNavLink />
      </div>
    ),
    path: '/posts',
  },
  userRoute: {
    Layout,
    component: <div>User</div>,
    path: '/users/:id',
  },
});

describe('NavLink', () => {
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
    onClickSpy.mockClear();
  });

  it('should render the link with the correct text and navigate when clicked', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    act(() => {
      window.location.pathname = '/users/1';
    });

    await waitFor(() => {
      expect(screen.getByText('Go to Login'));
    });

    fireEvent.click(screen.getByText('Go to Login'));

    await waitFor(() => {
      expect(screen.getByText('Login'));
    });
  });

  it('should render the link as active when mutliple routes provided', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    act(() => {
      window.location.pathname = '/users/1';
    });

    await waitFor(() => {
      expect(screen.getByText('Go to Login'));
      expect(screen.getByText('Multi-Route is Active'));
    });
  });

  it('should not route when link with mutliple routes clicked', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    await waitFor(() => {
      expect(screen.getByText('Multi Routes'));
    });

    fireEvent.click(screen.getByText('Multi Routes'));

    await waitFor(() => {
      expect(screen.getByText('Home'));
    });
  });

  it('should call onClick handler', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    act(() => {
      window.location.pathname = '/users/1';
    });

    await waitFor(() => {
      expect(screen.getByText('On Click Nav'));
    });

    fireEvent.click(screen.getByText('On Click Nav'));

    await waitFor(() => {
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle redundant navigation', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    act(() => {
      window.location.pathname = '/posts';
    });

    await waitFor(() => {
      expect(screen.getByText('Posts'));
    });

    fireEvent.click(screen.getByText(/Go to Posts/i));

    await waitFor(() => {
      expect(screen.getByText('Posts'));
    });
  });

  it('should console error when no route and now onClick handler provided', async () => {
    render(
      <CoreReactRouter fallbackRoute={routes.homeRoute} onRouteRequest={() => Promise.resolve()} routes={routes} />
    );

    act(() => {
      window.location.pathname = '/bad-link';
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid Link Test'));
    });

    fireEvent.click(screen.getByText(/Bad Link/i));

    await waitFor(() => {
      expect(consoleErrSpy).toHaveBeenCalledTimes(1);
    });
  });
});
