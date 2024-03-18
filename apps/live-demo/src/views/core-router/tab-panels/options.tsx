import { Box, Text, VStack } from '@chakra-ui/react';
import { CoreRouter, CoreRouterOptions } from '@spa-tools/core-router';
import { sleep } from '@spa-tools/utilities';
import { IoMdOptions } from 'react-icons/io';
import { DemoViewport, FeatureList, logLabel } from 'showcase/widgets';
import { MyCustomRoute, myRoutes } from '../common';

export function OptionsTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Options Demo'
      ctaIcon={<IoMdOptions fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            The Core Router is minimalist by design, but it still comes with some important options to take advantage
            of:
          </Text>
          <Box sx={{ fontWeight: 'normal', gap: '2rem', ml: '1rem' }}>
            <FeatureList
              features={[
                'Application base path',
                'Fallback route and state',
                'Route request callback (covered in depth under "Flow Control")',
                'Route change callback',
              ]}
            />
          </Box>
        </VStack>
      }
      initialOutputMessage='Click the "Run Options Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={async () => {
        const myRouterOptions: CoreRouterOptions<MyCustomRoute> = {
          basePath: '/app',

          fallbackRoute: myRoutes.homeRoute,
          fallbackState: { homeVersion: '2.0' },

          onRouteRequest: ({ newRoute, newState, oldRoute, oldState }) => {
            logLabel('Route and state REQUEST:');
            console.log({ newRoute, newState, oldRoute, oldState });
          },

          onRouteChange: ({ route, state }) => {
            logLabel('Route and state CHANGE:');
            console.log({ route, state });
          },
        };

        const myRouter: CoreRouter<MyCustomRoute> | null = CoreRouter.initialize<MyCustomRoute>(
          myRoutes,
          myRouterOptions
        );

        await sleep(300);

        logLabel('Router instance we just created:');
        console.log(myRouter);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { CoreRouter, CoreRouterOptions } from '@spa-tools/core-router';

const myRouterOptions: CoreRouterOptions<MyCustomRoute> = {
  // if you're app is hosted at a subdirectory, you set the base path here
  // e.g. if your app is hosted at https://example.com/app, then use '/app'
  basePath: '/app',

  // if a requested route is not found, the app will be
  // redirected to this route using respective state
  fallbackRoute: myRoutes.homeRoute,
  fallbackState: { homeVersion: '2.0' },

  // callback that fires when a route change is requested; this
  // is where you implement your flow rules in terms of how to
  // act on the request. See "Flow Control" for more details
  onRouteRequest: ({ newRoute, newState, oldRoute, oldState }) => {
    console.log('Route and state REQUEST:');
    console.log({ newRoute, newState, oldRoute, oldState });
  },

  // callback that fires after a route change has been processed
  // (i.e. the respective route request was approved)
  onRouteChange: ({ route, state }) => {
    console.log('Route and state CHANGE:');
    console.log({ route, state });
  },
};

// new-up a CoreRouter by passing in your routes and options
const myRouter = CoreRouter.initialize(myRoutes, myRouterOptions);

console.log('Router instance we just created:');
console.log(myRouter);
`;
