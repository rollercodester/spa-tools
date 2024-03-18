import { Text, VStack } from '@chakra-ui/react';
import { useCoreRouter } from '@spa-tools/core-router';
import { PiNavigationArrowDuotone } from 'react-icons/pi';
import { routes } from 'showcase/router';
import { DemoViewport } from 'showcase/widgets';

export function NavigationTabPanel() {
  const { navigate } = useCoreRouter();

  return (
    <DemoViewport
      code={code}
      codeOnly
      ctaContent='Run Navigation Demo'
      ctaIcon={<PiNavigationArrowDuotone fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Core Router&apos;s approach to in-app navigation follows the common theme of keeping things simple without
            compromising functionality.
          </Text>
          <Text sx={{ fontWeight: 'normal' }} />
        </VStack>
      }
      initialOutputMessage='Click the "Run Navigation Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        navigate(routes.homeRoute, { fromDemoPath: routes.routerRoute.path, fromDemoState: { activeTab: 2 } }, '#demo');
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { CoreRouter, routesFactory } from '@spa-tools/core-router';

const createShowcaseRoutes = routesFactory();

const showcaseRoutes = createShowcaseRoutes({
  homeRoute: {
    // here we set hash scroll behavior to smooth for the home route
    hashScrollBehavior: 'smooth',
    path: '/',
  },
  apiClientRoute: {
    path: '/api-client',
  },
  coreRouterRoute: {
    path: '/core-router',
  },
  runtimeConfigRoute: {
    path: '/runtime-config',
  },
  reactHooksRoute: {
    path: '/react-hooks',
  },
  utilsRoute: {
    path: '/utils',
  },
});

const showcaseRouter = CoreRouter.initialize(showcaseRoutes);

showcaseRouter.navigate(
  // here we request to nav to the home route;
  // note that we could also pass a path string but
  // since we have easy access to the routes and
  // get intellisense, this is the preferred method
  showcaseRoutes.homeRoute,
  //
  // here we ask the router to pass state to the home route
  // so that the home view knows how to navigate back
  //
  {
    fromDemoPath: showcaseRoutes.coreRouterRoute.path,
    fromDemoState: { activeTab: 2 },
  },
  // here we add a hash to instruct the the router to
  // scroll to the demo banner after navigation
  '#demo'
);
`;
