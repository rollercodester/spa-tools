import { CoreRoute, routesFactory } from '@spa-tools/core-router';

export interface MyCustomRoute extends CoreRoute {
  authCheck: boolean;
  dirtyCheck: boolean;
}

const createMyRoutes = routesFactory<MyCustomRoute>();

export const myRoutes = createMyRoutes({
  aboutRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/about',
  },
  homeRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/',
  },
  loginRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/login',
  },
  membersOnlyRoute: {
    authCheck: true,
    dirtyCheck: false,
    path: '/members-only',
  },
  signupRoute: {
    authCheck: false,
    dirtyCheck: true,
    path: '/signup',
  },
});
