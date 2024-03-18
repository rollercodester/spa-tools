import { CoreReactRouter, OnCoreReactRouteRequest } from '@spa-tools/core-router';
import { DemoProps } from 'showcase/widgets';
import { ShowcaseRoute, routes } from './routes';

export function ShowcaseRouter() {
  const handleRouteRequest: OnCoreReactRouteRequest = ({ newRoute, newState }) => {
    if (newRoute === routes.flowDemoRoute) {
      //
      //
      // logic for flow control demo
      //
      //
      const demoProps = newState as unknown as DemoProps;
      const activeDemo = demoProps.fromDemoState?.activeDemo;
      switch (activeDemo) {
        case 'Deny Flow':
          return Promise.resolve(false);
        case 'Confirm Flow':
          const confirmed = confirm('Are you sure you want to navigate to the Flow Demo view?');
          return Promise.resolve(confirmed);
        case 'Redirect Flow':
          return Promise.resolve([
            routes.homeRoute,
            { fromDemoPath: routes.routerRoute.path, fromDemoState: { activeDemo: 'Redirect Flow', activeTab: 3 } },
            '#demo',
          ]);
      }
    }

    return Promise.resolve(true);
  };

  return (
    <CoreReactRouter<ShowcaseRoute>
      fallbackRoute={routes.homeRoute}
      onRouteRequest={handleRouteRequest}
      routes={routes}
    />
  );
}
