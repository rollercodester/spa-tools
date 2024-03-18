import { CoreReactRoute, reactRoutesFactory } from '@spa-tools/core-router';
import { Layout } from 'showcase/layout';
import {
  ApiClientView,
  CoreRouterView,
  FlowDemoView,
  HomeView,
  InteractionHooksView,
  RuntimeConfigView,
  UtilitiesView,
} from 'showcase/views';

export type ShowcaseRoute = CoreReactRoute;

const createShowcaseRoutes = reactRoutesFactory<ShowcaseRoute>();

export const routes = createShowcaseRoutes({
  apiClientRoute: {
    Layout,
    component: <ApiClientView />,
    path: '/api-client',
  },
  flowDemoRoute: {
    Layout: (props: { children: React.ReactNode }) => <Layout {...props} isForHome />,
    component: <FlowDemoView />,
    hashScrollBehavior: 'smooth',
    path: '/flow-demo',
  },
  homeRoute: {
    Layout: (props: { children: React.ReactNode }) => <Layout {...props} isForHome />,
    component: <HomeView />,
    hashScrollBehavior: 'smooth',
    path: '/',
  },
  reactHooksRoute: {
    Layout,
    component: <InteractionHooksView />,
    path: '/interaction-hooks',
  },
  routerRoute: {
    Layout,
    component: <CoreRouterView />,
    path: '/core-router',
  },
  runtimeConfigRoute: {
    Layout,
    component: <RuntimeConfigView />,
    path: '/runtime-config',
  },
  utilsRoute: {
    Layout,
    component: <UtilitiesView />,
    path: '/utilities',
  },
});
